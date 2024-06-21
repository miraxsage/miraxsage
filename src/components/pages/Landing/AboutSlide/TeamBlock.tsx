import LandingLink from "../LandingLink";
import { useLanguage } from "@/store/appearanceSlice";
import Emoji from "../Emoji";
import AboutBlock from "./AboutBlock";
import TeamIllustration from "./TeamIllustration";
import { SxProps } from "@mui/material";

export default function TeamBlock({ id, sx }: { id: string; sx?: SxProps }) {
    const lang = useLanguage();
    return (
        <AboutBlock
            illustration={<TeamIllustration />}
            order="left"
            title={lang.ru ? ["Про", "цели", "🎯"] : ["About", "objectives", "🎯"]}
            id={id}
            sx={sx}
            squeezedImgHPos="-80% 0%"
        >
            {lang.ru ? (
                <>
                    Не смотря на перечисленный выше <LandingLink href="/about/experience">опыт</LandingLink>, считаю что
                    существует много вещей и технологий, которые я еще должен узнать и попробовать.{"\u00A0"}
                    <Emoji e="🕵️‍♂️" />
                    <br />
                    <br />Я всегда рад присоединиться к дружной, активной и прогрессивной команде{"\u00A0"}
                    <Emoji e="🎢" /> разработчиков, где можно учиться{"\u00A0"}
                    <Emoji e="🧑‍🎓" /> чему то новому и решать сложные задачи.
                    <br />
                    <br />
                    Если у Вас появилось желание написать мне, задать вопрос или сделать преложение - я всегда жду Вашу{" "}
                    <LandingLink href="/interact">обратную связь</LandingLink>
                    {"\u00A0"}
                    <Emoji e="🧙" />
                </>
            ) : (
                <>
                    Despite the <LandingLink href="/about/experience">experience</LandingLink> listed above, I believe
                    there are many things and technologies I should learn and try out.{"\u00A0"}
                    <Emoji e="🕵️‍♂️" /> <br />
                    <br />I am always eager to join a friendly, active, and progressive team{"\u00A0"}
                    <Emoji e="🎢" /> of developers, where I can learn something new{"\u00A0"}
                    <Emoji e="🧑‍🎓" /> and tackle challenging tasks.
                    <br />
                    <br />
                    If you feel like reaching out to me, asking a question, or making a suggestion - I always look
                    forward to your <LandingLink href="/interact">feedback</LandingLink>.{"\u00A0"}
                    <Emoji e="🧙" />
                </>
            )}
        </AboutBlock>
    );
}
