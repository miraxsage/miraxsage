import { useLanguage } from "@/shared/lib/store/appearanceSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyItem = Record<string, any>;

export default function useLocalizedField() {
    const { lang } = useLanguage();
    const lk = (base: string) => `${base}_${lang}`;
    const lv = (item: AnyItem, base: string): string =>
        (item[`${base}_${lang}`] as string) ?? "";
    return { lang, lk, lv };
}
