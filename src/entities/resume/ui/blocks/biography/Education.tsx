"use client";
import AccentedTreeView from "@/shared/ui/AccentedTreeView";
import type { AccentedTreeItemProps } from "@/shared/ui/AccentedTreeView";
import DescriptionTable, { DescriptionTableData, DescriptionTableRowOptions } from "@/shared/ui/DescriptionTable";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useMediaQuery, useTheme } from "@mui/material";
import { useResumeData, EducationItem, EducationDataRow } from "@/entities/resume/model/resumeDataContext";
import { ICON_MAP } from "@/entities/resume/model/iconMap";


function buildTree(
    items: EducationItem[],
    dataRows: EducationDataRow[],
    lang: "en" | "ru",
    lastLeafId: number | undefined
): AccentedTreeItemProps[] {
    const childrenMap = new Map<number | null, EducationItem[]>();
    for (const item of items) {
        if (!childrenMap.has(item.parent_id)) childrenMap.set(item.parent_id, []);
        childrenMap.get(item.parent_id)!.push(item);
    }

    const dataByItem = new Map<number, EducationDataRow[]>();
    for (const row of dataRows) {
        if (!dataByItem.has(row.education_item_id)) dataByItem.set(row.education_item_id, []);
        dataByItem.get(row.education_item_id)!.push(row);
    }

    function buildNode(item: EducationItem): AccentedTreeItemProps {
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
                id: `edu_${item.id}`,
                title: label,
                icon: Icon ? <Icon /> : undefined,
                children: [
                    {
                        id: `edu_${item.id}_details`,
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
            id: `edu_${item.id}`,
            title: label,
            icon: Icon ? <Icon /> : undefined,
            children: children.map((child) => buildNode(child)),
        };
    }

    const roots = (childrenMap.get(null) || []).sort((a, b) => a.sort_order - b.sort_order);
    return roots.map((root) => buildNode(root));
}

function collectExpandableIds(nodes: AccentedTreeItemProps[], rootIndex: number): string[] {
    const ids: string[] = [];
    for (const node of nodes) {
        if ("title" in node && node.title && node.children) {
            if (rootIndex < 2) {
                ids.push(node.id);
                ids.push(...collectExpandableIds(node.children, rootIndex));
            }
        }
    }
    return ids;
}

export default function AboutBioEducationBlock() {
    const theme = useTheme();
    const lang = useLanguage();
    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    const { educationItems, educationData } = useResumeData();

    const leafItems = educationItems.filter((item) => educationData.some((d) => d.education_item_id === item.id));
    const lastLeafId = leafItems[leafItems.length - 1]?.id;

    const tree = buildTree(educationItems, educationData, lang.lang, lastLeafId);

    const expandedIds: string[] = [];
    tree.forEach((node, i) => {
        if ("title" in node && node.title && node.children) {
            expandedIds.push(node.id);
            expandedIds.push(...collectExpandableIds(node.children!, i));
        }
    });

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
