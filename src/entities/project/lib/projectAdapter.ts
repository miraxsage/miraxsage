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
        technologies: p.technologies.map((tech) => tech.name as string as TechnologiesList),
        images: p.images_count,
        ...(p.cover_brightness ? { coverBrightmess: p.cover_brightness as "ligth" | "dark" } : {}),
    };
}

export function dbProjectsToProjectInterfaces(projects: ProjectData[]): ProjectInterface[] {
    return projects.map(dbProjectToProjectInterface);
}
