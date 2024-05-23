import { darken, lighten, useTheme } from "@mui/material";
import { useLandingColor } from "..";
import LandingLink from "../LandingLink";
import { useColorMode, useLanguage } from "@/store/appearanceSlice";
import Emoji from "../Emoji";
import SkillsIllustration from "./SkillsIllustration";
import TechnologiesCrumbs from "@/components/TechnologiesCrumbs";
import AboutBlock from "./AboutBlock";
import { SxProps } from "@mui/material";

export default function SkillsBlock({ id, sx }: { id: string; sx?: SxProps }) {
    const lang = useLanguage();
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const textColor = useLandingColor("contrast");
    const notelessColor = useLandingColor("noteless");
    return (
        <AboutBlock
            illustration={<SkillsIllustration />}
            order="right"
            title={lang.ru ? ["Про", "навыки", "💪"] : ["About", "skills", "💪"]}
            id={id}
            sx={sx}
        >
            {{
                text: lang.ru ? (
                    <>
                        За более чем 10 лет удалось перепробовать не малое количество языков, платформ и инструментов от
                        .NET Framework 3.0-4.5 на С#, Android на Java до 1С:Предприятие. Хотя я не скрываю свою
                        особенную любовь <Emoji e="✨" />
                        к веб и фронтенд-разработке.
                        <br />
                        <br />Я не останавливаюсь в совершенствовании своих{" "}
                        <LandingLink href="/about/specifications/soft-skills">навыков</LandingLink>
                        <Emoji e="🤸‍♀️" /> и новых{" "}
                        <LandingLink href="/about/specifications/hard-skills">технологий</LandingLink>
                        <Emoji e="🏋️‍♀️" />. Те из них, с которыми я работаю сейчас особенно часто:
                    </>
                ) : (
                    <>
                        For over 10 years, I have had the opportunity to work with a wide range of languages, platforms,
                        and tools, from .NET Framework 3.0-4.5 in C# and Android in Java to 1C:Enterprise. Despite this,
                        my particular passion <Emoji e="✨" />
                        lies in web and frontend development.
                        <br />
                        <br />I never stop improving my{" "}
                        <LandingLink href="/about/specifications/soft-skills">skills</LandingLink> <Emoji e="🤸‍♀️" /> and
                        exploring new <LandingLink href="/about/specifications/hard-skills">technologies</LandingLink>{" "}
                        <Emoji e="🏋️‍♀️" />. Here are some of the technologies I frequently work with nowadays:
                    </>
                ),
                controls: (
                    <>
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
                                [theme.breakpoints.down("md")]: {
                                    maxWidth: "86vw",
                                },
                            }}
                        />
                    </>
                ),
            }}
        </AboutBlock>
    );
}
