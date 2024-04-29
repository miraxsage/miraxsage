import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="miraxsage" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                The website you are currently on is my personal portfolio, resume, questionnaire, and business card.
                Developed on a modern stack, it is essentially a headonly (as opposed to headless) solution, meaning
                there is no server-side component. It only contains image files, a PDF resume, and all the logic is
                implemented entirely on the client side: JS, HTML, CSS, React, Redux, MUI ...
            </p>
            <p>
                This solution not only showcases the developer's abilities to conceptualize, design, organize the
                architecture, and integrate individual elements of the entire solution from scratch but also presents a
                comprehensive biography, education, work experience, competencies, code snippets, and the most
                interesting projects in personal practice.
            </p>
            <p>
                Take a look at the various sections of the website, check out the general information about me, download
                a brief version of the resume in PDF format if needed, and feel free to contact me through the
                respective links in the contact section.
                <br />
                I'm always open to new ideas and mutually beneficial collaborations!
            </p>
        </ProjectContent>
    );
}
