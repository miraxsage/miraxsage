"use client";
import { useContext } from "react";
import __ from "@/shared/lib/i18n/translation";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { CategoryLabelsContext, useVisibleCategories } from "@/entities/resume/model/categoryLabels";

import { AboutCategoriesInterface } from "@/entities/resume/model/categories";
import { capitalize } from "@/shared/lib/string";
import AccentedTreeView, {
    AccentedTreeItemProps,
    AccentedTreeViewMultipleProps,
    AccentedTreeViewSingleProps,
    AccentedTreeViewUnselectableProps,
} from "@/shared/ui/AccentedTreeView";

function categoriesToTreeItems(
    categories: AboutCategoriesInterface,
    activeItem?: string | null,
    labelFn?: (slug: string) => string
): AccentedTreeItemProps[] {
    const res = Object.entries(categories).map(([id, details]) => ({
        id,
        isAccented: id == activeItem,
        title: labelFn ? labelFn(id) : __(capitalize(id)),
        icon: details.icon,
        children: details.items ? categoriesToTreeItems(details.items, activeItem, labelFn) : undefined,
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

export function abouteCategoriesTreeViewData(labelFn?: (slug: string) => string, cats?: AboutCategoriesInterface) {
    return categoriesToTreeItems(cats ?? {}, undefined, labelFn);
}

export default function AboutCategoriesList({ ...props }: AboutCategoriesListProps) {
    const lang = useLanguage();
    const labels = useContext(CategoryLabelsContext);
    const t = useUiLabels();
    const visibleCategories = useVisibleCategories();
    const getCatLabel = (slug: string) => {
        const entry = labels[slug];
        if (!entry) return __(capitalize(slug));
        return lang.lang === "en" ? entry.label_en : entry.label_ru;
    };
    const data = categoriesToTreeItems(visibleCategories, props.activeItem, getCatLabel);
    data.unshift({ id: "download-pdf", title: t("Download PDF"), icon: <PictureAsPdfIcon /> });
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
                  window.open(`/${t("Resume filename")}.pdf`, "_blank");
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
