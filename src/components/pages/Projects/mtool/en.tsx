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
                MTool allows tracking the performance of students, pupils, staff, etc., by consolidating this
                information into separate journal files, securely protected by the user's password, which they enter
                during authorization.
            </p>
            <p>
                <Image side="right" img={2} />
                One of the distinctive features of MTool is its interactive and colorful interface built on modern
                graphic technologies (DirectX and WPF), allowing users to personalize themes dynamically generated from
                several key base colors, from which the rest are calculated.
            </p>
            <p>
                <Image img={4} />
                After creating a journal, the user can manage the list of subjects, students, grades, and other related
                information for tracking performance. Subsequently, based on this information, there is the possibility
                to generate various diagrams reflecting statistical information about all or individual students and
                subjects, with interactive navigation between these data points.
            </p>
        </ProjectContent>
    );
}
