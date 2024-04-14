import PersonIcon from "@mui/icons-material/Person";
import WebhookIcon from "@mui/icons-material/Webhook";
import StarIcon from "@mui/icons-material/Star";
import { projects } from "./Projects";
import { NavigateFunction, useLocation, useParams } from "react-router-dom";
import { findTechnology, isCategoryTechnology, isTechnology, technologies } from "../About/Blocks/specs/Technologies";

export const projectsOrderItems = [
    { slug: "name", name: "По наименованию", icon: PersonIcon },
    { slug: "rating", name: "По рейтингу", icon: StarIcon },
    { slug: "techs", name: "По технологиям", icon: WebhookIcon },
] as const;

export type ProjectsLocation = {
    techs: string[];
    order: string;
    orderDirection: string;
    project: string;
};

function normatizeLocationTechs(techs?: string[], mode?: "full" | "compact") {
    let resultTechs: string[] = [];
    const excludeTechs: string[] = [];
    if (techs) {
        techs.forEach((tech) => {
            if (isTechnology(tech) && isCategoryTechnology(tech))
                excludeTechs.push(...technologies[tech].map(([name]) => name));
        });
        resultTechs = techs.filter((tech) => isTechnology(tech) && !excludeTechs.includes(tech));
    }
    return mode == "full" ? [...resultTechs, ...excludeTechs] : resultTechs;
}

export function getLocatedProjects({ techs, order, orderDirection }: ProjectsLocation, language?: string) {
    const lang: "ru" | "en" = language != "ru" && language != "en" ? "ru" : language;
    return projects
        .sort((a, b) => {
            if (order == "name") return (orderDirection == "desc" ? -1 : 1) * a.name[lang].localeCompare(b.name[lang]);
            if (order == "rating") return (orderDirection == "desc" ? -1 : 1) * (a.rating - b.rating);
            if (order == "techs")
                return (orderDirection == "desc" ? -1 : 1) * (a.technologies.length - b.technologies.length);
            return 0;
        })
        .filter((p) => techs.length == 0 || p.technologies.some((t) => techs.includes(t)));
}

export function useProjectsLocation(): ProjectsLocation | null {
    const location = useLocation();
    const project = useParams().slug ?? "all";
    if (!location.pathname.match(/\/projects/)) return null;
    const search = new URLSearchParams(location.search);
    let techs: string[] = search.has("techs")
        ? (search
              .get("techs")
              ?.split(",")
              .map((c) => findTechnology(c)?.name)
              .filter(Boolean) as string[]) ?? []
        : [];
    techs = normatizeLocationTechs(techs, "full");

    let order: string = search.has("order") ? search.get("order")?.toLowerCase() ?? "name" : "name";
    let orderDirection = "asc";
    const orderElements = order.split(",");
    if (orderElements.length > 1) [order, orderDirection] = orderElements;
    if (projectsOrderItems.every((item) => item.slug != order)) order = "name";
    if (orderDirection != "asc" && orderDirection != "desc") orderDirection = "asc";
    order = projectsOrderItems.some((item) => item.slug == order) ? order : "name";

    return {
        project,
        techs,
        order,
        orderDirection,
    };
}

export function getProjectsNavigationLink(
    {
        project: newProject,
        techs: newTechs,
        order: newOrder,
        orderDirection: newOrderDirection,
    }: Partial<ProjectsLocation>,
    defaultLocation: ProjectsLocation
) {
    if (!newProject || (newProject != "all" && projects.every((p) => p.slug != newProject)))
        newProject = defaultLocation.project;
    newTechs = normatizeLocationTechs(newTechs ? newTechs : defaultLocation.techs);
    newOrder = newOrder?.toLowerCase() ?? defaultLocation.order;
    newOrderDirection = newOrderDirection?.toLowerCase() ?? defaultLocation.orderDirection;
    if ((newOrder == "name" && newOrderDirection == "asc") || projectsOrderItems.every((item) => item.slug != newOrder))
        newOrder = undefined;
    return `/projects${newProject && newProject != "all" ? "/" + encodeURIComponent(newProject) : ""}?${
        newTechs.length > 0 ? "techs=" + encodeURIComponent(newTechs.join(",").toLowerCase()) : ""
    }${
        newOrder
            ? (newTechs.length > 0 ? "&" : "") + `order=${encodeURIComponent(newOrder + "," + newOrderDirection)}`
            : ""
    }`;
}

export function navigateToProjects(
    navigate: NavigateFunction,
    navigationLocation: Partial<ProjectsLocation>,
    defaultLocation: ProjectsLocation
) {
    navigate(getProjectsNavigationLink(navigationLocation, defaultLocation));
}
