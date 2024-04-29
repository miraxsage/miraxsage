import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="thuricum" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                The homepage showcases an attractive landing page, highlighting key features and achievements of the
                organization, its history, and contact information for feedback.
            </p>
            <p>
                <Image side="right" img={5} />
                The website caters to a broad audience, considering the organization's popularity and the number of
                existing clients. Its mobile version provides the same convenience in accessing information and services
                from any section of the site. Additionally, the version in a foreign language caters to English-speaking
                residents. Furthermore, the site includes a basic implementation of a version for visually impaired
                individuals, demonstrating the company's openness and friendliness to all its clients.
            </p>
            <p>
                <Image img={7} />
                However, the informational component is not the only service provided to clients. The website includes
                several sections with dynamic content, allowing users to perform some preliminary services. For example,
                the "Cost Calculators" section utilizes a set of Excel files on the server side, which are updated and
                populated by the organization's employees from accounting programs. These files are used to build the
                calculator page, presented as a form. Depending on the user's initial input, subsequent questions and
                dropdown options are displayed from the specified Excel files. Ultimately, based on the user-input data
                and current exchange rates from the Central Bank website, a final PHP script calculates the resulting
                recommended insurance premium.
            </p>
            <p>
                <Image img={9} />
                Another section, "Registry of Brokers and Agents," also offers users an interactive interface allowing
                them to search through a dynamically updated registry of records in .csv format. This registry is
                uploaded by the organization's employees.
            </p>
            <div style={{ clear: "both" }}></div>
        </ProjectContent>
    );
}
