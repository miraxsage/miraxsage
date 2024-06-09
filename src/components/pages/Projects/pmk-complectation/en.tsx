import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="pmk-complectation" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                PMK Complectation is an application essential for managing document workflow within a department. It
                enables tracking of specialties, disciplines, and instructors, as well as aggregate documentation such
                as record journals, lecture notes, methodological guidelines, educational literature, educational
                programs, etc. Additionally, PMK Komplektatsiya generates reports on the results of PMK checks for
                specific disciplines, directions, or instructors in Microsoft Office Word format.
            </p>
            <p>
                <Image side="right" img={2} />
                The solution aims to address the implementation task of an educational coursework project and has indeed
                become a fully functional application developed on the .NET Framework platform, utilizing the WPF
                library for the user interface and MS SQL Server as the database management system for the application.
                PMK Komplektatsiya has been actively used by the teaching staff at the department for at least two years
                since its development.
            </p>
        </ProjectContent>
    );
}
