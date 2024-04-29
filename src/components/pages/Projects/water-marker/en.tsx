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
                The «WaterMarker» application is developed on the .NET Framework 4.5 framework using the Windows
                Presentation Foundation (WPF) graphical (presentation) subsystem primarily to implement more specialized
                variants of batch processing for PDF documents and images: overlaying watermarks, controlled
                compression, conversion, etc., which are not found together in other software products. Additionally,
                the developed application has the potential for further development and expansion for other specialized
                tasks.
            </p>
        </ProjectContent>
    );
}
