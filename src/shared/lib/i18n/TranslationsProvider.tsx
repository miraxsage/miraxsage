"use client";

import { ReactNode } from "react";
import { setTranslationsMap } from "./translation";
import type { TranslationsMap } from "./getTranslations";

export default function TranslationsProvider({
    translations,
    children,
}: {
    translations: TranslationsMap;
    children: ReactNode;
}) {
    setTranslationsMap(translations);
    return children;
}
