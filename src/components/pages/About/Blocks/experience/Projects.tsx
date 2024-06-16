import DescriptionPanel from "@/components/DescriptionPanel";
import Link from "@/components/Link";
import { useLanguage } from "@/store/appearanceSlice";
import { Box } from "@mui/material";

const data = {
    ru: [
        "За время профессиональной деятельности на протяжении уже более 10 лет в области разработки программного обеспечения самостоятельно реализовано более 50 проектов с использованием различных технологий от прикладных конфигураций на платформе 1C, .NET Framework, Excel VBA до коммерческих веб-проектов на PHP и JS с использованием CMS, библиотек и фреймворков Wordpress, Laravel, JQuery, React и пр. Также стараюсь активно заниматься изучением новых технологий разработки и администрирования, Node.JS, Docker, Linux.",
    ],
    en: [
        "During my professional career spanning over 10 years in software development, I have independently completed over 50 projects using various technologies. These range from application configurations on the 1C platform and .NET Framework to commercial web projects on PHP and JS utilizing CMS, libraries, and frameworks such as WordPress, Laravel, jQuery, React, and others. Additionally, I actively strive to learn new development and administration technologies such as Node.js, Docker, and Linux.",
    ],
};

export default function AboutExperienceProjectsBlock() {
    const lang = useLanguage();
    return (
        <DescriptionPanel withoutBorders={true}>
            {{
                elements: [
                    ...data[lang.lang].map((d) => <Box sx={{ textIndent: "0px", padding: "6px 14px" }}>{d}</Box>),
                    <Box sx={{ textIndent: "0px", padding: "6px 14px" }}>
                        {lang.ru ? (
                            <>
                                Подробнее в <Link href="/projects">портфолио</Link>
                            </>
                        ) : (
                            <>
                                More in <Link href="/projects">portfolio</Link>
                            </>
                        )}
                    </Box>,
                ],
            }}
        </DescriptionPanel>
    );
}
