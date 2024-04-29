import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="syntax-resolver" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={2} />
                As an educational demonstration project of programming language theory, SyntaxResolver allows
                translating programs from the high-level programming language Visual C Sharp to low-level assembly
                language for 32-bit architecture, with control over intermediate operations: lexical and syntactic
                analysis, and actual translation.
            </p>
            <p>
                <Image side="right" img={4} />
                All intermediate stages of translation are accompanied by sufficiently detailed descriptions. For
                example, during syntactic analysis, lexical syntax highlighting is applied, along with a detailed
                description of the locations and reasons for errors occurring during the writing of the program's source
                code.
            </p>
            <p>
                <Image img={3} />
                One of the program's features, although not directly related to translation and programming languages,
                is its custom interface developed from scratch using the WPF library. It fully implements its own code
                editor control, directly handling selection, syntax highlighting, calculation, and rendering of
                individual editor components and their positioning on the canvas at a relatively low software level
                provided by WPF. This grants substantial control over the rendering process, which ultimately proved to
                be a non-trivial task. However, the result demonstrates a professional outcome, resembling the original
                Visual Studio IDE.
            </p>
            <p>
                <Image img={5} />
                As a result of executing these procedures, the resulting assembly language code is generated, which can
                then be examined and compiled into an executable file.
            </p>
            <div style={{ clear: "both" }}></div>
        </ProjectContent>
    );
}
