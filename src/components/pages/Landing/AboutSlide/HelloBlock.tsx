import { Box } from "@mui/material";
import DeveloperIllustration from "./DeveloperIllustration";
import __ from "@/utilities/transtation";
import { useLandingColor } from "..";
import LandingLink from "../LandingLink";
import { useLanguage } from "@/store/appearanceSlice";
import AboutBlock from "./AboutBlock";
import { SxProps } from "@mui/material";

export default function HelloBlock({ id, sx }: { id: string; sx?: SxProps }) {
    const lang = useLanguage();
    const textColor = useLandingColor("contrast");
    return (
        <AboutBlock
            illustration={<DeveloperIllustration />}
            order="right"
            title={lang.ru ? ["Всем", "привет", "👋"] : ["Hello", "everyone", "👋"]}
            id={id}
            sx={sx}
        >
            {lang.ru ? "Меня зовут Максим и я" : "My name is Maxim and I am a"}
            <Box component="span" sx={{ textDecoration: "line-through", textDecorationColor: textColor }}>
                {lang.ru ? " трудоголик" : " workaholic"}
            </Box>
            {lang.ru ? " веб-разработчик" : " web-developer"}
            <Box component="span" sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}>
                🙂‍
            </Box>
            .
            <br />
            {lang.ru ? (
                <>
                    Давайте немного познакомимся. На этой страничке я расскажу чуть чуть о себе, о своих навыках и
                    опыте.
                    <br />
                    <br />
                    Вы всегда можете изучить мое подробное
                </>
            ) : (
                <>
                    Let's get acquainted just a bit. On this page I will tell you a little about myself, my skills and
                    experience.
                    <br />
                    <br />
                    You can always view my detailed
                </>
            )}{" "}
            <LandingLink href="/about">{__("resume")}</LandingLink>
            <Box component="span" sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}>
                📜
            </Box>{" "}
            {lang.ru ? "и" : "and"} <LandingLink href="/projects">{__("portfolio")}</LandingLink>
            <Box component="span" sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}>
                💼
            </Box>
            ,
            {lang.ru ? (
                <>перейдя по соответствующим ссылкам в каждом из блоков или начале страницы.</>
            ) : (
                <>by clicking on the appropriate links in each of the blocks or at the beginning of the page.</>
            )}
        </AboutBlock>
    );
}
