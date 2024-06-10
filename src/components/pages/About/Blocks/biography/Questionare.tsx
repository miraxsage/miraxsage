import AccentedTreeView from "@/components/AccentedTreeView";
import DescriptionText from "@/components/DescriptionText";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import BadgeIcon from "@mui/icons-material/Badge";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SailingIcon from "@mui/icons-material/Sailing";
import { useMediaQuery, useTheme } from "@mui/material";
import { useLanguage } from "@/store/appearanceSlice";

export default function AboutBioQuestionaireBlock() {
    const theme = useTheme();
    const lang = useLanguage();
    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            <AccentedTreeView
                intend={lessSm ? "small" : "regular"}
                initiallyExpandedNodes={["about"]}
                selectionMode="disable"
                sx={{
                    "ul.text-list li": {
                        listStyle: "outside",
                        margin: "0px 0px 10px 17px",
                    },
                }}
            >
                {[
                    {
                        id: "about",
                        title: lang.ru ? "Расскажите о себе" : "Tell about youself",
                        icon: <PersonIcon />,
                        children: [
                            {
                                id: "about-datails",
                                content: (
                                    <DescriptionText>
                                        {lang.ru
                                            ? `
                                                С самого детства рос особенно любопытным ребенком, активно посещал творческие
                                                кружки и спортивные секции, самым любимым занятиям кроме исследований для меня
                                                всегда было создание собственных произведений. Увлекался рисованием, плотницким
                                                делом, сочинял электронную музыку, паял электронные устройства на базе Arduino,
                                                в 9 классе познакомился с программированием, в чем нашел для себя безграничную
                                                возможность реализации собственного творческого потенциала, в связи с чем решил
                                                связать с данным направлением свою будущую сферу деятельности поступив в
                                                Кубанский государственный технологический университет по направлению
                                                «Информатика и вычислительная техника», окончив его впоследствии с отличием. В
                                                настоящее время активно занимаюсь прикладной и веб-разработкой в
                                                профессиональной сфере и личных интересах.`
                                            : `
                                                From a very young age, I was an especially curious child. I actively participated 
                                                in creative circles and sports sections. Besides exploration, my favorite activities
                                                have always been creating my own works. I was passionate about drawing, carpentry,
                                                composing electronic music, and soldering electronic devices based on Arduino. 
                                                In 9th grade, I was introduced to programming, where I found endless possibilities
                                                to realize my creative potential. As a result, I decided to pursue a career in
                                                this field and enrolled in the Kuban State Technological University in the field 
                                                of 'Computer Science and Engineering,' graduating with honors. Currently, I am 
                                                actively engaged in applied and web development both professionally and in my 
                                                personal interests.`}
                                    </DescriptionText>
                                ),
                            },
                        ],
                    },
                    {
                        id: "strengths",
                        title: lang.ru ? "Назовите ваши сильные стороны" : "What are your strengths",
                        icon: <ThumbUpAltIcon />,
                        children: [
                            {
                                id: "strengths-datails",
                                content: (
                                    <DescriptionText>
                                        {lang.ru
                                            ? `
                                                Из положительных личных качеств основными считаю ответственность,
                                                добросовестность и терпение, что иногда может служить фактором некоторых
                                                задержек в работе, однако для меня важно проверить решение не один раз, чтобы
                                                быть уверенным в результате. Стремление к постоянному увеличению качества работы
                                                до идеального, что можно считать в некоторой степени перфекционизмом, который
                                                некоторые считают отрицательным, для меня же при наличии ресурсов и обоснования
                                                — это ключевой фактор конкурентоспособности. Особенным мотиватором для меня
                                                является видимость практического результата и работа над реальными проектами,
                                                которыми будут пользоваться многие люди.`
                                            : `
                                                From positive personal qualities, I consider responsibility, conscientiousness,
                                                and patience to be the main ones, which sometimes may cause delays in work, as
                                                I find it important to double-check solutions to ensure the result. I strive
                                                for constant improvement in the quality of work towards perfection, which
                                                some may consider perfectionism, but for me, given the resources and 
                                                justification, it is a key factor of competitiveness. A special motivator
                                                for me is the visibility of practical results and working on real projects
                                                that will benefit many people.`}
                                    </DescriptionText>
                                ),
                            },
                        ],
                    },
                    {
                        id: "weakSides",
                        title: lang.ru ? "Назовите ваши слабые стороны" : "What are your weaknesses",
                        icon: <ThumbDownAltIcon />,
                        children: [
                            {
                                id: "weakSides-datails",
                                content: (
                                    <DescriptionText>
                                        {lang.ru
                                            ? `
                                                Из положительных личных качеств основными считаю ответственность,
                                                добросовестность и терпение, что иногда может служить фактором некоторых
                                                задержек в работе, однако для меня важно проверить решение не один раз, чтобы
                                                быть уверенным в результате. Стремление к постоянному увеличению качества работы
                                                до идеального, что можно считать в некоторой степени перфекционизмом, который
                                                некоторые считают отрицательным, для меня же при наличии ресурсов и обоснования
                                                — это ключевой фактор конкурентоспособности. Особенным мотиватором для меня
                                                является видимость практического результата и работа над реальными проектами,
                                                которыми будут пользоваться многие люди.`
                                            : `
                                                Among my positive personal qualities, I consider responsibility, conscientiousness,
                                                and patience to be primary. While these traits can sometimes lead to delays in work,
                                                it is important for me to verify solutions multiple times to ensure the accuracy of
                                                the results. I strive for continuous improvement in the quality of my work to an
                                                ideal level, which can be seen as a form of perfectionism. Although some might 
                                                view this as a negative trait, I consider it a key factor in competitiveness, 
                                                provided there are sufficient resources and justification. A significant motivator
                                                for me is the visibility of practical results and working on real projects 
                                                that many people will use.`}
                                    </DescriptionText>
                                ),
                            },
                        ],
                    },
                    {
                        id: "specialityChoice",
                        title: lang.ru ? "Почему выбрали эту специальность" : "Why have you chosen this speciality",
                        icon: <BadgeIcon />,
                        children: [
                            {
                                id: "specialityChoice-datails",
                                content: (
                                    <DescriptionText>
                                        {lang.ru
                                            ? `
                                                Программирование и разработка для меня видятся как одно из самых творческих и
                                                универсальных направлений. С детства у меня всегда были интересы в создании
                                                собственных произведений: музыки, рисунков, столярных изделий, электроники. С
                                                момента знакомства с основами веб-программирования в 9 классе я сохраняю большой
                                                интерес к обучению, развитию и созданию множества собственных решений в данной
                                                области. Не смотря на продолжительный опыт для личного профессионального роста
                                                считаю особенно важным находиться в обществе профессионалов, к чему и стремлюсь.`
                                            : `
                                                For me, programming and development are among the most creative and 
                                                versatile fields. Since childhood, I have always been interested in
                                                creating my own works: music, drawings, woodworking, electronics. 
                                                Since being introduced to the basics of web programming in the 9th 
                                                grade, I have maintained a strong interest in learning, developing, 
                                                and creating numerous solutions in this field. Despite my extensive 
                                                experience, I believe it is especially important for my professional 
                                                growth to be in the company of professionals, which I strive for.`}
                                    </DescriptionText>
                                ),
                            },
                        ],
                    },
                    {
                        id: "achievements",
                        title: lang.ru
                            ? "Достижения на предыдущих местах работы"
                            : "Achievements at Previous Workplaces",
                        icon: <EmojiEventsIcon />,
                        children: [
                            {
                                id: "achievements-datails",
                                content: (
                                    <DescriptionText>
                                        {lang.ru ? (
                                            <ul className="text-list">
                                                <li>
                                                    Самостоятельно разработал сайт учета остатков автомобильных деталей
                                                    на базе CMS Wordpress, React, Bootstrap, позволяющий интегрировать
                                                    работу транспортного участка и бухгалтерии, синхронизируя данные на
                                                    сайте, формируемые через мобильную версию сайта, с конфигурацией 1С
                                                    Бухгалтерия, что существенно сократило объем двойной ручной работы,
                                                    автоматизировало процесс документооборота и позволило существенно
                                                    разгрузить штатную занятость.
                                                </li>
                                                <li>
                                                    Разработал ряд специализированных программ для автоматизированного
                                                    учета производства, бухгалтерского учета, учета и оформления данных
                                                    приборов промышленного электрооборудования и пр. Внес весомый вклад
                                                    в повышение производительности бухгалтерских и инженерно-технических
                                                    расчетов благодаря разработке комплекса вспомогательных приложений и
                                                    интеграционных программ на базе 1С:Предприятие, .NET Framework (C#),
                                                    WEB, Excel VBA, за что неоднократно получал высокие оценки
                                                    руководства.
                                                </li>
                                                <li>
                                                    Совместными усилиями разработал и внедрил собственную тему на
                                                    Wordpress, реализующую специализированные инструменты
                                                    администрирования и автоматизации, связанные с оформлением и
                                                    публикацией материалов делопроизводства, новостных сводок и пр.
                                                </li>
                                            </ul>
                                        ) : (
                                            <ul className="text-list">
                                                <li>
                                                    I independently developed a website for tracking automotive parts
                                                    inventory using CMS WordPress, React, and Bootstrap. This website
                                                    enables the integration of the transportation department and
                                                    accounting, synchronizing data generated through the mobile version
                                                    of the site with the 1C Accounting configuration. This significantly
                                                    reduced the volume of duplicate manual work, automated the document
                                                    workflow process, and considerably alleviated the workload of staff.
                                                </li>
                                                <li>
                                                    I developed a range of specialized programs for automated production
                                                    accounting, financial accounting, and the recording and
                                                    documentation of industrial electrical equipment data, among others.
                                                    I made a significant contribution to improving the productivity of
                                                    accounting and engineering calculations by developing a suite of
                                                    auxiliary applications and integration programs based on 1C, .NET
                                                    Framework (C#), WEB, and Excel VBA, for which I repeatedly received
                                                    high praise from management.
                                                </li>
                                                <li>
                                                    Together with my team, I developed and implemented a custom
                                                    WordPress theme that incorporates specialized administration and
                                                    automation tools related to the preparation and publication of
                                                    office materials, news bulletins, and more.
                                                </li>
                                            </ul>
                                        )}
                                    </DescriptionText>
                                ),
                            },
                        ],
                    },
                    {
                        id: "hobby",
                        title: lang.ru ? "Хобби и увлечения" : "Hobbies and Interests",
                        icon: <SailingIcon />,
                        children: [
                            {
                                id: "hobby-datails",
                                content: (
                                    <DescriptionText withoutBottomBorder={true}>
                                        {lang.ru
                                            ? `
                                                Кроме профессиональных интересов также увлекаюсь вело спортом, изучаю
                                                английский, люблю путешествовать и очень хотел бы посетить много городов и
                                                известных мировых достопримечательностей.`
                                            : `
                                                In addition to my professional interests, I am also passionate about 
                                                cycling, studying English, and traveling. I would love to visit 
                                                many cities and famous world landmarks.`}
                                    </DescriptionText>
                                ),
                            },
                        ],
                    },
                ]}
            </AccentedTreeView>
        </>
    );
}
