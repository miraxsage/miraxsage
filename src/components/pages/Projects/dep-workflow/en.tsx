import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="dep-workflow" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                The departmental document management program is developed on the .NET platform (WPF) and is designed to
                manage various types of documents using the MS SQL Server database server. It allows for storage,
                tracking, and access control for various departmental documents, including departments such as academic
                departments, human resources, libraries, offices, etc.
            </p>
            <p>
                <Image side="right" img={1} />
                The key logic of hierarchical document access division is based on the fundamental concept of a
                department, which has an established manager, a list of employees, and a set of documents. The program
                provides access to documents within its own or other departments, employee information, departmental
                details, etc., securely stored in the database, depending on the access privileges configured by the
                administrator or a department-level employee.
            </p>
            <p>
                After completing the registration and authentication procedures, the user can also register within one
                of the existing departments stored in the database or create a new one if they have administrator
                privileges.
            </p>
            <p>
                <Image img={6} />
                Here's the text with redundant spaces removed: Each user can have the role of a database administrator,
                department manager, or department employee, which determines their level of privileges and capabilities
                within the program. The main capabilities include creating, deleting, and modifying software data
                objects, which consist of four basic types:
                <br />
                a) Database users;
                <br />
                b) Database items defining the subject area of documentation with which a particular employee works. For
                example, these could be academic disciplines for a department or business areas for a company, each
                requiring documentation packages;
                <br />
                c) Documents, each user having an individual list of documents, grouped within a single item. These
                documents can include Microsoft Office Word, Excel, PowerPoint files, or files of other types;
                <br />
                d) Database departments, characterized by a list of registered users and items.
            </p>
            <p>
                <Image side="right" img={7} />
                Additionally, DepWorkflow performs the following functions: – ensuring flexible control of user access
                to the listed types of objects, from the perspective of their belonging to:
                <br />
                a) department employee (which can be managed by both the employee, the manager, and the database
                administrator);
                <br />
                b) department manager (editing such data is available only to the manager and administrator);
                <br />
                <Image img={8} />
                c) database administrator (administrator privilege provides full access to all database objects).
                <br />
                – providing interactive interaction and data updating within the application in real-time mode;
                <br />
                – ensuring high interactivity of the application, allowing to present a large part of the used data in
                graphical form;
                <br />
                – representing the program in the form of a visual application;
                <br />– providing automatic restoration of the application database during the initial application
                initialization with an existing database file.
            </p>
        </ProjectContent>
    );
}
