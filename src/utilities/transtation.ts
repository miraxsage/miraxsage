import ru from "@/assets/transtations/ru.json";

export default function __(phrase: string, lang?: "en" | "ru") {
    if (!lang)
        lang = JSON.parse(
            localStorage.getItem("appearanceConfig") ?? `{"language": "en"}`
        ).language;
    let opts: string[] = [];
    [phrase, ...opts] = phrase.split("|");
    const lowCasePhrase = phrase.toLowerCase();
    if (lowCasePhrase in ru) {
        if (lang == "en") return phrase;
        let trans = ru[lowCasePhrase as keyof typeof ru];
        if (Array.isArray(trans))
            trans =
                opts.length > 0 && Number(opts[0]) < opts.length
                    ? trans[Number(opts[0])]
                    : trans[0];
        if (phrase[0].search(/[A-Z]/) >= 0)
            return trans[0].toUpperCase() + trans.slice(1);
        return trans;
    }
    return phrase;
}
