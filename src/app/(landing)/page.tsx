import { getDb } from "@/db";
import LandingClient from "./LandingClient";
import type { LandingButton, TitleVariant, InfoBlock, GetCloserItem, FooterItem, ContactItem } from "@/widgets/landing/MainSlide";
import type { UiLabelsMap } from "@/entities/ui-labels/model/uiLabelsContext";
import type { CategoryLabelEntry } from "@/entities/resume/model/categoryLabels";
import { resolveIconSvg } from "@/shared/lib/resolveIconSvg";

function getLandingButtons(): LandingButton[] {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM landing_buttons ORDER BY sort_order").all() as LandingButton[];
    return rows.map((btn) => ({ ...btn, icon_svg: resolveIconSvg(btn.icon) }));
}

function getTitleVariants(): TitleVariant[] {
    const db = getDb();
    return db.prepare("SELECT * FROM landing_title_variants ORDER BY sort_order").all() as TitleVariant[];
}

function getUiLabels(): UiLabelsMap {
    const db = getDb();
    const rows = db.prepare("SELECT key, value_en, value_ru FROM ui_labels").all() as Array<{
        key: string;
        value_en: string;
        value_ru: string;
    }>;
    const map: UiLabelsMap = {};
    for (const row of rows) {
        map[row.key] = { value_en: row.value_en, value_ru: row.value_ru };
    }
    return map;
}

function getInfoBlocks(): InfoBlock[] {
    const db = getDb();
    return db.prepare("SELECT * FROM landing_info_blocks WHERE is_visible = 1 ORDER BY sort_order").all() as InfoBlock[];
}

function getFooter(): FooterItem[] {
    const db = getDb();
    return db.prepare("SELECT * FROM landing_footer ORDER BY sort_order").all() as FooterItem[];
}

function getContacts(): ContactItem[] {
    const db = getDb();
    const rows = db.prepare("SELECT * FROM contact_info WHERE is_visible = 1 ORDER BY sort_order").all() as ContactItem[];
    return rows.map((c) => ({ ...c, icon_svg: resolveIconSvg(c.icon) }));
}

function getGetCloser(): GetCloserItem | null {
    const db = getDb();
    return (db.prepare("SELECT * FROM landing_get_closer LIMIT 1").get() as GetCloserItem) ?? null;
}

function getCategoryLabels(): Record<string, CategoryLabelEntry> {
    const db = getDb();
    const rows = db.prepare("SELECT slug, label_en, label_ru, sort_order, icon FROM resume_categories WHERE is_landing_visible = 1").all() as Array<{
        slug: string;
        label_en: string;
        label_ru: string;
        sort_order: number;
        icon: string | null;
    }>;
    const map: Record<string, CategoryLabelEntry> = {};
    for (const row of rows) {
        const icon = row.icon ?? undefined;
        map[row.slug] = { label_en: row.label_en, label_ru: row.label_ru, sort_order: row.sort_order, icon, icon_svg: resolveIconSvg(icon) };
    }
    return map;
}

export default function Landing() {
    const buttons = getLandingButtons();
    const titleVariants = getTitleVariants();
    const uiLabels = getUiLabels();
    const categoryLabels = getCategoryLabels();
    const infoBlocks = getInfoBlocks();
    const getCloser = getGetCloser();
    const footer = getFooter();
    const contacts = getContacts();
    return <LandingClient buttons={buttons} titleVariants={titleVariants} uiLabels={uiLabels} categoryLabels={categoryLabels} infoBlocks={infoBlocks} getCloser={getCloser} footer={footer} contacts={contacts} />;
}
