import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="suzrp" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                SUZRP (or СУЗРП) is a specialized configuration developed from scratch on the 1C:Enterprise 7.7
                technological platform. It implements a narrowly specialized task of operational piecework accounting
                for completed work according to the specific features of cable production and wage calculation, forming
                a comprehensive list of reports based on collected data.
            </p>
            <p>
                <Image side="right" img={4} />
                The developed configuration includes comprehensive automated and parameterized loading of calculation
                data, production operation data, and a list of equipment with corresponding characteristics for all
                production operations from calculation sheets in Excel file format (*.xls, *.xlsx), developed and
                provided by the technological and design departments of the enterprise.
            </p>
            <p>
                <Image img={3} />
                The flexible approach to analyzing the structure of electronic Excel documents through COM connection to
                them allows extracting useful data for a wide range of document layouts (structures), configuring which
                makes it possible to automate the import of directories of production operations from an unlimited
                number of documents in batch mode.
            </p>
            <p>
                <Image side="right" img={5} />
                The developed accounting approach is predominantly universal, but it contains specific implementations
                of accounting and calculation mechanisms, as well as the management of production operations related to
                cable manufacturing at a specific enterprise. However, there is the possibility of reprofiling the
                developed configuration for other types of production of various classes.
            </p>
            <p>
                <Image img={2} />
                Based on the collected data of production operations and the filled information about the performed
                work, the developed solution also offers a comprehensive set of analytical reports and printed forms,
                allowing to create an overall picture of the enterprise's production activities, piecework payroll
                statements, and other auxiliary information.
            </p>
            <br />
            <br />
            <br />
        </ProjectContent>
    );
}
