import { getDb } from "@/db";

export interface ProjectData {
    id: number;
    slug: string;
    name_en: string;
    name_ru: string;
    short_name_en: string;
    short_name_ru: string;
    description_en: string;
    description_ru: string;
    domain: string;
    rating: number;
    year: number;
    status: string;
    participating: string;
    dev_time_months: number;
    github_link: string;
    cover_brightness: string;
    sort_order: number;
    technologies: Array<Record<string, unknown>>;
    media_id: string;
    site_link: string;
    content_en: string;
    content_ru: string;
}

export function getProjects(): ProjectData[] {
    const db = getDb();

    const projects = db
        .prepare("SELECT * FROM projects ORDER BY sort_order")
        .all() as Array<Record<string, unknown>>;

    const projectTechs = db
        .prepare(
            `SELECT pt.project_id, t.*
             FROM project_technologies pt
             JOIN technologies t ON t.id = pt.technology_id`,
        )
        .all() as Array<Record<string, unknown>>;

    const techByProject = new Map<number, Array<Record<string, unknown>>>();
    for (const row of projectTechs) {
        const pid = row.project_id as number;
        if (!techByProject.has(pid)) techByProject.set(pid, []);
        const { project_id: _, ...tech } = row;
        techByProject.get(pid)!.push(tech);
    }

    const allImages = db
        .prepare("SELECT * FROM project_images ORDER BY sort_order")
        .all() as Array<Record<string, unknown>>;

    const imagesByProject = new Map<number, Array<Record<string, unknown>>>();
    for (const img of allImages) {
        const pid = img.project_id as number;
        if (!imagesByProject.has(pid)) imagesByProject.set(pid, []);
        imagesByProject.get(pid)!.push(img);
    }

    return projects.map((p) => ({
        ...(p as unknown as ProjectData),
        technologies: techByProject.get(p.id as number) || [],
        images_data: imagesByProject.get(p.id as number) || [],
    }));
}

export function getProject(idOrSlug: string | number): (ProjectData & { images_data: Array<Record<string, unknown>> }) | null {
    const db = getDb();

    const project = typeof idOrSlug === "number" || /^\d+$/.test(String(idOrSlug))
        ? db.prepare("SELECT * FROM projects WHERE id = ?").get(idOrSlug) as Record<string, unknown> | undefined
        : db.prepare("SELECT * FROM projects WHERE slug = ?").get(idOrSlug) as Record<string, unknown> | undefined;

    if (!project) return null;

    const technologies = db
        .prepare(
            `SELECT t.* FROM project_technologies pt
             JOIN technologies t ON t.id = pt.technology_id
             WHERE pt.project_id = ?`,
        )
        .all(project.id) as Array<Record<string, unknown>>;

    const images = db
        .prepare("SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order")
        .all(project.id) as Array<Record<string, unknown>>;

    return {
        ...(project as unknown as ProjectData),
        technologies,
        images_data: images,
    };
}
