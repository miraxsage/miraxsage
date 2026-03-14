import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { requireAuth } from "@/shared/api/auth";
import { jsonResponse, errorResponse, successResponse } from "@/shared/api/response";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import sharp from "sharp";

type RouteContext = { params: Promise<{ id: string }> };

const SLUG_RE = /^[a-z0-9_-]+$/;
const IMG_DIR = path.join(process.cwd(), "public/img/projects");

function validateSlug(slug: string): string | null {
    if (!slug || slug.length > 80) return "Slug must be 1-80 characters";
    if (!SLUG_RE.test(slug)) return "Slug may only contain a-z, 0-9, hyphens, underscores";
    if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) return "Invalid slug";
    return null;
}

function sanitizeSlug(filename: string): string {
    return filename
        .toLowerCase()
        .replace(/\.[^.]+$/, "")
        .replace(/[\s.]+/g, "-")
        .replace(/[^a-z0-9_-]/g, "")
        .slice(0, 80);
}

// GET — list all images for a project (public, no auth)
export async function GET(_request: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const db = getDb();
        const project = db.prepare("SELECT id FROM projects WHERE id = ?").get(id);
        if (!project) return errorResponse("Project not found", 404);
        const images = db
            .prepare("SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order")
            .all(id);
        return jsonResponse(images);
    } catch (error) {
        console.error("Images GET error:", error);
        return errorResponse("Internal server error", 500);
    }
}

// POST — upload a new image
export async function POST(request: NextRequest, context: RouteContext) {
    try {
        await requireAuth(request);
        const { id } = await context.params;
        const db = getDb();
        const project = db
            .prepare("SELECT id, media_id FROM projects WHERE id = ?")
            .get(id) as { id: number; media_id: string } | undefined;
        if (!project) return errorResponse("Project not found", 404);
        if (!project.media_id) return errorResponse("Project has no media_id", 400);

        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        if (!file) return errorResponse("File is required");

        const slugRaw = (formData.get("slug") as string) || sanitizeSlug(file.name);
        const slugError = validateSlug(slugRaw);
        if (slugError) return errorResponse(slugError);

        const existing = db
            .prepare("SELECT 1 FROM project_images WHERE project_id = ? AND slug = ?")
            .get(id, slugRaw);
        if (existing) return errorResponse("Slug already exists for this project");

        const ext = path.extname(file.name).toLowerCase() || ".jpg";
        const title_en = (formData.get("title_en") as string) || "";
        const title_ru = (formData.get("title_ru") as string) || "";
        const description_en = (formData.get("description_en") as string) || "";
        const description_ru = (formData.get("description_ru") as string) || "";
        const is_cover = formData.get("is_cover") === "1" ? 1 : 0;

        const dir = path.join(IMG_DIR, project.media_id);
        if (!existsSync(dir)) await mkdir(dir, { recursive: true });

        const buffer = Buffer.from(await file.arrayBuffer());

        // Validate image is processable by sharp
        try {
            await sharp(buffer).metadata();
        } catch {
            return errorResponse("File is not a valid image");
        }

        const originalPath = path.join(dir, `${slugRaw}${ext}`);
        const tinyPath = path.join(dir, `${slugRaw}-tiny.webp`);

        await writeFile(originalPath, buffer);

        await sharp(buffer)
            .resize({ width: 400, withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(tinyPath);

        const maxOrder = db
            .prepare("SELECT MAX(sort_order) as max_order FROM project_images WHERE project_id = ?")
            .get(id) as { max_order: number | null };
        const sort_order = (maxOrder?.max_order ?? -1) + 1;

        let result;
        try {
            result = db.transaction(() => {
                if (is_cover) {
                    db.prepare("UPDATE project_images SET is_cover = 0 WHERE project_id = ? AND is_cover = 1").run(id);
                }
                const info = db.prepare(
                    `INSERT INTO project_images (project_id, slug, original_ext, title_en, title_ru, description_en, description_ru, is_cover, sort_order)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
                ).run(id, slugRaw, ext, title_en, title_ru, description_en, description_ru, is_cover, sort_order);
                db.prepare("UPDATE projects SET images_count = (SELECT COUNT(*) FROM project_images WHERE project_id = ?) WHERE id = ?").run(id, id);
                return info.lastInsertRowid;
            })();
        } catch (dbError) {
            try { await unlink(originalPath); } catch { /* ok */ }
            try { await unlink(tinyPath); } catch { /* ok */ }
            throw dbError;
        }

        const image = db.prepare("SELECT * FROM project_images WHERE id = ?").get(result);
        revalidatePath("/projects", "layout");
        return jsonResponse(image, 201);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Images POST error:", error);
        return errorResponse("Internal server error", 500);
    }
}

// PUT — update image metadata
export async function PUT(request: NextRequest, context: RouteContext) {
    try {
        await requireAuth(request);
        const { id } = await context.params;
        const body = await request.json();
        const { image_id, ...fields } = body;
        if (!image_id) return errorResponse("image_id is required");

        const db = getDb();
        const image = db
            .prepare("SELECT * FROM project_images WHERE id = ? AND project_id = ?")
            .get(image_id, id) as Record<string, unknown> | undefined;
        if (!image) return errorResponse("Image not found", 404);

        if (fields.slug && fields.slug !== image.slug) {
            const slugError = validateSlug(fields.slug);
            if (slugError) return errorResponse(slugError);
            const dup = db
                .prepare("SELECT 1 FROM project_images WHERE project_id = ? AND slug = ? AND id != ?")
                .get(id, fields.slug, image_id);
            if (dup) return errorResponse("Slug already exists for this project");
        }

        const allowed = ["title_en", "title_ru", "description_en", "description_ru", "is_cover", "slug"];
        const updates = Object.keys(fields).filter((k) => allowed.includes(k));
        if (updates.length === 0) return errorResponse("No valid fields to update");

        // Rename files BEFORE DB transaction
        if (fields.slug && fields.slug !== image.slug) {
            const project = db.prepare("SELECT media_id FROM projects WHERE id = ?").get(id) as { media_id: string };
            const dir = path.join(IMG_DIR, project.media_id);
            const oldSlug = image.slug as string;
            const newSlug = fields.slug;
            const ext = image.original_ext as string;
            const { rename: fsRename } = await import("fs/promises");
            try {
                await fsRename(path.join(dir, `${oldSlug}${ext}`), path.join(dir, `${newSlug}${ext}`));
                await fsRename(path.join(dir, `${oldSlug}-tiny.webp`), path.join(dir, `${newSlug}-tiny.webp`));
            } catch { /* files may not exist */ }
        }

        db.transaction(() => {
            if (fields.is_cover === 1) {
                db.prepare("UPDATE project_images SET is_cover = 0 WHERE project_id = ? AND is_cover = 1").run(id);
            }
            const setClauses = updates.map((k) => `${k} = ?`).join(", ");
            const values = updates.map((k) => fields[k] ?? null);
            db.prepare(`UPDATE project_images SET ${setClauses} WHERE id = ?`).run(...values, image_id);
        })();

        const updated = db.prepare("SELECT * FROM project_images WHERE id = ?").get(image_id);
        revalidatePath("/projects", "layout");
        return jsonResponse(updated);
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Images PUT error:", error);
        return errorResponse("Internal server error", 500);
    }
}

// DELETE — remove an image
export async function DELETE(request: NextRequest, context: RouteContext) {
    try {
        await requireAuth(request);
        const { id } = await context.params;
        const body = await request.json();
        const { image_id } = body;
        if (!image_id) return errorResponse("image_id is required");

        const db = getDb();
        const image = db
            .prepare("SELECT pi.*, p.media_id FROM project_images pi JOIN projects p ON p.id = pi.project_id WHERE pi.id = ? AND pi.project_id = ?")
            .get(image_id, id) as Record<string, unknown> | undefined;
        if (!image) return errorResponse("Image not found", 404);

        const dir = path.join(IMG_DIR, image.media_id as string);
        const slug = image.slug as string;
        const ext = image.original_ext as string;

        try { await unlink(path.join(dir, `${slug}${ext}`)); } catch { /* ok */ }
        try { await unlink(path.join(dir, `${slug}-tiny.webp`)); } catch { /* ok */ }

        db.transaction(() => {
            db.prepare("DELETE FROM project_images WHERE id = ?").run(image_id);
            db.prepare("UPDATE projects SET images_count = (SELECT COUNT(*) FROM project_images WHERE project_id = ?) WHERE id = ?").run(id, id);
            for (const col of ["content_en", "content_ru"]) {
                const project = db.prepare(`SELECT ${col} FROM projects WHERE id = ?`).get(id) as Record<string, string>;
                const content = project[col];
                if (content && content.includes(`[Image:${slug}]`)) {
                    db.prepare(`UPDATE projects SET ${col} = ? WHERE id = ?`).run(
                        content.replace(new RegExp(`\\[Image:${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]`, "g"), ""),
                        id
                    );
                }
            }
        })();

        revalidatePath("/projects", "layout");
        return successResponse("Image deleted");
    } catch (error) {
        if (error instanceof Response) throw error;
        console.error("Images DELETE error:", error);
        return errorResponse("Internal server error", 500);
    }
}
