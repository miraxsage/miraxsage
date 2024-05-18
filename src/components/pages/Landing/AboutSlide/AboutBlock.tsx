import { Box } from "@mui/material";
import { useLandingColor } from "..";
import { mix } from "@/utilities/colors";
import LandingLink from "../LandingLink";
import { useLanguage } from "@/store/appearanceSlice";
import WebDeveloperIllustration from "./WebDeveloperIllustration";
import Emoji from "../Emoji";

export default function AboutBlock() {
    const lang = useLanguage();
    const textColor = useLandingColor("contrast");
    const accentColor = useLandingColor("accentA");
    const darkPaleAccent = mix(accentColor, "#777777", 0.6);
    return (
        <Box sx={{ display: "flex", gap: "5vw", alignItems: "center", justifyContent: "center" }}>
            <Box>
                <Box sx={{ fontFamily: "NeueMachina", color: textColor, fontSize: "57px", lineHeight: 1 }}>
                    {lang.ru ? "Обо " : "About "}
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
                        {lang.ru ? "мне" : "me"}
                    </Box>{" "}
                    <Box component="span" sx={{ fontSize: "45px", position: "relative", top: "-4px" }}>
                        👨‍💻
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
                                Программированием <Emoji e="📟" /> и веб-разработкой я <br />
                                увлекся еще в 11 классе <Emoji e="🌱" />, далеком 2010-м.
                                <br />
                                Еще тогда мне нравилось собирать сложные, <br />
                                красивые и функциональные интерфейсы. <Emoji e="📱" />
                                <br />
                                <br />
                                В 2015 с красным дипломом <Emoji e="📕" /> окончил
                                <br />
                                <LandingLink href="/about/education">университет</LandingLink>
                                <Emoji e="🏦" /> по профильному направлению
                                <br />
                                информационных технологий.
                                <br />
                                <br />
                                И тогда и до сих пор не терял творческого <br />
                                интереса и вдохновения программировать, <br />
                                проектировать, порой часами исправлять <br />
                                единственный баг <Emoji e="🐞" />, но в итоге все
                                <br />
                                равно всегда находить решение. <Emoji e="⛅️" />
                            </>
                        ) : (
                            <>
                                I became passionate about programming <Emoji e="📟" /> <br />
                                and web development back in 2010 when <br />
                                I was in the 11th grade <Emoji e="🌱" />. Even then, <br />
                                I enjoyed creating complex, beautiful, <br />
                                and functional interfaces. <Emoji e="📱" />
                                <br />
                                <br />
                                In 2015, I graduated with honors <Emoji e="📕" /> <br />
                                from <LandingLink href="/about/education">university</LandingLink>
                                <Emoji e="🏦" /> with a degree <br />
                                in Information Technology.
                                <br />
                                <br />
                                From then on and to this day, I have <br />
                                never lost my creative interest and <br />
                                inspiration for programming. I love <br />
                                designing, sometimes spending hours <br />
                                fixing a single bug <Emoji e="🐞" />, but always
                                <br /> finding a solution in the end. <Emoji e="⛅️" />
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
            <WebDeveloperIllustration sx={{ width: "40%" }} />
        </Box>
    );
}
