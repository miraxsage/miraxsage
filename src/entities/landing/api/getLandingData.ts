import { getDb } from "@/db";

export interface LandingData {
    header_items: Array<Record<string, unknown>>;
    title_variants: Array<Record<string, unknown>>;
    buttons: Array<Record<string, unknown>>;
    info_blocks: Array<Record<string, unknown>>;
    footer: Array<Record<string, unknown>>;
}

export function getLandingData(): LandingData {
    const db = getDb();
    return {
        header_items: db.prepare("SELECT * FROM landing_header_items ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        title_variants: db.prepare("SELECT * FROM landing_title_variants ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        buttons: db.prepare("SELECT * FROM landing_buttons ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        info_blocks: db.prepare("SELECT * FROM landing_info_blocks ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        footer: db.prepare("SELECT * FROM landing_footer").all() as Array<Record<string, unknown>>,
    };
}
