import ru from "@/assets/transtations/ru.json";

function copyWordCasing(initialWord: string, targetWord: string) {
    if (initialWord.match(/^[-_()[\]"'A-ZА-Я\s]+$/u)) return targetWord.toUpperCase();
    for (let i = 0; i < Math.min(initialWord.length, targetWord.length); i++) {
        const letter = initialWord[i];
        if (letter.match(/[a-zа-я]/iu))
            return (
                initialWord.slice(0, i) +
                targetWord[i][letter == letter.toUpperCase() ? "toUpperCase" : "toLowerCase"]() +
                targetWord.slice(i + 1)
            );
        else if (!letter.match(/^[-_()[\]"'\s]+$/u)) break;
    }
    return targetWord;
}
function copyTextCasing(initialText: string, targetText: string) {
    initialText = initialText.trim();
    targetText = targetText.trim();
    const initialWords = initialText.split(" ");
    const targetWords = targetText.split(" ");
    if (initialWords.length != targetWords.length) return copyWordCasing(initialText, targetText);
    else {
        let res = "";
        for (let i = 0; i < initialWords.length; i++) res += copyWordCasing(initialWords[i], targetWords[i]) + " ";
        return res.trim();
    }
}

export default function __(phrase: string | string[], lang?: "en" | "ru") {
    if (Array.isArray(phrase)) {
        let res = "";
        for (const p of phrase) res += __(p, lang);
        return res;
    }
    if (!lang) lang = JSON.parse(localStorage.getItem("appearanceConfig") ?? `{"language": "en"}`).language;
    let opts: string[] = [];
    [phrase, ...opts] = phrase.split("|");
    const lowCasePhrase = phrase.toLowerCase();
    if (lowCasePhrase in ru) {
        if (lang == "en") return phrase.replace("_", " ");
        let trans = ru[lowCasePhrase as keyof typeof ru];
        if (Array.isArray(trans))
            trans = opts.length > 0 && Number(opts[0]) < trans.length ? trans[Number(opts[0])] : trans[0];
        return copyTextCasing(phrase, trans).replace("_", " ");
    }
    return phrase.replace("_", " ");
}
