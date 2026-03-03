import { getDb } from "@/db";
import type { ContactItem } from "@/widgets/landing/MainSlide";
import Contacts from "@/entities/contact/ui/Contacts";

function getContacts(): ContactItem[] {
    const db = getDb();
    return db.prepare("SELECT * FROM contact_info WHERE is_visible = 1 ORDER BY sort_order").all() as ContactItem[];
}

export default function InteractPage() {
    const contacts = getContacts();
    return <Contacts contacts={contacts} />;
}
