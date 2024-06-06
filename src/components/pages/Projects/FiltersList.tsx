import __ from "@/utilities/transtation";

import { useLanguage } from "@/store/appearanceSlice";

import { capitalize } from "@/utilities/string";
import AccentedTreeView, { AccentedTreeItemProps, AccentedTreeViewMultipleProps } from "@/components/AccentedTreeView";
import filters, { ProjectsFiltersInterface } from "./Filters";

function filtersToTreeItems(filters: ProjectsFiltersInterface, activeItem?: string): AccentedTreeItemProps[] {
    const res = Object.entries(filters).map(([id, details]) => ({
        id,
        isAccented: id == activeItem,
        title: __(capitalize(id)),
        icon: details.icon,
        children: details.items ? filtersToTreeItems(details.items) : undefined,
    }));
    return res;
}

// eslint-disable-next-line react-refresh/only-export-components
export function projectsCategoriesTreeViewData() {
    return filtersToTreeItems(filters);
}

type ProjectFiltersListProps = Omit<
    AccentedTreeViewMultipleProps,
    | "children"
    | "selectedItem"
    | "selectionMode"
    | "checkable"
    | "checkedAndSelected"
    | "checkedItems"
    | "selectedItems"
> & { selectedItems?: string[]; activeItem?: string; checkable?: boolean };

export default function ProjectFiltersList({
    selectedItems,
    activeItem,
    checkable,
    ...props
}: ProjectFiltersListProps) {
    useLanguage();
    return (
        <AccentedTreeView
            selectionMode="multiple"
            {...(checkable !== false ? { checkable: true, checkedAndSelected: true } : {})}
            initiallyExpandedNodes={["frontend", "backend"]}
            {...(selectedItems ? { checkedItems: selectedItems, selectedItems } : {})}
            {...props}
        >
            {filtersToTreeItems(filters, activeItem)}
        </AccentedTreeView>
    );
}
