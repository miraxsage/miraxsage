import __ from "@/utilities/transtation";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

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

export default function AboutCategoriesList({ ...props }: AboutCategoriesListProps) {
    useLanguage();
    const data = categoriesToTreeItems(categories, props.activeItem);
    data.unshift({ id: "download-pdf", title: __("Download PDF"), icon: <PictureAsPdfIcon /> });
    const onItemsSelectOuterHandler = props.onItemsSelect;
    const onItemsSelectHandler = !props.onItemsSelect
        ? undefined
        : (selectedItems: AccentedTreeItemProps | AccentedTreeItemProps[] | undefined) => {
              let isPdfItemClick = false;
              if (Array.isArray(selectedItems)) {
                  const pdfItemIndex = selectedItems.findIndex((item) => item.id == "download-pdf");
                  if (pdfItemIndex >= 0) {
                      delete selectedItems[pdfItemIndex];
                      isPdfItemClick = selectedItems.length == 0;
                  }
              } else if (selectedItems && selectedItems.id == "download-pdf") {
                  selectedItems = undefined;
                  isPdfItemClick = true;
              }
              if (isPdfItemClick) {
                  window.open("/Resume (Miraxsage).pdf", "_blank");
                  return;
              }
              if (selectedItems)
                  onItemsSelectOuterHandler?.(selectedItems as AccentedTreeItemProps & AccentedTreeItemProps[]);
          };
    if (onItemsSelectHandler) props.onItemsSelect = onItemsSelectHandler;
    return (
        <AccentedTreeView initiallyExpandedNodes={["biography", "experience", "specifications"]} {...props}>
            {data}
        </AccentedTreeView>
    );
}
