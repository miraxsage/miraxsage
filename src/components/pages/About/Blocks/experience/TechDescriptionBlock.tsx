import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MusclesIcon from "@/components/icons/MusclesIcon";
import DescriptionPanel from "@/components/DescriptionPanel";
import TechnologiesCrumbs from "@/components/TechnologiesCrumbs";
import { useLanguage } from "@/store/appearanceSlice";
import __ from "@/utilities/transtation";

const data: { [k: string]: { description: { ru: string; en: string } } } = {
    frontend: {
        description: {
            ru: `С особенной любовью отношусь к разработке пользовательских интерфейсов, графическому, программному дизайну и фроненду как 
            объединению множества технологий, скрытых от пользователя, но в итоге рождающих перед его глазами конечный творческий и уникальный
            продукт. С фронтенд разработкой я дружу еще с 2011 года, когда написал свой первый плагин для Opera на jQuery. Сейчас участвую 
            в разработке и интересуюсь сложными проектами на современном стеке технологий. `,
            en: `With a special passion, I approach the development of user interfaces, graphic and software design, as well as frontend 
            development, viewing them as a fusion of various technologies hidden from the user, yet ultimately giving rise to a creative 
            and unique product before their eyes. I've been familiar with frontend development since 2011 when I wrote my first plugin for 
            Opera using jQuery. Currently, I actively engage in the development and am intrigued by complex projects using modern technology stacks.`,
        },
    },
    backend: {
        description: {
            ru: `С учетом личного интереса и силы исторических обстоятельств я активно занимался и занимаюсь самостоятельной разработкой
            полноценных веб решений в том числе и backend-части. Сегодня мой самый распространенный базовый стек здесь это PHP, MySQL, 
            CMS Wordpress, Laravel Framework. 
            В настоящее время интересуюсь Node.JS и связанными технологии относительно backend-разработки на JavaScript.`,
            en: `Taking into account my personal interest and the influence of historical circumstances, I have been actively involved in 
            and continue to engage in independent development of full-fledged web solutions, including the backend part. Currently, my most 
            common basic stack includes PHP, MySQL, CMS WordPress, and the Laravel Framework. I am currently exploring Node.js and related 
            technologies for backend development in JavaScript.`,
        },
    },
    desktop: {
        description: {
            ru: `Во временя учебы в университете, профессиональной деятельности написал большое количество программ различного уровня от простых
            вспомогательных утилит и учебных демонстрационных проектов до серьезных приложений. Активно занимался самостоятельным изучением. Высоко оценивая 
            для себя важность удобства и привлекательности пользовательского интерфейса, с большим интересом освоил Windows Presentation Foundation — систему 
            для построения пользовательского интерфейса (UI) с визуально привлекательными возможностями (графическая подсистема в составе .NET Framework,
            использующая язык XAML), активно использовал и интегрировал внешние библиотеки UI-кастомизации.
            Одними из самых интересных были дипломная работа по разработке собственной системы управления персональными данными пользователей.`,
            en: `During my university studies and professional career, I have written a large number of programs of varying complexity, ranging 
            from simple utility tools and educational demonstration projects to serious applications. I have been actively engaged in self-learning, 
            recognizing the importance of user interface convenience and attractiveness. With great interest, I mastered Windows Presentation Foundation 
            (WPF), a system for building user interfaces with visually appealing capabilities (a graphical subsystem within the .NET Framework that utilizes
            the XAML language). I actively used and integrated external UI customization libraries.
            One of the most interesting projects was my diploma work on developing a personal data management system.`,
        },
    },
};

type TechnologiesDescriptionBlock = {
    category: "frontend" | "backend" | "desktop";
    withoutBottomBorder?: boolean;
    withoutBorders?: boolean;
};

export default function TechDescriptionBlock({
    category,
    withoutBottomBorder,
    withoutBorders,
}: TechnologiesDescriptionBlock) {
    const lang = useLanguage();
    return (
        <DescriptionPanel withoutBottomBorder={withoutBottomBorder} withoutBorders={withoutBorders}>
            {{
                elements: [
                    <TechnologiesCrumbs techs={category} sx={{ padding: "3px 12px", marginBottom: "4px" }} />,
                    data[category].description[lang.lang],
                ],
                buttons: [
                    {
                        label: __("Projects"),
                        icon: <RocketLaunchIcon sx={{ fontSize: "20px", margin: "0px 5px 2px 0px" }} />,
                        link: `/projects?techs=${category}`,
                    },
                    {
                        label: __("Skills"),
                        icon: <MusclesIcon sx={{ fontSize: "20px", margin: "0px 3px 2px 0px" }} />,
                        link: `/about/skills/hard`,
                    },
                ],
            }}
        </DescriptionPanel>
    );
}
