"use client";
import LandingLink from "../LandingLink";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import Emoji from "../Emoji";
import AboutBlock from "./AboutBlock";
import { Box, SxProps } from "@mui/material";
import AchievementIllustration from "./AchievementsIllustration";

export default function AchievementsBlock({ id, sx }: { id: string; sx?: SxProps }) {
    const lang = useLanguage();
    return (
        <AboutBlock
            illustration={<AchievementIllustration />}
            order="right"
            title={lang.ru ? ["Про", "достижения", "🏆"] : ["About", "achievements", "🏆"]}
            id={id}
            sx={sx}
            squeezedImgVPos="0% -80%"
        >
            {lang.ru ? (
                <>
                    Больше, чем о личных достижениях, публикациях, грамотах и наградах{"\u00A0"}
                    <Emoji e="🤵" /> хотел бы отметить некоторые профессиональные{" "}
                    <LandingLink href="/about/experience/achievements">результаты</LandingLink>:
                    <br />
                    <Box
                        component="ul"
                        sx={{
                            listStyle: "disc",
                            paddingLeft: "25px",
                            "& li": {
                                marginTop: "15px",
                            },
                        }}
                    >
                        <li>
                            Самостоятельно разработал <LandingLink href="/projects/auto-stock">сайт</LandingLink> учета
                            остатков авто деталей{"\u00A0"}
                            <Emoji e="🚗" />, интеграцию с 1С, что существенно сократило объем ручной работы на ~60
                            чел.ч в месяц.
                        </li>
                        <li>
                            С нуля создал собственную <LandingLink href="/projects/suzrp">конфигурацию 1С</LandingLink>{" "}
                            для специального учета заработной платы{"\u00A0"}
                            <Emoji e="🪙" /> кабельного производства, активно используемую на сегодняшний день более 4
                            лет.
                        </li>
                        <li>
                            В роли ведущего программиста написал действующий краевой{" "}
                            <LandingLink href="/projects/kvll">портал</LandingLink> объявлений о недвижимости{"\u00A0"}
                            <Emoji e="📰" />, целиком занимался бизнес-логикой проекта, программированием backend и
                            frontend частей.
                        </li>
                    </Box>
                </>
            ) : (
                <>
                    More than personal achievements, publications, certificates, and awards{"\u00A0"}
                    <Emoji e="🤵" />, I would like to highlight some professional{" "}
                    <LandingLink href="/about/experience/achievements">results</LandingLink>:
                    <br />
                    <Box
                        component="ul"
                        sx={{
                            listStyle: "disc",
                            "& li": {
                                marginTop: "15px",
                            },
                        }}
                    >
                        <li>
                            Independently developed a <LandingLink href="/projects/auto-stock">website</LandingLink> for
                            tracking auto parts inventory{"\u00A0"}
                            <Emoji e="🚗" />, its integration with 1C, significantly reducing manual work by
                            approximately 60 man-hours per month.
                        </li>
                        <li>
                            From scratch, created a custom{" "}
                            <LandingLink href="/projects/suzrp">1C configuration</LandingLink> for specialized payroll
                            accounting{"\u00A0"}
                            <Emoji e="🪙" /> for a cable manufacturing company, which has been actively used for over 4
                            years.
                        </li>
                        <li>
                            As the lead programmer, developed a regional real estate classifieds{" "}
                            <LandingLink href="/projects/kvll">portal</LandingLink>
                            {"\u00A0"}
                            <Emoji e="📰" />, fully handling the business logic of the project, as well as programming
                            the backend and frontend parts.
                        </li>
                    </Box>
                </>
            )}
        </AboutBlock>
    );
}
