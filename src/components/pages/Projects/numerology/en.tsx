import { ProjectContent, ProjectContentProps, ProjectContentImage, ProjectContentImageProps } from "../ProjectContent";

function Image({ img, side }: Omit<ProjectContentImageProps, "slug">) {
    return <ProjectContentImage slug="numerology" side={side} img={img} />;
}

export function Component({ onImageClick }: ProjectContentProps) {
    return (
        <ProjectContent onImageClick={onImageClick}>
            <br />
            <p>
                <Image img={1} />
                Currently, the topic of esoterics and related services, including online services, remains popular. A
                solution based on the Yii2 framework represents an online service providing paid services for individual
                numerological calculations, compatibility and profession calculations, and the chart of "fate and will."
                For clients, using the service appears to be transparent. By visiting the main page, you can generate a
                basic free personal calculation by specifying your gender and date of birth, or also the date of birth
                of your partner for compatibility calculation.
            </p>
            <p>
                <Image side="right" img={4} />
                The result is a brief description of your numerological "matrix" and a general overview. To obtain a
                full calculation, a profession calculation, or a chart of "fate and will," an automated payment system
                through the PayAnyWay service is provided. Once the user's online payment is processed, a link to the
                calculation is automatically sent to their email, and a PDF version of the report is attached to the
                email as well.
            </p>
            <p>
                <Image img={2} />
                An interesting option of the report is the "fate and will" chart, which is a dynamically generated image
                of the chart indicating key points and areas based on the entered date of birth, accompanied by detailed
                explanations of the details, interpretation options, and decryption of the chart.
            </p>
            <p>
                <Image side="right" img={3} />
                Each report is based on a certain "numerological matrix" of a person, calculated based on the input
                data. The report's result consists of a vast array of characteristics and recommendations, formed for
                specific sets of digit combinations within the matrix. The ability to manage and format descriptions for
                these characteristics is provided in the administrative part of the website. Approximately five thousand
                such characteristics and combinations of characteristics, tailored for different genders, ages, specific
                digit combinations, etc., were ultimately calculated for the administrator to fill in the control panel.
            </p>
            <p>
                In the end, according to internal algorithms, a report is constructed, which includes descriptions of
                characteristics filled in by the administrator, the fate and will chart, and a PDF document.
            </p>
            <p>
                Additionally, the administrative section of the website allows for the analysis of payment transactions
                and management of a discount system through coupons, which can be utilized in advertising campaigns.
            </p>
            <p>
                Currently, the service is actively used, with daily visits ranging in the hundreds. Approximately 7% of
                these visits result in payments, generating a steady passive income for the website owners.
            </p>
        </ProjectContent>
    );
}
