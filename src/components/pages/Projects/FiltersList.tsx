import __ from "@/utilities/transtation";

import { useLanguage } from "@/store/appearanceSlice";

import { capitalize } from "@/utilities/string";
import AccentedTreeView, { AccentedTreeItemProps, AccentedTreeViewMultipleProps } from "@/components/AccentedTreeView";
import filters, { ProjectsFiltersInterface } from "./Filters";

function filtersToTreeItems(filters: ProjectsFiltersInterface): AccentedTreeItemProps[] {
    const res = Object.entries(filters).map(([id, details]) => ({
        id,
        title: __(capitalize(id)),
        icon: details.icon,
        children: details.items ? filtersToTreeItems(details.items) : undefined,
    }));
    return res;
}

type ProjectFiltersListProps = Omit<
    AccentedTreeViewMultipleProps,
    | "children"
    | "selectedItem"
    | "selectionMode"
    | "checkable"
    | "checkedAndSelected"
    | "expandedNodes"
    | "checkedItems"
    | "selectedItems"
> & { activeItems: string[] };

export default function ProjectFiltersList({ activeItems, ...props }: ProjectFiltersListProps) {
    useLanguage();
    return (
        <AccentedTreeView
            selectionMode="multiple"
            checkable={true}
            checkedAndSelected={true}
            expandedNodes={["frontend", "backend"]}
            {...(activeItems ? { checkedItems: activeItems, selectedItems: activeItems } : {})}
            {...props}
        >
            {filtersToTreeItems(filters)}
        </AccentedTreeView>
    );
}
