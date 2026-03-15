import { ProjectData } from "@/entities/project/api/getProjects";
import { ProjectInterface } from "@/entities/project/model/projects";
import type { TechnologiesList } from "@/entities/resume/ui/blocks/specs/Technologies";

export function dbProjectToProjectInterface(p: ProjectData): ProjectInterface {
    return {
        slug: p.slug,
        name: { en: p.name_en, ru: p.name_ru },
        shortName: { en: p.short_name_en, ru: p.short_name_ru },
        description: { en: p.description_en, ru: p.description_ru },
        domain: p.domain,
        rating: p.rating,
        year: p.year,
        status: p.status as "developing" | "completed",
        participating: p.participating as "team" | "selfown",
        devTimeMonths: p.dev_time_months,
        ...(p.github_link ? { gitHubLink: p.github_link } : {}),
        technologies: p.technologies.map((tech) => (tech.name_en ?? tech.name) as string as TechnologiesList),
        images: ((p as any).images_data as Array<unknown> | undefined)?.length ?? 0,
        ...(p.cover_brightness ? { coverBrightmess: p.cover_brightness as "ligth" | "dark" } : {}),
        ...(p.media_id ? { mediaId: p.media_id } : {}),
        ...(p.site_link ? { siteLink: p.site_link } : {}),
        ...(p.content_en || p.content_ru ? { content: { en: p.content_en || "", ru: p.content_ru || "" } } : {}),
        ...((p as any).images_data ? {
            imageRecords: ((p as any).images_data as Array<Record<string, unknown>>).map((img) => ({
                slug: img.slug as string,
                originalExt: img.original_ext as string,
                isCover: img.is_cover === 1,
                sortOrder: img.sort_order as number,
                titleEn: (img.title_en as string) || "",
                titleRu: (img.title_ru as string) || "",
            })),
        } : {}),
    };
}

export function dbProjectsToProjectInterfaces(projects: ProjectData[]): ProjectInterface[] {
    return projects.map(dbProjectToProjectInterface);
}
