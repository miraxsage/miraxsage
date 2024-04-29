import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="webarch-theme" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                The WebArch Theme is a theme designed for WordPress, offering its own approach to individual
                customization and organization of page content. It introduces a basic universal set of blocks typical
                for each page, such as comments, headers, tables of contents, social media integration, etc.
                Additionally, it provides the ability to introduce custom blocks, the visibility and position of which
                can be customized for individual pages or sections.
            </p>
            <p>
                <Image side="right" img={2} />
                The theme introduces settings for schema attributes and semantic tags for key elements on regular pages,
                post pages, and archives, allowing for improved personalized SEO customization. It includes a range of
                settings to control the appearance and display mode of individual elements on the page, which, along
                with the previous settings, can be configured either from a separate tab in the administrative menu or
                in the theme customizer.
            </p>
            <p>
                <Image img={6} />
                In the admin menu, a special section for widgets and profiles has been introduced, allowing for flexible
                customization of the footer, header, internal and external sidebars. This system also enables setting a
                range of frequently reused settings individually based on specific conditions depending on the selected
                profile, which determines a unique set of pages where these settings should apply. Additionally, some
                more general settings are introduced outside the profile system in the common sections for pages, posts,
                and archives.
            </p>
            <p>
                <Image side="right" img={4} />
                For widget content creation, a modern WordPress approach is utilized, leveraging the Gutenberg block
                editor, which is seamlessly integrated directly into the administrative interface of the profile
                subsystem.
            </p>
            <p>
                <Image img={7} />
                The WebArchitect theme features a proprietary foundational design fully integrated into the CMS,
                tailored to the characteristics and structure of WordPress template organization. As evident from the
                provided screenshots of basic settings, the theme supports comments, tag categories, and other standard
                WordPress features. Additionally, it includes several proprietary features not initially supported by
                the CMS, such as a related posts system, breadcrumbs, social media integration, links to previous and
                next posts, etc., the visibility and position of which can be adjusted through a wide range of settings.
            </p>
            <p>
                <Image side="right" img={5} />
                During the theme development, the CarbonFields library was used as the foundation for extending the set
                of post fields. This library allowed for a significant expansion of the available field types.
                Furthermore, to organize the administrative interface for managing theme settings, as well as settings
                for individual profiles, posts, pages, and archives, complex custom control elements were developed.
                These control elements represent full-fledged control panels for specific subsystems (such as the
                profile system), expanding the hierarchy of CarbonFields classes and components using the React library
                on the client side. The level of accessibility and the extensive capabilities of the interface achieved
                through this approach can be observed firsthand in the administrative panel screenshots for managing
                pages, posts, settings profiles, and widgets.
            </p>
        </ProjectContent>
    );
}
