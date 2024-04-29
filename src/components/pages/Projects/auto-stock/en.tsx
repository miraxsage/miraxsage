import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="auto-stock" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={2} />
                The parts inventory management system is a specialized solution that offers a web interface for
                integrating accounting (using the accounting software 1C: Accounting) with warehouse and repair workshop
                staff.
            </p>
            <p>
                <Image side="right" img={3} />
                Before implementing this solution, there was a noticeable delay in communication between the employees
                of the two departments. A certain procedure was established: due to the need to track current stock
                levels when items were used or received, double work was performed. Employees of the repair and
                mechanical unit manually compiled a list of used auto parts and materials on special company forms.
                Subsequently, based on this list, the accountant manually processed the material write-offs and provided
                an updated list of stock levels.
            </p>
            <p>
                <Image img={4} />
                The proposed solution minimizes labor costs for both sides by providing a common intermediate management
                interface between the two departments – the warehouse, interacting with the website's stock interface,
                and the accounting department, interacting with the 1C software. Thus, the solution consists of two
                modules: the website itself and an extension of the 1C configuration, through which the accounting
                department uploads and downloads information to and from the website.
            </p>
            <p>
                <Image side="right" img={5} />
                This option was chosen as the most optimal considering the nature of the work: employees of the repair
                and mechanical unit (RMU) and the warehouse constantly move around the premises of the enterprise,
                between warehouses and repair bays. For them, it is most convenient to see the stock levels for a
                particular part immediately "on the spot" and to process their write-offs without making drafts or notes
                prone to errors. They can easily access the internal website of the enterprise via their mobile devices,
                log in as mechanics, and view the necessary information or process write-offs. Then, within one working
                day, they can correct any errors in the data. This approach also avoids daily visits to the accounting
                department, manual preparation of write-off documents, etc. Similarly, accountants do not need to
                manually re-enter all write-off documents; they simply download the data on write-offs processed by
                warehouse and RMU staff into 1C within seconds.
            </p>
            <p>
                <Image img={6} />
                The website is built on the CMS WordPress, primarily utilizing its authentication system and templating
                features. This choice was made with a focus on possible future expansion. On the client side, the React
                library and Bootstrap are used. In the MySQL database, there are several tables for storing nomenclature
                data from 1C, lists of vehicles, as well as records of material write-offs and receipts.
            </p>
            <p>
                User role organization includes the ability to create accounts with restricted capabilities such as
                "mechanic," as well as "manager" and "administrator" accounts.
            </p>
            <p>
                In general, the workflow is structured such that the accountant first uploads the nomenclature, list of
                vehicles, and the stock balances of parts to the website. These are saved on the website with special
                identifiers that uniquely identify the corresponding objects in the 1C database. After this, warehouse
                workers can view the stock balances and process material write-offs. At the auto parts warehouse, all
                parts are stored in special packaging labeled with the nomenclature code. This allows warehouse staff to
                easily locate the required part by entering its 5-digit code. Then, the next day, the accountant uploads
                the processed write-offs from the warehouse into the 1C program with just a couple of clicks.
            </p>
            <p>
                Additionally, this comprehensive solution allows for the "alignment" or "correction" of processed
                movements and balances on the website from the 1C side by executing the corresponding command. This
                enables an automatic analysis of the balances on the 1C side and the warehouse side, followed by their
                automatic adjustment according to established criteria.
            </p>
            <p>
                In summary, it's worth highlighting the key achievement – the proposed solution ultimately significantly
                optimized the workload of over 10 employees of the enterprise, freeing up time and addressing the issue
                of staff shortages.
            </p>
        </ProjectContent>
    );
}
