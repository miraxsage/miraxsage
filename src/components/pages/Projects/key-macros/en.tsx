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
                KeyMacros is a utility tool that allows adding any number of keyboard macros. A keyboard macro is a
                recorded or configured sequence of key presses, input blocking, or the execution of a specific program
                or command in the command interpreter, etc., which generally defines the action that needs to be
                reproduced under certain conditions, for example, by shorter keyboard combinations. KeyMacros allows
                simultaneously tracking multiple macros, their execution, and stopping them.
            </p>
            <p>
                <Image side="right" img={2} />
                This functionality can be useful in several cases. When using hotkeys to replace less convenient ones,
                or to register hotkeys for entering text fragments or launching programs and opening files, which can be
                convenient for implementing some automation of program launches, in gaming mode, etc.
            </p>
        </ProjectContent>
    );
}
