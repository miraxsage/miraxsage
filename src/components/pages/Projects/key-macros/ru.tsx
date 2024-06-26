import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="key-macros" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                KeyMacros представляет собой вспомогательную утилиту, позволяющую добавлять любое количество
                клавиатурных макросов. Клавиатурный макрос представляет собой записанную или сконфигурированную
                последовательность нажатий клавиш, либо блокировку ввода, либо запуск определенной программы или команды
                интерпретатора команд и т.д., что в общем определяется понятием действие, которое впоследствии
                необходимо воспроизводить при определенных условиях, например по более коротким клавиатурным
                комбинациям. При этом KeyMacros позволяет одновременно запускать отслеживание нескольких макросов, их
                выполнение и остановку.
            </p>
            <p>
                <Image side="right" img={2} />
                Данный функционал может быть полезен в ряде случаев. При использовании горячих клавиш для замены одних
                на более удобные, либо для регистрации горячих клавиш для ввода фрагментов текста или запуска программ и
                открытия файлов, что может быть удобно для реализации некоторой автоматизации запуска программ, в
                игровом режиме и т.д.
            </p>
        </ProjectContent>
    );
}
