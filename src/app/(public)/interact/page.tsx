import { getDb } from "@/db";
import type { ContactItem } from "@/widgets/landing/MainSlide";
import type { PageContentItem } from "@/entities/contact/ui/Thankfullness";
import Contacts from "@/entities/contact/ui/Contacts";

function getContacts(): ContactItem[] {
    const db = getDb();
    return db.prepare("SELECT * FROM contact_info WHERE is_visible = 1 ORDER BY sort_order").all() as ContactItem[];
}

function getPageContent(): PageContentItem[] {
    const db = getDb();
    return db.prepare("SELECT * FROM contact_page_content").all() as PageContentItem[];
}

export default function InteractPage() {
    const contacts = getContacts();
    const content = getPageContent();
    return <Contacts contacts={contacts} content={content} />;
}
