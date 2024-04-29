import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="mutual-imaging" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                MutualImaging is designed as a multitasking batch processor with a wide range of settings. The program
                also features a profile-based system for settings and configurations. Each configuration contains a list
                of processing tasks defined by the user, as well as program appearance settings; additionally, there is
                an option to password-protect the configuration. Configurations are saved in separate files that can be
                imported into the program on another computer. Moreover, the program does not require installation and
                can fully operate from a removable drive.
            </p>
            <p>
                <Image side="right" img={2} />
                Each created configuration contains 3 lists of settings created by the user. Contexts determine what
                will be processed and how it will be saved:
                <br />
                — Setting processing from a specific working folder;
                <br />
                — Specifying certain images for processing;
                <br />
                — Filtering files by format;
                <br />
                — Filtering files by a "text snippet" or "pattern" from which the file name begins, ends, or is
                contained within;
                <br />
                — Filtering files by name length;
                <br />
                — Changing file formats upon saving;
                <br />
                — Where and how to save the file.
                <br />
            </p>
            <p>
                <Image img={3} />
                Scenarios of processing determine what changes need to be made to a batch of images:
                <br />
                — Gray shades settings (each R G B channel separately); — Brightness settings;
                <br />
                — Contrast settings.
                <br />
            </p>
            <p>
                <Image side="right" img={4} />
                Scenarios also have a wide range of cropping and scaling settings:
                <br />
                — Cropping the image uniformly from all sides or from specific sides;
                <br />
                — Stretching the image across a wide range of settings;
                <br />
                — Reducing resolution without distortion;
                <br />
                — Adding a border;
                <br />— Adding a watermark (WaterMark); <br />
                All settings in the "composition" section are also applied to the watermark.
            </p>
        </ProjectContent>
    );
}
