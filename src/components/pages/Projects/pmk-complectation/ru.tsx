import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="pmk-complectation" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <p>
                <Image img={1} />
                ПМК Комплектация – приложение необходимое для учета документооборота на кафедре. Оно позволяет вести
                учет специальностей, дисциплин и преподавателей, а также совокупной документации – это журналы учета,
                конспекты лекция, методические указания, учебная литература, учебные программы и т.д. Кроме того ПМК
                Комплектация формирует отчеты о результатах проверки ПМК по определенной дисциплине, направлению или
                преподавателю в формате Microsoft Office Word.
            </p>
            <p>
                <Image side="right" img={2} />
                Решение призвано решить задачу реализации учебного курсового проекта, а также по факту явилось
                полнофункциональным приложением, разработанном на платформе .NET Framework, с использованием библиотеки
                WPF для реализации пользовательского интерфейса, а также MS SQL Server в качестве СУБД управления базой
                данных приложения. ПМК Комплектация после момента разработки активно использовалось на кафедре
                преподавательским составом еще не менее двух лет.
            </p>
        </ProjectContent>
    );
}
