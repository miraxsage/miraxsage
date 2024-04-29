import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="wordsense" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                WordSense is a personal pet project with open-source code on a modern technology stack. Within this
                development, the aim was to strengthen my knowledge of the Laravel framework, which I currently consider
                to be extremely popular in the PHP ecosystem. PHP still holds a significant share of websites, making it
                relevant to focus on.
            </p>
            <p>
                It's no secret that Laravel's popularity is well-deserved, as it offers numerous convenient and
                ready-made solutions, including one of which is the additional Inertia library for integrating React on
                the client and Laravel on the server. On the client side, Inertia replaces ReactRouter, providing its
                own routing interfaces linked to Laravel's routing architecture. On the server side, Inertia injects its
                code, including bundling with the Vite bundler for convenient development, which allows you to link your
                logic on the client and server.
            </p>
            <p>
                <Image img={3} />
                In addition to the proposed Laravel solution for integrating the server-side (models, controllers, and
                other business logic tools) and the client-side, implemented using one of the popular libraries for
                rendering the user interface (React or Vue), several auxiliary libraries were also chosen during the
                design of the future solution on the client side. These include React, MUI for utilizing ready-made
                control elements and styling management systems, and Redux for state management.
            </p>
            <p>
                <Image side="right" img={5} />
                At the moment, the project is still in its early stages of development. Goals and tasks have been
                defined, development tools and libraries have been chosen, and features such as toggling between light
                and dark themes, basic registration and authentication, and the implementation of the first application
                screen have been completed.
            </p>
            <p>
                In the future, the plan is to implement a multitude of features. This includes the ability to read books
                and articles with dual translation, maintaining a personal dictionary, an advanced system for
                reinforcing knowledge, a functional dictionary with detailed word breakdowns and popular translation
                options, linked word groups, numerous examples of usage in context, and much more.
            </p>
        </ProjectContent>
    );
}
