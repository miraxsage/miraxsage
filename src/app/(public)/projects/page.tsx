import { Suspense } from "react";
import Projects from "@/entities/project/ui/ProjectsPage";
import ProjectsDataProvider from "@/entities/project/lib/ProjectsDataProvider";
import { getProjects } from "@/entities/project/api/getProjects";
import { dbProjectsToProjectInterfaces } from "@/entities/project/lib/projectAdapter";

export default function ProjectsPage() {
    const dbProjects = getProjects();
    const projects = dbProjectsToProjectInterfaces(dbProjects);
    return (
        <ProjectsDataProvider projects={projects}>
            <Suspense>
                <Projects />
            </Suspense>
        </ProjectsDataProvider>
    );
}
