import __ from "@/utilities/transtation";

import { useLanguage } from "@/store/appearanceSlice";

import categories, {
    AboutCategories,
} from "@/components/pages/About/Categories";
import { capitalize } from "@/utilities/string";
import AccentedTreeView, {
    AccentedTreeItemProps,
    AccentedTreeViewProps,
} from "@/components/AccentedTreeView";

function categoriesToTreeItems(
    categories: AboutCategories,
    activeItem?: string | null
): AccentedTreeItemProps[] {
    const res = Object.entries(categories).map(([id, details]) => ({
        id,
        isAccented: id == activeItem,
        title: __(capitalize(id)),
        icon: details.icon,
        children: details.items
            ? categoriesToTreeItems(details.items, activeItem)
            : undefined,
    }));
    return res;
}

type AboutCategoriesListProps = {
    activeItem?: string | null;
    selectedItem?: string | null;
} & Omit<AccentedTreeViewProps, "children" | "selectedItem">;

export default function AboutCategoriesList({
    activeItem,
    ...props
}: AboutCategoriesListProps) {
    useLanguage();
    return (
        <AccentedTreeView
            expandedNodes={["biography", "experience", "specifications"]}
            {...props}
        >
            {categoriesToTreeItems(categories, activeItem)}
        </AccentedTreeView>
    );
}
