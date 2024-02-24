import ru from "@/assets/transtations/ru.json";

export default function __(phrase: string, lang?: "en" | "ru") {
    if (!lang)
        lang = JSON.parse(
            localStorage.getItem("appearanceConfig") ?? `{"language": "en"}`
        ).language;
    const lowCasePhrase = phrase.toLowerCase();
    if (lowCasePhrase in ru) {
        if (lang == "en") return phrase;
        const trans = ru[lowCasePhrase as keyof typeof ru];
        if (phrase[0].search(/[A-Z]/) >= 0)
            return trans[0].toUpperCase() + trans.slice(1);
        return trans;
    }
    return phrase;
}
