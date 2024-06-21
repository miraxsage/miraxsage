import DescriptionPanel from "@/components/DescriptionPanel";
import { getThemeColor } from "@/components/contexts/Theme";
import { useLanguage } from "@/store/appearanceSlice";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";

const data = {
    ru: [
        "В первую очередь хотел бы подчеркнуть в личных профессиональных достижениях факт подавляющего единоличного участия в разработке большинства проектов, на начальных этапах развития в условиях отсутствия больших команд разработки с разделением обязанностей весь цикл работ от дизайна, архитектурного проектирования, разработки интерфейсов до программирования логики и тестирования я часто выполнял самостоятельно, в чем подтверждаю собственный большой интерес на каждом этапе создания приложения от концептуальных исследований, проектирования архитектуры и дизайна до непосредственно разработки, тестирования и внедрения.",
        "В период работы на одном из ведущих кабельных производств края удалось внести весомый вклад в повышение производительности бухгалтерских и инженерно-технических расчетов, за что неоднократно получал высокие оценки руководства. С нуля была разработана собственная конфигурация на платформе 1С:Предприятие для сдельного учета заработной платы работников кабельного производства с учетом индивидуальной специфики и особенностей предприятия, которая по настоящий момент является основным инструментом планово-экономического отдела.",
        "В период работы на предприятии оптовой торговли самостоятельно разработал сайт учета остатков автомобильных деталей, позволяющий интегрировать работу транспортного участка и бухгалтерии, синхронизируя данные на сайте, формируемые через мобильную версию сайта, с конфигурацией 1С Бухгалтерия, что существенно сократило объем двойной ручной работы, автоматизировало процесс документооборота и позволило существенно разгрузить штатную занятость.",
        "Одним из самых первых крупных проектов в коммерческой сфере совместными усилиями разработал портал объявлений о недвижимости в масштабах края, целиком занимался бизнес-логикой проекта, программированием backend и frontend частей, проектированием и оптимизацией базой данных, в настоящее время портал продолжает работу и привлечение посетителей.",
        "В период работы в администрации муниципалитета совместными усилиями разработал и внедрил собственную тему на Wordpress, реализующую специализированные инструменты администрирования и автоматизации, связанные с оформлением и публикацией материалов делопроизводства, новостных сводок и пр.",
    ],
    en: [
        "First and foremost, I would like to emphasize in my personal professional achievements the fact of my predominant individual involvement in the development of most projects. In the early stages of development, in the absence of large development teams with divided responsibilities, I often performed the entire work cycle myself—from design, architectural planning, and interface development to programming logic and testing. This underscores my strong interest in every stage of application creation, from conceptual research and architectural design to actual development, testing, and implementation.",
        "While working at one of the leading cable manufacturing companies in the region, I made a significant contribution to improving the efficiency of accounting and engineering-technical calculations, for which I received high praise from management multiple times. From scratch, I developed a custom configuration on the 1C platform for piece-rate payroll accounting for cable production workers, considering the unique specifics and features of the company. This configuration remains the primary tool for the planning and economic department to this day.",
        "While working at the wholesale trading enterprise, I independently developed a website for tracking automotive parts inventory. This website allows for the integration of the transportation department and the accounting department by synchronizing data generated through the mobile version of the website with the 1C Accounting configuration. This significantly reduced the amount of duplicate manual work, automated the document workflow process, and substantially relieved staff workload.",
        "One of the earliest major projects in the commercial sector was the collaborative development of a real estate classifieds portal covering the region. I was responsible for the entire business logic of the project, programming both the backend and frontend components, as well as designing and optimizing the database. The portal continues to operate and attract visitors to this day.",
        "While working at the municipal administration, I collaborated on the development and implementation of a custom WordPress theme that incorporates specialized administration and automation tools related to the formatting and publication of documentation, news summaries, etc.",
    ],
};

export default function AboutExperienceAdvantagesBlock() {
    const theme = useTheme();
    const lang = useLanguage();
    return (
        <DescriptionPanel withoutBorders={true}>
            {{
                elements: data[lang.lang].map((d, i) => (
                    <Box sx={{ textIndent: "0px", padding: "6px 14px" }}>
                        <Box
                            component="span"
                            sx={{
                                borderWidth: "0px 1px 1px 0px",
                                userSelect: "none",
                                borderStyle: "solid",
                                padding: "5px 10px",
                                marginLeft: "-5px",
                                position: "relative",
                                left: "-9px",
                                top: "-3px",
                                borderColor: theme.palette.divider,
                                background: getThemeColor("titleBg", theme),
                            }}
                        >
                            {i + 1}
                        </Box>
                        {d}
                    </Box>
                )),
            }}
        </DescriptionPanel>
    );
}
