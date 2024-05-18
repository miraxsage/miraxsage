import { Box } from "@mui/material";
import { useLandingColor } from "..";
import { mix } from "@/utilities/colors";
import LandingLink from "../LandingLink";
import { useLanguage } from "@/store/appearanceSlice";
import Emoji from "../Emoji";
import ExperienceIllustration from "./ExperienceIllustration";

export default function ExperienceBlock() {
    const lang = useLanguage();
    const textColor = useLandingColor("contrast");
    const accentColor = useLandingColor("accentA");
    const darkPaleAccent = mix(accentColor, "#777777", 0.6);
    return (
        <Box sx={{ display: "flex", gap: "5vw", alignItems: "center", justifyContent: "center" }}>
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
                        {lang.ru ? "опыт" : "experience"}
                    </Box>{" "}
                    <Box component="span" sx={{ fontSize: "45px", position: "relative", top: "-4px" }}>
                        💎
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
                                По своему профилю я разрабатывал <Emoji e="📟" />
                                <br />
                                профессиональные прикладные{" "}
                                <LandingLink href="/projects?techs=desktop">решения</LandingLink> для <br />
                                десктопа на промышленных предприятиях <Emoji e="🏭" /> <br />
                                и в компаниях оптовых продаж. <Emoji e="🏨" /> <br />
                                С независимой командой разработчиков
                                <br />
                                писал коммерческие{" "}
                                <LandingLink href="/projects?techs=frontend%2Cbackend">сайты</LandingLink> общей и{" "}
                                <br />
                                специализированной направленности в
                                <br />
                                различных областях от визиток и до
                                <br />
                                порталов недвижимости.
                                <Emoji e="📦" />
                                <br />
                                <br />
                                Не меньше участвовал в разработке
                                <br />
                                backend-части, в основном на{" "}
                                <LandingLink href="/projects?techs=php%2Cmysql">PHP и MySQL</LandingLink>. <br />
                                <br />
                                В рамках командной работы занимался как
                                <br />
                                разработкой новых проектов, так и
                                <br />
                                поддержкой уже существующих <Emoji e="🧑‍🔧" />, общался
                                <br />
                                с заказчиками, выявляя их потребности и <br />
                                предлагая эффективные решения.
                                <Emoji e="🔑" />
                            </>
                        ) : (
                            <>
                                Based on my profile, I have developed <br />
                                professional desktop{" "}
                                <LandingLink href="/projects?techs=desktop">applications</LandingLink> for <br />
                                industrial enterprises <Emoji e="🏭" /> and wholesale <br />
                                companies <Emoji e="🏨" />. Working with an independent <br />
                                team of developers, I have also created <br />
                                commercial <LandingLink href="/projects?techs=frontend%2Cbackend">
                                    websites
                                </LandingLink>{" "}
                                for various purposes,
                                <br />
                                ranging from general to specialized fields
                                <br /> such as real estate portals <Emoji e="📦" />. <br />
                                <br />
                                Additionally, I have been actively
                                <br />
                                involved in backend development, <br />
                                primarily using{" "}
                                <LandingLink href="/projects?techs=php%2Cmysql">PHP и MySQL</LandingLink>. <br />
                                <br />
                                Within the team framework, I have been
                                <br />
                                engaged in both the development of new
                                <br />
                                projects and the support of existing
                                <br />
                                ones <Emoji e="🧑‍🔧" />. I have interacted with clients,
                                <br />
                                identifying their needs and proposing
                                <br />
                                effective solutions <Emoji e="🔑" />.
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
            <ExperienceIllustration sx={{ width: "40%" }} />
        </Box>
    );
}
