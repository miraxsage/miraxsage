import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="hs-portal" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                The organization's special status implies a distinctive and unconventional design. The small size of the
                company allows for maximum attention to each client and precise control over the entire production
                process, which is also reflected in the company's informational website. At the designer's discretion, a
                seamless "fluid" and "floating" layout for pages was proposed, focused on the presentation component.
                The high density of demonstration images and videos on each page makes the product presentation highly
                representative.
            </p>
            <p>
                <Image side="right" img={4} />
                According to the designer's decision, a personally crafted image slider was developed, featuring a
                unique "overlay" structure for images and descriptions. Additionally, a system of "favorites" images was
                added. Next to each image, a special control element, marked with a "+", was included, allowing users to
                add images to their list of favorites. Through a special menu, users can view the list of selected
                images and share this list via a unique link, for instance, when discussing additional fittings with a
                client.
            </p>
            <p>
                <Image img={6} />
                An additional functionality for handling feedback has been implemented. When a client submits an inquiry
                through the respective form, their email will also be recorded in a .csv file categorized according to
                their interests. This allows for the formation of a client database through the website, enabling future
                advertising campaigns through email newsletters.
            </p>
            <p>
                <Image side="right" img={7} />
                Any advertising and marketing specialist knows that when someone clicks on an ad, it's crucial to
                establish an instant connection between the ad and the landing page. The best solution is a prominent
                headline that echoes the main call to action in the ad. However, sometimes it's inappropriate to change
                the natural headlines both for SEO purposes and for the overall concise appearance of the page. To
                address this issue, we've created a system of special hashtags (#) in the URL. An appended hashtag will
                alter the selected content of the page. In other words, only the person clicking on the modified link
                will see the alternative version of the content. These modified pages will remain hidden from search
                engine crawlers and regular visitors but will retain their actual address.
            </p>
            <p>
                It's also evident that, in line with the company's focus on international customers, translation into
                three languages ​has been implemented: Russian, English, and German.
            </p>
        </ProjectContent>
    );
}
