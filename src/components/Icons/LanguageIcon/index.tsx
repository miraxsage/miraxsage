import ru from "./Russian.svg";
import en from "./English.svg";
import classes from "classnames";
import { ImgHTMLAttributes } from "react";

type LanguageIconProps = {
    language: "ru" | "en";
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "language" | "src">;

export default function LanguageIcon({
    language,
    className,
    ...props
}: LanguageIconProps) {
    return (
        <img
            className={classes(
                className,
                "aspect-[1/1] w-[22px] rounded object-cover inline-block"
            )}
            src={{ ru, en }[language]}
            {...props}
        />
    );
}
