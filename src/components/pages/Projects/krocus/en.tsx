import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="krocus" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                The website for the "Krokus" network of gas stations primarily serves as an informational platform.
                However, at the request of the client, an online fuel card system was integrated into it after its
                launch. This system allows for the import of information about cardholders, fuel consumption, and other
                relevant characteristics from the accounting software 1C. Users can then access this information through
                their personal accounts on the website.
            </p>
            <p>
                <Image side="right" img={3} />
                The updating of information regarding fuel cards is performed by employees in coordination with the
                client. This process involves extracting a specialized report from 1C and uploading it to the website.
                The current balances are then compared with the existing ones on the site. Any discrepancies found
                result in the addition of new cards, users, and transactions for fuel consumption and refills.
            </p>
            <p>
                <Image img={4} />
                After logging in, a customer with an active fuel card can access the dedicated section of the website.
                Here, they can view information about each of their fuel cards, including the current balance of fuel
                units provided by the company.
            </p>
            <p>
                The development was carried out using the CMS WordPress along with the jQuery and jQuery UI libraries.
                Additionally, custom styling was applied to adhere to the company's branding guidelines and achieve the
                desired look and feel.
            </p>
        </ProjectContent>
    );
}
