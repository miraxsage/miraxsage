import { ReactNode } from "react";
import MarkupIcon from "@/components/icons/MarkupIcon";
import TerminalIcon from "@/components/icons/TerminalIcon";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import { technologies } from "../About/Blocks/specs/Technologies";

export type ProjectsFilter = {
    icon?: ReactNode;
    items?: { [k: string]: ProjectsFilter };
};
export type ProjectsFiltersInterface = Exclude<ProjectsFilter["items"], undefined>;

const filters = {
    frontend: {
        icon: <MarkupIcon />,
        items: {
            ...Object.fromEntries(technologies.frontend.map(([tech, , Icon]) => [tech, { icon: <Icon /> }])),
        },
    },
    backend: {
        icon: <TerminalIcon />,
        items: {
            ...Object.fromEntries(technologies.backend.map(([tech, , Icon]) => [tech, { icon: <Icon /> }])),
        },
    },
    desktop: {
        icon: <PersonalVideoIcon />,
        items: {
            ...Object.fromEntries(technologies.desktop.map(([tech, , Icon]) => [tech, { icon: <Icon /> }])),
        },
    },
} satisfies ProjectsFiltersInterface;

export default filters;

export type ProjectsFiltersType = typeof filters;

export type ProjectsFilters = keyof ProjectsFiltersType;

export type AboutContentfulCategories = Exclude<ProjectsFilters, "snippets">;

export type AboutSubCategories<K extends AboutContentfulCategories = AboutContentfulCategories> =
    ProjectsFiltersKeysRecursive<ProjectsFiltersType, K>;

export type ProjectsFiltersKeysRecursive<T extends object, K extends keyof T = keyof T> = T extends {
    icon: unknown;
    items: unknown;
}
    ? T["items"] extends object
        ? ProjectsFiltersKeysRecursive<T["items"]>
        : never
    : K extends string
    ? T[K] extends { icon: unknown; items: unknown }
        ? K | ProjectsFiltersKeysRecursive<T[K]>
        : K
    : never;

export function findCategory(id: string, initialFilters?: ProjectsFiltersInterface) {
    const flts = Object.entries(initialFilters || filters);
    let i = -1;
    while (++i < flts.length) {
        if (flts[i][0] == id) return flts[i][1];
        if (flts[i][1].items) flts.push(...Object.entries(flts[i][1].items));
    }
    return null;
}

export function hasSubcategories(filter: ProjectsFilters): filter is AboutContentfulCategories {
    return "items" in filters[filter];
}
