import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="mtool" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                MTool позволяет вести учет успеваемости учеников, студентов, персонала и т. д. объединяя данную
                информацию в отдельных файлах журналов, надежно защищаемых паролем пользователя, который он вводит при
                авторизации.
            </p>
            <p>
                <Image side="right" img={2} />
                Одним из особенных достоинств MTool является его интерактивный и красочный интерфейс, построенный на
                базе современных графических технологий (DirextX и WPF) и позволяющий пользователям персонализировать
                темы оформления, динамически формируемые по нескольким ключевым базовым цветам, из которых высчитываются
                остальные.
            </p>
            <p>
                <Image img={4} />
                После создания журнала пользователь может управлять списком предметов, учащихся, отметок и прочего,
                относительно которых ведется учет успеваемости. Далее на основе этой информации существует возможность
                строить различные диаграммы, отражающие статистические сведения по всем или отдельным учащимся и
                предметам с возможностью интерактивной навигации между этими данными.
            </p>
        </ProjectContent>
    );
}