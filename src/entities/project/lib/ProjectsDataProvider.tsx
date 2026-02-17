"use client";

import { ReactNode } from "react";
import { ProjectInterface, setProjectsData } from "@/entities/project/model/projects";

export default function ProjectsDataProvider({
    projects,
    children,
}: {
    projects: ProjectInterface[];
    children: ReactNode;
}) {
    setProjectsData(projects);
    return children;
}
