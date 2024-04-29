import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="multi-cropper" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                ImageMultiCropper - прикладное решение ручной автоматизации процесса извлечения набора сканированных на
                планшетном сканере изображений, по сути предоставляет удобные инструменты для обрезки фотографий.
            </p>
            <p>
                <Image img={1} />
                Часто бывает, когда при поточной оцифровке фотографий, сканов документов, книг и т.д. их нужно выделить
                со сканированного листа и сделать это максимально точным и быстрым инструментом. Использование иных
                программ вроде Adobe Photoshop не будет эффективным средством особенно если изображений много и из
                изображения нужно вырезать несколько фрагментов разных размеров под разными углами. ImageMultiCropper
                предоставляет такую возможность.
            </p>
            <p>
                <Image side="right" img={2} />
                Как Вы можете заметить, решение ImageMultiCropper как и большинство других моих решений выделяется среди
                большинства прочих особенным персональным интерфейсом. За счет библиотеки WPF, занимающейся полной
                обработкой графики окон и элементов управления на аппаратном уровне, удается полностью кастомизировать
                процесс отрисовки, также здесь был реализован собственный браузер файлов со стандартной навигацией по
                файловой системе, но новым дизайном.
            </p>
        </ProjectContent>
    );
}
