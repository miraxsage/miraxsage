import LandingLink from "../LandingLink";
import { useLanguage } from "@/store/appearanceSlice";
import WebDeveloperIllustration from "./WebDeveloperIllustration";
import Emoji from "../Emoji";
import AboutBlock from "./AboutBlock";
import { SxProps } from "@mui/material";

export default function AboutMeBlock({ id, sx }: { id: string; sx?: SxProps }) {
    const lang = useLanguage();
    return (
        <AboutBlock
            illustration={<WebDeveloperIllustration />}
            order="left"
            title={lang.ru ? ["Обо", "мне", "👨‍💻"] : ["About", "me", "👨‍💻"]}
            id={id}
            sx={sx}
            squeezedImgHPos="-85% 0%"
        >
            {lang.ru ? (
                <>
                    Программированием <Emoji e="📟" /> и веб-разработкой я увлекся еще в 11 классе <Emoji e="🌱" />,
                    далеком 2010-м.
                    <br />
                    <br />
                    Еще тогда мне нравилось собирать сложные, красивые и функциональные интерфейсы. <Emoji e="📱" />
                    <br />
                    <br />
                    В 2015 с красным дипломом <Emoji e="📕" /> окончил{" "}
                    <LandingLink href="/about/biography/education">университет</LandingLink>
                    <Emoji e="🏦" /> по профильному направлению информационных технологий.
                    <br />
                    <br />
                    Прежде и до сих пор не теряю творческого интереса и вдохновения программировать, проектировать,
                    порой часами исправлять единственный баг <Emoji e="🐞" />, но в итоге все равно всегда находить
                    творческое решение. <Emoji e="⛅️" />
                </>
            ) : (
                <>
                    I became passionate about programming <Emoji e="📟" /> and web development back in 2010 when I was
                    in the 11th grade <Emoji e="🌱" />. Even then, I enjoyed creating complex, beautiful, and functional
                    interfaces. <Emoji e="📱" />
                    <br />
                    <br />
                    In 2015, I graduated with honors <Emoji e="📕" /> from{" "}
                    <LandingLink href="/about/biography/education">university</LandingLink>
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
