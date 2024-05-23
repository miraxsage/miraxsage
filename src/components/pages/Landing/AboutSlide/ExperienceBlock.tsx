import LandingLink from "../LandingLink";
import { useLanguage } from "@/store/appearanceSlice";
import Emoji from "../Emoji";
import AboutBlock from "./AboutBlock";
import ExperienceIllustration from "./ExperienceIllustration";
import { SxProps } from "@mui/material";

export default function AboutMeBlock({ id, sx }: { id: string; sx?: SxProps }) {
    const lang = useLanguage();
    return (
        <AboutBlock
            illustration={<ExperienceIllustration />}
            order="left"
            title={lang.ru ? ["Про", "опыт", "💎"] : ["About", "experience", "💎"]}
            id={id}
            sx={sx}
        >
            {lang.ru ? (
                <>
                    По своему профилю я разрабатывал <Emoji e="📟" />
                    профессиональные прикладные <LandingLink href="/projects?techs=desktop">решения</LandingLink> для
                    десктопа на промышленных предприятиях <Emoji e="🏭" /> и в компаниях оптовых продаж.{" "}
                    <Emoji e="🏨" />С независимой командой разработчиков писал коммерческие{" "}
                    <LandingLink href="/projects?techs=frontend%2Cbackend">сайты</LandingLink> общей и
                    специализированной направленности в различных областях от визиток и до порталов недвижимости.
                    <Emoji e="📦" />
                    <br />
                    <br />
                    Не меньше участвовал в разработке backend-части, в основном на{" "}
                    <LandingLink href="/projects?techs=php%2Cmysql">PHP и MySQL</LandingLink>. В рамках командной работы
                    занимался как разработкой новых проектов, так и поддержкой уже существующих <Emoji e="🧑‍🔧" />,
                    общался с заказчиками, выявляя потребности и предлагая эффективные решения.
                    <Emoji e="🔑" />
                </>
            ) : (
                <>
                    Based on my profile, I have developed professional desktop{" "}
                    <LandingLink href="/projects?techs=desktop">applications</LandingLink> for industrial enterprises{" "}
                    <Emoji e="🏭" /> and wholesale companies <Emoji e="🏨" />. Working with an independent team of
                    developers, I have also created commercial{" "}
                    <LandingLink href="/projects?techs=frontend%2Cbackend">websites</LandingLink> for various purposes,
                    ranging from general to specialized fields such as real estate portals <Emoji e="📦" />.
                    Additionally, I have been actively involved in backend development, primarily using{" "}
                    <LandingLink href="/projects?techs=php%2Cmysql">PHP и MySQL</LandingLink>. <br />
                    <br />
                    Within the team framework, I have been engaged in both the development of new projects and the
                    support of existing ones <Emoji e="🧑‍🔧" />. I have interacted with clients, identifying their needs
                    and proposing effective solutions <Emoji e="🔑" />.
                </>
            )}
        </AboutBlock>
    );
}
