export interface InfoDrawerData {
    copyright_en: string;
    copyright_ru: string;
    status_icon: string;
    status_icon_svg?: string;
    status_text_en: string;
    status_text_ru: string;
    timezone_icon: string;
    timezone_icon_svg?: string;
    timezone: string;
    location_icon: string;
    location_icon_svg?: string;
    location_en: string;
    location_ru: string;
}

export const defaultInfoDrawerData: InfoDrawerData = {
    copyright_en: "",
    copyright_ru: "",
    status_icon: "WorkOutline",
    status_text_en: "",
    status_text_ru: "",
    timezone_icon: "Schedule",
    timezone: "",
    location_icon: "LocationOn",
    location_en: "",
    location_ru: "",
};
