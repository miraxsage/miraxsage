import LandingLink from "../LandingLink";
import { useLanguage } from "@/store/appearanceSlice";
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
        >
            {lang.ru ? (
                <>
                    Больше, чем о личных достижениях, публикациях, грамотах и наградах <Emoji e="🤵" />, хотел бы
                    отметить некоторые профессиональные{" "}
                    <LandingLink href="/about/experience/achievements">результаты</LandingLink>:
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
                            Самостоятельно разработал <LandingLink href="/projects/auto-stock">сайт</LandingLink> учета
                            остатков авто деталей <Emoji e="🚗" />, интеграцию с 1С, что существенно сократило объем
                            ручной работы на ~ 60 чел.ч в месяц
                        </li>
                        <li>
                            С нуля создал собственную <LandingLink href="/projects/suzrpk">конфигурацию 1С</LandingLink>{" "}
                            для специального учета заработной платы <Emoji e="🪙" /> кабельного производства, активно
                            используемую на сегодняшний день более 4 лет
                        </li>
                        <li>
                            В роли ведущего программиста написал действующий краевой{" "}
                            <LandingLink href="/projects/kvll">портал</LandingLink> объявлений о недвижимости{" "}
                            <Emoji e="📰" />, целиком занимался бизнес-логикой проекта, программированием backend и
                            frontend частей
                        </li>
                    </Box>
                </>
            ) : (
                <>
                    I became passionate about programming <Emoji e="📟" />
                    and web development back in 2010 when I was in the 11th grade <Emoji e="🌱" />. Even then, I enjoyed
                    creating complex, beautiful, and functional interfaces. <Emoji e="📱" />
                    <br />
                    <br />
                    In 2015, I graduated with honors <Emoji e="📕" />
                    from <LandingLink href="/about/education">university</LandingLink>
                    <Emoji e="🏦" /> with a degree in Information Technology.
                    <br />
                    <br />
                    From then on and to this day, I have never lost my creative interest and inspiration for
                    programming. I love designing, sometimes spending hours fixing a single bug <Emoji e="🐞" />, but
                    always finding a solution in the end. <Emoji e="⛅️" />
                </>
            )}
        </AboutBlock>
    );
}
