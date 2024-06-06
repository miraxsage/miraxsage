import __ from "@/utilities/transtation";

import { useLanguage } from "@/store/appearanceSlice";

import categories, { AboutCategoriesInterface } from "@/components/pages/About/Categories";
import { capitalize } from "@/utilities/string";
import AccentedTreeView, {
    AccentedTreeItemProps,
    AccentedTreeViewMultipleProps,
    AccentedTreeViewSingleProps,
    AccentedTreeViewUnselectableProps,
} from "@/components/AccentedTreeView";

function categoriesToTreeItems(
    categories: AboutCategoriesInterface,
    activeItem?: string | null
): AccentedTreeItemProps[] {
    const res = Object.entries(categories).map(([id, details]) => ({
        id,
        isAccented: id == activeItem,
        title: __(capitalize(id)),
        icon: details.icon,
        children: details.items ? categoriesToTreeItems(details.items, activeItem) : undefined,
    }));
    return res;
}

type AboutCategoriesListProps = {
    activeItem?: string | null;
} & (
    | Omit<AccentedTreeViewSingleProps, "children">
    | Omit<AccentedTreeViewMultipleProps, "children">
    | Omit<AccentedTreeViewUnselectableProps, "children">
);

// eslint-disable-next-line react-refresh/only-export-components
export function abouteCategoriesTreeViewData() {
    return categoriesToTreeItems(categories);
}

export default function AboutCategoriesList({ activeItem, ...props }: AboutCategoriesListProps) {
    useLanguage();
    return (
        <AccentedTreeView initiallyExpandedNodes={["biography", "experience", "specifications"]} {...props}>
            {categoriesToTreeItems(categories, activeItem)}
        </AccentedTreeView>
    );
}
