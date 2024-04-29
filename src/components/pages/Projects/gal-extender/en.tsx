import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="gal-extender" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={3} />
                The mentioned application, developed on demand, simulates the behavior of the client application of the
                specified social network (the original project has its own separate web client for browsers, as well as
                separate client applications for Android and iOS), exchanging system messages with the server
                wss://cs.mobstudio.ru:6672/ over a secure communication channel using the WebSocket protocol.
            </p>
            <p>
                <Image side="right" img={1} />
                After analyzing the internal protocol of the social network, through which the server "communicates"
                with its clients (on mobile devices or in the browser), the developed solution replicates the received
                commands to control the chat character, perform movements between rooms (planets), and send local and
                private mail.
            </p>
            <p>
                <Image img={2} />
                Automated distribution ultimately allows for significant reduction in manual labor costs, customization
                of necessary delays, a list of thematic gaming planets for flights and searching for characters to send
                advertising in private messages, or leaving messages in the general chat.
            </p>
        </ProjectContent>
    );
}
