import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="water-marker" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                Приложение «WaterMarker» разработано на фреймворке .NET Framework 4.5 c использованием графической
                (презентационной) подсистемы построения пользовательских интерфейсов WPF (Windows Presentation
                Foundation) в первую очередь с целью реализации более узкоспециальных вариантов пакетной (множественной)
                обработки PDF-документов и изображений: наложение водяных знаков, контроллируемое сжатие, конвертация и
                пр., которых в комплексе не обнаружено в других программных продуктах, к тому же разработанное
                приложение имеет перспективу развития и расширения для иных узкоспециальных задач.
            </p>
        </ProjectContent>
    );
}
