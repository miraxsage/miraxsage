import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="cook-book" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                The solution mentioned demonstrates the ability to extend the basic functionality of an Excel document
                by embedding internal program logic using macros. Essentially, it's an Excel document containing basic
                elements of a user interface (buttons, dropdown lists, input fields, etc.), between which and the
                content of the document page, the necessary interaction scenario is configured.
            </p>
            <p>
                <Image side="right" img={2} />
                In a specific example, cafeteria food consumption is tracked: the operator fills in the basic table with
                dishes and quantities, while the script, based on consumption norms tables, automatically calculates the
                amount of ingredients used, generates documents for write-off, food distribution, menu planning, and
                prints them. Thus, a simple programming task can be solved using a regular spreadsheet processor like
                Excel, without the need to deploy an integrated development system or create complex software solutions
                requiring significant effort and resources.
            </p>
            <p></p>
        </ProjectContent>
    );
}
