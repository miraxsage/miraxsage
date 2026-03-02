import { getDb } from "@/db";
import LandingClient from "./LandingClient";
import type { LandingButton, TitleVariant } from "@/widgets/landing/MainSlide";
import type { UiLabelsMap } from "@/entities/ui-labels/model/uiLabelsContext";
import type { CategoryLabelEntry } from "@/entities/resume/model/categoryLabels";

function getLandingButtons(): LandingButton[] {
    const db = getDb();
    return db.prepare("SELECT * FROM landing_buttons ORDER BY sort_order").all() as LandingButton[];
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

function getCategoryLabels(): Record<string, CategoryLabelEntry> {
    const db = getDb();
    const rows = db.prepare("SELECT slug, label_en, label_ru FROM resume_categories").all() as Array<{
        slug: string;
        label_en: string;
        label_ru: string;
    }>;
    const map: Record<string, CategoryLabelEntry> = {};
    for (const row of rows) {
        map[row.slug] = { label_en: row.label_en, label_ru: row.label_ru };
    }
    return map;
}

export default function Landing() {
    const buttons = getLandingButtons();
    const titleVariants = getTitleVariants();
    const uiLabels = getUiLabels();
    const categoryLabels = getCategoryLabels();
    return <LandingClient buttons={buttons} titleVariants={titleVariants} uiLabels={uiLabels} categoryLabels={categoryLabels} />;
}
