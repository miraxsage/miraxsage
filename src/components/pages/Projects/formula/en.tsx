import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="formula" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                The clinic's website offers a refreshed modern interface, attracting attention with soft colors and
                shapes, and it has an adapted mobile version as well as a version for the visually impaired. Of course,
                the main direction of the website's activity is informational support for clients, providing detailed
                and comprehensive information about the services offered, staff, and current prices.
            </p>
            <p>
                <Image side="right" img={4} />
                The usual informational content for most pages of the website is interesting and attractive; however,
                from the perspective of development features, it does not pose any particular difficulty. The clinic's
                website, developed on the CMS Wordpress, is a common solution in the field of applied service projects.
                Of particular interest is the pricing section, which offers special functionality for informing about
                pricing.
            </p>
            <p>
                <Image img={8} />
                Often, on the websites of ordinary clinics or other mass service organizations, it's difficult to find
                information about current prices - it's challenging to constantly update and maintain several thousand
                items in an up-to-date state. Together with the administration of the "Health Formula" clinic, we went
                further and decided to develop our own module (plugin) for Wordpress, which allows easy and simple
                import of this information from accounting programs, as well as Excel files.
            </p>
            <p>
                <Image side="right" img={11} />
                The solution starts with the administrator panel. Here, an organization's employee can manually create
                the overall structure of the price list and also use the import mode to upload information from an
                external file. They can specify the search range and, after previewing, upload the information to the
                website. Furthermore, the price list can have a nested hierarchical structure, allowing for the
                organization of categories, sections, and subsections for more convenient presentation and navigation
                for users.
            </p>
            <p>
                <Image img={9} />
                On the client side, based on the generated structure with numerous entries, a detailed structure is
                formed, allowing users to efficiently and quickly search despite the large volume of entries. The
                storage and dynamic access to price list data, as well as their updates, have been carefully considered,
                resulting in no noticeable delays either on mobile devices or computers.
            </p>
            <div style={{ clear: "both" }}></div>
        </ProjectContent>
    );
}
