import ru from "./Russian.svg";
import en from "./English.svg";
import classes from "classnames";

type LanguageIconProps = {
    language: "ru" | "en";
};

export default function LanguageIcon({ language }: LanguageIconProps) {
    return (
        <img
            className={classes("aspect-[1/1] w-[25px] rounded object-cover")}
            src={{ ru, en }[language]}
        />
    );
}
