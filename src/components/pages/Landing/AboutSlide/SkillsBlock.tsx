import { Box, darken, lighten } from "@mui/material";
import { useLandingColor } from "..";
import { mix } from "@/utilities/colors";
import LandingLink from "../LandingLink";
import { useColorMode, useLanguage } from "@/store/appearanceSlice";
import Emoji from "../Emoji";
import SkillsIllustration from "./SkillsIllustration";
import TechnologiesCrumbs from "@/components/TechnologiesCrumbs";

export default function SkillsBlock() {
    const lang = useLanguage();
    const isDarkMode = useColorMode().dark;
    const textColor = useLandingColor("contrast");
    const accentColor = useLandingColor("accentA");
    const notelessColor = useLandingColor("noteless");
    const darkPaleAccent = mix(accentColor, "#777777", 0.6);
    return (
        <Box sx={{ display: "flex", gap: "5vw", alignItems: "center", justifyContent: "center" }}>
            <SkillsIllustration sx={{ width: "40%" }} />
            <Box>
                <Box sx={{ fontFamily: "NeueMachina", color: textColor, fontSize: "57px", lineHeight: 1 }}>
                    {lang.ru ? "Про " : "About "}
                    <Box
                        sx={{
                            display: "inline-block",
                            background: `linear-gradient(25deg, ${useLandingColor("accentA")}, ${useLandingColor(
                                "accentB"
                            )})`,
                            lineHeight: 1.25,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {lang.ru ? "навыки" : "skills"}
                    </Box>{" "}
                    <Box component="span" sx={{ fontSize: "45px", position: "relative", top: "-4px" }}>
                        💪
                    </Box>
                    <Box sx={{ height: "25px" }}></Box>
                    <Box
                        sx={{
                            background: `linear-gradient(90deg, ${textColor} 30%, ${darkPaleAccent})`,
                            fontFamily: "Cascadia",
                            lineHeight: 1.2,
                            fontSize: "27px",
                            fontWeight: "500",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        <br />
                        {lang.ru ? (
                            <>
                                За более чем 10 лет удалось перепробовать
                                <br />
                                не малое количество языков, платформ и <br />
                                инструментов от .NET Framework 3.0-4.5 на С#,
                                <br />
                                Android на Java до 1С:Предприятие.
                                <br />
                                Хотя я не скрываю свою особенную любовь <Emoji e="✨" />
                                <br />
                                к веб и фронтенд-разработке.
                                <br />
                                <br />Я не останавливаюсь в совершенствовании
                                <br />
                                своих <LandingLink href="/about/specifications/soft-skills">навыков</LandingLink>
                                <Emoji e="🤸‍♀️" /> и новых{" "}
                                <LandingLink href="/about/specifications/hard-skills">технологий</LandingLink>
                                <Emoji e="🏋️‍♀️" />. Те из них,
                                <br />
                                с которыми я работаю сейчас особенно часто:
                                <br />
                            </>
                        ) : (
                            <>
                                For over 10 years, I have had the <br />
                                opportunity to work with a wide range <br />
                                of languages, platforms, and tools, <br />
                                from .NET Framework 3.0-4.5 in C# <br />
                                and Android in Java to 1C:Enterprise. <br />
                                <br />
                                Despite this, my particular passion <Emoji e="✨" />
                                <br />
                                lies in web and frontend development.
                                <br />
                                <br />I never stop improving my{" "}
                                <LandingLink href="/about/specifications/soft-skills">skills</LandingLink>{" "}
                                <Emoji e="🤸‍♀️" /> <br />
                                and exploring new{" "}
                                <LandingLink href="/about/specifications/hard-skills">technologies</LandingLink>{" "}
                                <Emoji e="🏋️‍♀️" />. <br />
                                Here are some of the technologies <br />I frequently work with nowadays:
                            </>
                        )}
                    </Box>
                    <div className="h-4"></div>
                    <TechnologiesCrumbs
                        contrast={true}
                        techs="frontend"
                        sx={{
                            maxWidth: "700px",
                            rowGap: "2px",
                            "& .MuiChip-label, & .MuiBreadcrumbs-li .MuiChip-icon": {
                                fontSize: "23px",
                            },
                            ".MuiMenuItem-root": {
                                fontSize: "23px",
                            },
                            "& .MuiChip-root": {
                                paddingLeft: "8px",
                                maxHeight: "unset",
                                height: "fit-content",
                                "& .MuiChip-label": {
                                    transition: "all 0.3s",
                                    color: isDarkMode ? lighten(notelessColor, 0.7) : textColor,
                                },
                                "&: hover": {
                                    "& .MuiChip-label": {
                                        color: isDarkMode ? lighten(textColor, 0.5) : darken(textColor, 0.5),
                                    },
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
