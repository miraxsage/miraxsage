import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="extemal-optimization" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={4} />
                The proposed software solution, developed on the .NET Framework platform using the WPF library, allows
                solving extremum finding tasks for an n-dimensional mathematical function using one of the primary
                graphical search methods. It also enables demonstrating the geometric interpretation of the obtained
                results in the form of a two-dimensional dependency graph and conducting a comparative analysis of the
                highest efficiency of different search methods.
            </p>
            <p>
                <Image side="right" img={1} />
                Three-dimensional optimization methods allow for the most efficient determination of the maximum or
                minimum value of the objective function with just two arguments. Moreover, these methods can generally
                be applied to n-dimensional problems, for functions with n variables.
            </p>
            <p>
                <Image img={2} />
                The implementation of the described methods, which also demonstrates the geometric interpretation of the
                obtained results in the form of a three-dimensional graph of the objective function reflecting the steps
                of intermediate iterations and statistical search information, is presented in the adjacent image.
            </p>
            <p>
                However, unconditional optimization tasks are just a special case of searching for the optimal value of
                the objective function. Much more often, it is necessary to impose a whole series of additional
                constraints on the domain of permissible values ​​of its arguments, which should be taken into account
                during the search process.
            </p>
            <p>
                This software solution demonstrates a prototype control element that allows real-time setting and
                configuring of constraint parameters and the objective function. It also enables step-by-step tracking
                of the results of their intersections and the formation of the resulting domain of permissible values.
            </p>
            <p>
                <Image side="right" img={5} />
                Each line represents one of the linear equations in the condition, indicating the domain of permissible
                values ​​in one of the half-spaces into which the line divides the coordinate plane. When intersecting,
                they form a shape highlighted in yellow, representing the domain of permissible values for all equations
                in the condition. As a result, within this area, it is visually easy to find a solution according to the
                specified criterion, such as minimum or maximum value.
            </p>
            <div style={{ clear: "both" }}></div>
        </ProjectContent>
    );
}
