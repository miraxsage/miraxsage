import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="multi-cropper" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                ImageMultiCropper is an application solution for manually automating the process of extracting a set of
                scanned images from a tablet scanner. Essentially, it provides convenient tools for cropping
                photographs.
            </p>
            <p>
                <Image img={1} />
                Often, during the batch digitization of photographs, document scans, books, etc., it's necessary to
                extract them from the scanned sheet with maximum precision and speed. Using other programs like Adobe
                Photoshop may not be an efficient solution, especially when dealing with numerous images and needing to
                crop multiple fragments of different sizes at various angles. ImageMultiCropper provides such
                functionality.
            </p>
            <p>
                <Image side="right" img={2} />
                As you can notice, the ImageMultiCropper solution, like most of my other solutions, stands out with its
                unique personalized interface. Thanks to the WPF library, which handles full graphics processing of
                windows and controls at the hardware level, it's possible to completely customize the drawing process.
                Additionally, a custom file browser with standard file system navigation was implemented here, but with
                a new design.
            </p>
        </ProjectContent>
    );
}
