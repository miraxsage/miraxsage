import ru from "./Russian.svg";
import en from "./English.svg";
import classes from "classnames";

type LanguageIconProps = {
    language: "ru" | "en";
    colored?: boolean;
};

export default function LanguageIcon({
    language,
    colored = false,
}: LanguageIconProps) {
    return (
        <img
            className={classes("aspect-[1/1] w-[25px] rounded object-cover", {
                grayscale: !colored,
            })}
            src={{ ru, en }[language]}
        />
    );
}
