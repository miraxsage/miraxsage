import DescriptionPanel from "@/components/DescriptionPanel";
import { Box } from "@mui/material";

const data = [
    "За время профессиональной деятельности на протяжении уже более 10 лет в области разработки программного обеспечения самостоятельно реализовано более 50 проектов с использованием различных технологий от прикладных конфигураций на платформе 1C, .NET Framework, Excel VBA до коммерческих веб-проектов на PHP и JS с использованием CMS, библиотек и фреймворков Wordpress, Laravel, JQuery, React и пр. Также стараюсь активно заниматься изучением новых технологий разработки и администрирования, Node.JS, Docker, Linux.",
    "[Некоторая статистика по проектам]",
    "С примерами самых первых, лучших и/или интересных по моему мнению работ по всему стеку используемых технологий можно ознакомиться в разделе портфолио, выбрав интересующие детали: <ссылка>",
];

export default function AboutExperienceProjectsBlock() {
    return (
        <DescriptionPanel withoutBorders={true}>
            {{
                elements: data.map((d) => <Box sx={{ textIndent: "0px", padding: "6px 14px" }}>{d}</Box>),
            }}
        </DescriptionPanel>
    );
}
