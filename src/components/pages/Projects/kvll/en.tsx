import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="kvll" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                KvartAll is a major portal offering services for posting and searching real estate advertisements
                primarily in the Krasnodar Krai and Krasnodar region.
            </p>
            <p>
                <Image img={1} />
                Despite being developed by just three developers with different specialties over a planning horizon of
                about 12 months, the result was a large and serious successful commercial solution. Currently, it
                continues to actively exist, attracting and serving users.
            </p>
            <p>
                The Yii2 framework was chosen as the development platform, utilizing its authentication system, basic
                protection services like CSRF, etc. Additionally, a range of auxiliary libraries and services were used
                for generating Excel documents, displaying PDF documents, presenting interactive tabulated data in the
                administrative section, Yandex Maps API for displaying localization data, KLADR API for managing
                addresses, and some others. In turn, all the business logic, user interface, and administrative section
                were developed entirely in-house, which, considering the overall functionality volume, makes this
                project one of the largest.
            </p>
            <p>
                <Image img={2} />
                Visiting KvartAll, you'll discover a visually appealing design that allows for intuitive navigation
                between different sections of the website. You can perform searches for advertisements, read articles,
                register and log in, visit your personal account, create your own advertisement, make payments, track
                its status, and much more.
            </p>
            <p>
                <Image side="right" img={16} />
                Clearly, such a large-scale project includes a system of roles and user rights: administrators,
                managers, developers, real estate agents, and regular users. Administering the site, the administration
                has a whole set of objects and entities – real estate agencies and their associated real estate agents,
                developers and their representatives, each with their own page reflecting their description,
                advertisements, and comments. Real estate agents and developers can manage their agency, construction
                project, residential complex, or new development from their personal account.
            </p>
            <p>
                <Image side="right" img={7} />
                Alongside this, one of the central components of the site is the search module, which is a component
                with a rich set of filtering and sorting criteria among the various objects listed on the portal –
                advertisements, new developments, agencies, developers, etc. The search results can be displayed either
                as a list or as individual points on a map.
            </p>
            <p>
                <Image img={9} />
                The portal also includes two informational sections – one for articles and another for news. Here, the
                administration can create new posts, assign tags and categories to them, manage comments, and add links
                to social media. These sections add another element to attracting new users – a specialized news and
                information resource.
            </p>
            <p>
                <Image side="right" img={18} />
                The portal monetizes its services by offering a wide range of options available when placing
                advertisements. Users can opt for features such as highlighting their ads in color, keeping them at the
                top of search lists, and more. The payment system is fully automated through the use of the online
                payment service Robokassa.
            </p>
            <p>
                <Image img={17} /> All the described functions and capabilities can be managed both from the user's
                personal account, which has functionality based on the user's role, and from the administrator panel.
                The administrator panel allows for complete control over advertisement and comment moderation, payment
                transactions, request processing, feedback management, article and advertisement management, user and
                object management, agency and developer management, advertising banners, essentially providing full
                control.
            </p>
        </ProjectContent>
    );
}
