import DescriptionTable from "@/components/DescriptionTable";
import { ProjectInterface, ProjectsList, projects } from "./Projects";
import { useAppearance } from "@/store/appearanceSlice";
import __ from "@/utilities/transtation";
import { capitalize } from "@/utilities/string";
import TechnologiesCrumbs from "@/components/TechnologiesCrumbs";
import Link from "@/components/Link";
import { Box } from "@mui/material";

export default function ProjectInfoTable({ project: slug }: { project: ProjectsList }) {
    const project: ProjectInterface = projects.find((p) => p.slug == slug)!;
    const lang = useAppearance().language;
    return (
        <Box sx={{ marginLeft: "-1px" }}>
            <DescriptionTable withoutTopBorder={true} maxWidth="1 col">
                {[
                    [__("Full name"), project.name[lang], { fullLine: true }],
                    [__("Description"), project.description[lang], { fullLine: true }],
                    [__("Technologies"), <TechnologiesCrumbs techs={project.technologies} />, { fullLine: true }],
                    [__("Domain area"), __(project.domain)],
                    [__("Rating"), `[Score ${project.rating}/5]`],
                    [__("Year"), project.year.toString()],
                    [__("Status"), __(capitalize(project.status))],
                    [__("Participating"), __(capitalize(project.participating))],
                    [__("Develompent period"), project.devTimeMonths + " " + __("mon.")],
                    [
                        __("Github link"),
                        project.gitHubLink ? (
                            <Link href={project.gitHubLink} target="_blank">
                                {project.gitHubLink}
                            </Link>
                        ) : (
                            "-"
                        ),
                        { fullLine: true },
                    ],
                ]}
            </DescriptionTable>
        </Box>
    );
}
