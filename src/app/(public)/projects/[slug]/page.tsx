import { Suspense } from "react";
import ProjectPage from "@/entities/project/ui/ProjectPage";
import ProjectsDataProvider from "@/entities/project/lib/ProjectsDataProvider";
import { getProjects } from "@/entities/project/api/getProjects";
import { dbProjectsToProjectInterfaces } from "@/entities/project/lib/projectAdapter";

export function generateStaticParams() {
    const dbProjects = getProjects();
    return dbProjects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage() {
    const dbProjects = getProjects();
    const projects = dbProjectsToProjectInterfaces(dbProjects);
    return (
        <ProjectsDataProvider projects={projects}>
            <Suspense>
                <ProjectPage />
            </Suspense>
        </ProjectsDataProvider>
    );
}
