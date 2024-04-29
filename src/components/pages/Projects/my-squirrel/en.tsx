import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="my-squirrel" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={4} />
                <Image side="right" img={6} />
                The Personal Database Management System (PDBMS) MySquirrel performs the following functions:
                <br />
                1) Storage of a wide range of basic data types: MS Office Word and Excel documents, text and numerical
                data, date and time, colors, file links, etc.
                <br />
                2) Providing an object-oriented approach to data storage and representation:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;2.1) Categorization of stored data;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;2.2) Creation of multi-level user-defined data types;
                <br />
                3) Support for convenient data representation through detailed filtering, sorting, and grouping;
                <br />
                4) Organization of data storage using cloud resources such as Dropbox, SkyDrive, etc.;
                <br />
                5) Ability to convert data to .doc and .xls formats;
                <br />
                6) Ability to personalize the user interface;
                <br />
                7) Support for multi-user mode.
            </p>
            <p>
                <Image img={3} />
                The PDBMS MySquirrel, unlike large commercial DBMS, offers not a low-level software interface for data
                access, but interactive visual tools for managing user personal information presented in an
                object-oriented form. This system offers users the ability to, based on a wider range of primitive data
                types, create their own using the inheritance and polymorphism properties of the object-oriented
                programming paradigm to store special data within a narrow circle of users, for example, data of an
                individual, family, or small group like a study group.
            </p>
            <p>
                With such an approach, it's possible to create fairly complex and large hierarchical data systems. Their
                advantage lies in their visual object-oriented form, as well as the rigid specification and structuring
                of all data and their types. This, in turn, allows for a wide range of operations on this information,
                such as searching, filtering, formatting, and printing, or more detailed processing.
            </p>
            <p>
                <Image side="right" img={2} />
                Creating the necessary dataset in this manner and distributing them into specific categories to ensure
                their logical integrity, the user can navigate through the entire database or its individual categories
                using the category editing panel. Here, elements of navigation, denoted by numbers 1, 2, 3, allow
                transitioning between data elements and subcategories. Below numbers 4 and 5 are the control buttons and
                a summary table, uniformly describing the data of each element and subcategory. Under numbers 6 and 7
                are additional tabs for managing data display, enabling a more convenient representation through
                filtering, sorting, and grouping of entries in the summary table. Subsequently, it can be transformed
                into MS Office Excel format «.xls» for further processing, calculations, charting, etc.
            </p>
            <p>
                <Image img={5} />
                Another feature of the application is the provision of an interactive, user-friendly, and visually
                appealing interface, the design aspects of which the user can also control through the settings panel.
                Here, number 1 highlights the list of tabs, through which the user navigates to the corresponding
                settings category. By switching to the «Appearance» tab of the settings panel, the user can select any
                of the standard or previously saved color schemes from list 2, as well as add a new one, modify, or
                delete an existing one using the control keys located above.
            </p>
            <div style={{ clear: "both" }}></div>
        </ProjectContent>
    );
}
