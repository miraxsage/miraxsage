"use client";
import AccentedTreeView from "@/shared/ui/AccentedTreeView";
import type { AccentedTreeItemProps } from "@/shared/ui/AccentedTreeView";
import DescriptionTable, { DescriptionTableData, DescriptionTableRowOptions } from "@/shared/ui/DescriptionTable";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useMediaQuery, useTheme } from "@mui/material";
import { useResumeData, LaborItem, LaborDataRow } from "@/entities/resume/model/resumeDataContext";
import { ICON_MAP } from "@/entities/resume/model/iconMap";


function buildTree(
    items: LaborItem[],
    dataRows: LaborDataRow[],
    lang: "en" | "ru",
    lastLeafId: number | undefined
): AccentedTreeItemProps[] {
    const childrenMap = new Map<number | null, LaborItem[]>();
    for (const item of items) {
        if (!childrenMap.has(item.parent_id)) childrenMap.set(item.parent_id, []);
        childrenMap.get(item.parent_id)!.push(item);
    }

    const dataByItem = new Map<number, LaborDataRow[]>();
    for (const row of dataRows) {
        if (!dataByItem.has(row.labor_item_id)) dataByItem.set(row.labor_item_id, []);
        dataByItem.get(row.labor_item_id)!.push(row);
    }

    function buildNode(item: LaborItem): AccentedTreeItemProps {
        const children = (childrenMap.get(item.id) || []).sort((a, b) => a.sort_order - b.sort_order);
        const data = (dataByItem.get(item.id) || []).sort((a, b) => a.sort_order - b.sort_order);
        const Icon = item.icon ? ICON_MAP[item.icon] : undefined;
        const label = lang === "en" ? item.label_en : item.label_ru;

        if (data.length > 0) {
            const tableData: DescriptionTableData = data.map((row) => {
                const rowLabel = lang === "en" ? row.label_en : row.label_ru;
                const value = { en: row.value_en, ru: row.value_ru };
                const opts: DescriptionTableRowOptions = {};
                if (row.is_full_line) opts.fullLine = true;
                return [rowLabel, value, opts];
            });

            return {
                id: `labor_${item.id}`,
                title: label,
                icon: Icon ? <Icon /> : undefined,
                children: [
                    {
                        id: `labor_${item.id}_details`,
                        content: (
                            <DescriptionTable withoutBottomBorder={item.id === lastLeafId}>
                                {tableData}
                            </DescriptionTable>
                        ),
                    },
                ],
            };
        }

        return {
            id: `labor_${item.id}`,
            title: label,
            icon: Icon ? <Icon /> : undefined,
            children: children.map((child) => buildNode(child)),
        };
    }

    const roots = (childrenMap.get(null) || []).sort((a, b) => a.sort_order - b.sort_order);
    return roots.map((root) => buildNode(root));
}

export default function AboutBioLaborBlock() {
    const theme = useTheme();
    const lang = useLanguage();
    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    const { laborItems, laborData } = useResumeData();

    const leafItems = laborItems.filter((item) => laborData.some((d) => d.labor_item_id === item.id));
    const lastLeafId = leafItems[leafItems.length - 1]?.id;

    const tree = buildTree(laborItems, laborData, lang.lang, lastLeafId);

    // Expand root node and its first child (matching original behavior)
    const expandedIds: string[] = [];
    if (tree.length > 0 && "title" in tree[0] && tree[0].children) {
        expandedIds.push(tree[0].id);
        const firstChild = tree[0].children[0];
        if (firstChild && "title" in firstChild) {
            expandedIds.push(firstChild.id);
        }
    }

    return (
        <>
            <AccentedTreeView
                intend={lessSm ? "small" : "regular"}
                initiallyExpandedNodes={expandedIds}
                selectionMode="disable"
            >
                {tree}
            </AccentedTreeView>
        </>
    );
}
