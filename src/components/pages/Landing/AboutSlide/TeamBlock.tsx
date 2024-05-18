import { Box } from "@mui/material";
import __ from "@/utilities/transtation";
import { useLandingColor } from "..";
import { mix } from "@/utilities/colors";
import LandingLink from "../LandingLink";
import { useLanguage } from "@/store/appearanceSlice";
import TeamIllustration from "./TeamIllustration";
import Emoji from "../Emoji";

export default function TeamBlock() {
    const lang = useLanguage();
    const textColor = useLandingColor("contrast");
    const accentColor = useLandingColor("accentA");
    const darkPaleAccent = mix(accentColor, "#777777", 0.6);
    return (
        <Box sx={{ display: "flex", gap: "5vw", alignItems: "center", justifyContent: "center" }}>
            <TeamIllustration sx={{ width: "40%" }} />
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
                        {lang.ru ? "цели" : "objectives"}
                    </Box>
                    !{" "}
                    <Box component="span" sx={{ fontSize: "45px", position: "relative", top: "-4px" }}>
                        🎯
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
                        {lang.ru ? (
                            <>
                                Не смотря на перечисленный выше <LandingLink href="/about/experience">опыт</LandingLink>
                                ,
                                <br />
                                считаю что существует много вещей и<br />
                                технологий, которые я должен узнать и <br />
                                попробовать.
                                <Emoji e="🕵️‍♂️" />
                                <br />
                                <br />
                                Я всегда рад присоединиться к дружной,
                                <br />
                                активной и прогрессивной команде <Emoji e="🎢" />
                                <br />
                                разработчиков, где можно учиться <Emoji e="🧑‍🎓" /> <br />
                                чему то новому и решать сложные задачи.
                                <br />
                                <br />
                                Если у Вас появилось желание написать мне,
                                <br />
                                задать вопрос или сделать преложение - <br />я всегда жду Вашу{" "}
                                <LandingLink href="/interact">обратную связь</LandingLink> <Emoji e="🧙" />
                            </>
                        ) : (
                            <>
                                Despite the <LandingLink href="/about/experience">experience</LandingLink> listed above,
                                <br />
                                I believe there are many things and <br /> technologies I should learn and try <br />
                                out. <Emoji e="🕵️‍♂️" /> <br />
                                <br />
                                I am always eager to join a friendly,
                                <br />
                                active, and progressive team <Emoji e="🎢" /> of
                                <br />
                                developers, where I can learn something
                                <br />
                                new <Emoji e="🧑‍🎓" /> and tackle challenging tasks.
                                <br />
                                <br />
                                If you feel like reaching out to
                                <br />
                                me, asking a question, or making a <br />
                                suggestion - I always look forward
                                <br />
                                to your <LandingLink href="/interact">feedback</LandingLink>. <Emoji e="🧙" />
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
