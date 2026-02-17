import { getDb } from "@/db";

export interface ContactData {
    contact_info: Array<Record<string, unknown>>;
    contact_page_content: Array<Record<string, unknown>>;
}

export function getContactData(): ContactData {
    const db = getDb();
    return {
        contact_info: db.prepare("SELECT * FROM contact_info ORDER BY sort_order").all() as Array<Record<string, unknown>>,
        contact_page_content: db.prepare("SELECT * FROM contact_page_content").all() as Array<Record<string, unknown>>,
    };
}
