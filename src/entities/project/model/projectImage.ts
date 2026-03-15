export interface ProjectImage {
    id: number;
    project_id: number;
    slug: string;
    original_ext: string;
    title_en: string;
    title_ru: string;
    description_en: string;
    description_ru: string;
    is_cover: number;
    sort_order: number;
    created_at: string;
}
