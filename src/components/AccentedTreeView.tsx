import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React, { CSSProperties, ReactNode, useState } from "react";
import { UseTreeViewExpansionParameters } from "@mui/x-tree-view/internals/plugins/useTreeViewExpansion";
import { Checkbox, Collapse, SxProps, alpha, styled } from "@mui/material";
import { motion } from "framer-motion";
import { getThemeColor } from "./contexts/Theme";
import { TransitionProps } from "@mui/material/transitions";
import { areEqualShallow } from "@/utilities/common";

declare module "@mui/x-tree-view" {
    interface TreeItemProps {
        style?: (CSSProperties & { "--level": number }) | undefined;
    }
}
export type AccentedTextTreeItemProps = {
    content?: never;
    id: string;
    title: string;
    icon?: ReactNode;
    isAccented?: boolean;
    notSelectable?: boolean;
    children?: AccentedTreeItemProps[];
};
export type AccentedContentedTreeItemProps = {
    content: ReactNode;
    id: string;
    title?: never;
    icon?: never;
    isAccented?: never;
    children?: never;
    notSelectable?: never;
};
export type AccentedTreeItemProps = AccentedContentedTreeItemProps | AccentedTextTreeItemProps;

interface AccentedTreeViewBasicProps {
    children: AccentedTreeItemProps[];
    expandedNodes?: string[];
    intend?: "small" | "regular" | "double";
    checkable?: boolean;
    checkedAndSelected?: boolean;
    checkedItems?: string[];
    onItemsChecked?: (item: AccentedTreeItemProps[]) => void;
    onToggle?: (event: React.SyntheticEvent<Element, Event>, nodeIds: string[]) => void;
    sx?: SxProps;
}

export interface AccentedTreeViewSingleProps extends AccentedTreeViewBasicProps {
    selectionMode: "single";
    selectedItems?: string;
    onItemsSelect?: (item: AccentedTreeItemProps) => void;
}
export interface AccentedTreeViewMultipleProps extends AccentedTreeViewBasicProps {
    selectionMode: "multiple";
    selectedItems?: string[];
    onItemsSelect?: (item: AccentedTreeItemProps[]) => void;
}
export interface AccentedTreeViewUnselectableProps extends AccentedTreeViewBasicProps {
    selectionMode?: "disable";
    selectedItems?: never;
    onItemsSelect?: never;
}
export type AccentedTreeViewProps =
    | AccentedTreeViewSingleProps
    | AccentedTreeViewMultipleProps
    | AccentedTreeViewUnselectableProps;

const openedIcon = <ExpandMoreIcon />;
const closedIcon = <ChevronRightIcon />;

interface StyledTreeItemProps {
    level: number;
    isAccented?: boolean;
    isContentedItem?: boolean;
    hasIcon?: boolean;
    hasChildren?: boolean;
    intend: "small" | "regular" | "double";
}

const AccentedTreeItem = styled(TreeItem, {
    shouldForwardProp: (prop) => !String(prop).match(/^level|isAccented|hasIcon|hasChildren|isContentedItem$/),
})<StyledTreeItemProps>(
    ({
        theme,
        level,
        isAccented = false,
        isContentedItem = false,
        hasIcon = false,
        hasChildren = false,
        intend = "regular",
    }) => {
        const intendSize = intend == "double" ? 34 : intend == "regular" ? 12 : 4;
        const smallIntend = intend == "small";
        const dashSize = smallIntend ? "6px" : "10px";
        return {
            position: "relative",
            color: getThemeColor("regularText", theme),
            "& .MuiTreeItem-content": {
                transition: "color 0.25s, background 0.15s",
                position: "relative",
                zIndex: "calc(var(--level) + 1)",
                padding: isContentedItem ? "0px" : "3px 8px",
                paddingLeft: `calc(${intendSize}px * var(--level) + 10px * var(--level) - 6px)`,
            },
            "&:before": {
                content: '""',
                display: "block",
                height: "1px",
                width: level > 0 ? (isContentedItem ? "14px" : dashSize) : "0px",
                position: "absolute",
                backgroundColor: theme.palette.divider,
                top: isContentedItem ? "50%" : "16px",
                left: `calc(${intendSize}px * var(--level) + 10px * var(--level) - 6px)`,
            },
            "&:last-child:before": {
                height: isContentedItem ? "50%" : "calc(100% - 16px)",
                borderColor: theme.palette.divider,
                backgroundColor: getThemeColor("layoutBackground", theme),
                borderWidth: "1px 0px 0px 0px",
                top: isContentedItem ? "50%" : "16px",
                left: `calc(${intendSize}px * var(--level) + 10px * var(--level) - 7px)`,
                zIndex: "var(--level)",
            },
            "& > .MuiTreeItem-content .MuiTreeItem-iconContainer": {
                width: "auto",
                marginLeft:
                    level > 0
                        ? hasIcon || hasChildren
                            ? smallIntend
                                ? "6px"
                                : "10px"
                            : "3px"
                        : smallIntend
                        ? "0px"
                        : "4px",
                marginRight: "0px",
                paddingLeft: smallIntend ? "1px" : "2px",
                paddingRight: !hasIcon && hasChildren ? "0px" : "3px",
                ...(level == 0
                    ? {
                          "& svg:first-of-type": {
                              marginLeft: "-1px",
                          },
                          ...(!hasChildren && smallIntend ? { marginLeft: "11px" } : {}),
                      }
                    : {}),
            },
            "& > .MuiTreeItem-content:not(.Mui-selected) .MuiTreeItem-iconContainer": {
                color: isAccented ? "inherit" : getThemeColor("regularIcon", theme),
            },
            "& .MuiTreeItem-content .MuiTreeItem-iconContainer > * + *": {
                marginLeft: smallIntend ? "-1.5px" : "3px",
            },
            "& .MuiTreeItem-content .MuiTreeItem-iconContainer svg": {
                fontSize: "19px",
            },
            "& .MuiTreeItem-content .MuiTreeItem-label": {
                paddingLeft: "5px",
            },
            "& .MuiTreeItem-iconContainer .MuiCheckbox-root": {
                padding: "0px",
                marginRight: "5px",
                color: "currentColor",
                ":hover": {
                    background: alpha(getThemeColor("regularText", theme), 0.2),
                },
            },
            ...(isAccented
                ? {
                      "& > .MuiTreeItem-content:after": {
                          content: '""',
                          display: "block",
                          background: getThemeColor("secondaryHoverText", theme),
                          width: "2px",
                          height: "100%",
                          position: "absolute",
                          right: 0,
                      },
                      "& > div > .MuiTreeItem-group:after": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          width: "1px",
                          height: "100%",
                          top: 0,
                          right: 0,
                          backgroundColor: getThemeColor("secondaryHoverText", theme),
                      },
                  }
                : {}),
            ...(isContentedItem
                ? {
                      "& > .MuiTreeItem-content": {
                          cursor: "auto",
                          paddingTop: 0,
                          paddingRight: 0,
                          paddingBotton: 0,
                          "& .MuiTreeItem-label": {
                              paddingLeft: "6px",
                          },
                      },
                      "& > .MuiTreeItem-content:hover": {
                          background: "transparent",
                      },
                  }
                : {
                      "& .MuiTreeItem-content.Mui-focused": {
                          background: "transparent",
                      },
                      [`& > .MuiTreeItem-content.Mui-selected, 
                    & > .MuiTreeItem-content.Mui-selected.Mui-focused
                    ${isAccented ? ", & > .MuiTreeItem-content, & > .MuiTreeItem-content.Mui-focused" : ""}`]: {
                          color: getThemeColor(isAccented ? "secondaryHoverText" : "accentedHoverText", theme),
                          background: getThemeColor(isAccented ? "secondaryBg" : "accentedBg", theme),
                      },
                      [`& > .MuiTreeItem-content.Mui-selected:hover`]: {
                          background: getThemeColor(isAccented ? "secondaryHoverBg" : "accentedHoverBg", theme),
                      },
                      "& > .MuiTreeItem-content:hover": {
                          background: getThemeColor(isAccented ? "secondaryHoverBg" : "regularHoverBg", theme),
                      },
                  }),
            "& .MuiTreeItem-group": {
                margin: 0,
                position: "relative",
            },
            "& .MuiTreeItem-group:before": {
                content: '""',
                display: "block",
                position: "absolute",
                width: "1px",
                height: "calc(100% - 15px)",
                top: 0,
                left: `calc(${intendSize}px * (var(--level) + 1) + 10px * var(--level) + 3px)`,
                backgroundColor: theme.palette.divider,
                zIndex: "var(--level)",
            },
        };
    }
);

function AccentedTreeItemTransitionComponent(props: TransitionProps) {
    return (
        <motion.div
            animate={{ opacity: props.in ? 1 : 0 }}
            transition={{
                duration: 0.2,
                delay: props.in ? 0.1 : 0,
            }}
        >
            <Collapse {...props} />
        </motion.div>
    );
}

function setNodeChecking(nodeId: string, checkedNodes: string[], status: boolean) {
    const index = checkedNodes.findIndex((nid) => nid == nodeId);
    if (!status && index >= 0) delete checkedNodes[index];
    if (status && index < 0) checkedNodes.push(nodeId);
    return status;
}

function fixNodesFullChecking(
    nodes: AccentedTreeItemProps[],
    checkedNodes: string[],
    changedNodesOrStatus: { nodeId: string; status: boolean }[] | boolean
) {
    let allNodesChecked = true;
    nodes.forEach((node) => {
        if (node.children && node.children.length) {
            if (typeof changedNodesOrStatus == "boolean") {
                setNodeChecking(node.id, checkedNodes, changedNodesOrStatus);
                fixNodesFullChecking(node.children, checkedNodes, changedNodesOrStatus);
                return;
            }
            const changedNode = changedNodesOrStatus.find((n) => n.nodeId == node.id);
            if (changedNode) fixNodesFullChecking(node.children, checkedNodes, changedNode.status);
            else {
                if (!fixNodesFullChecking(node.children, checkedNodes, changedNodesOrStatus)) {
                    const index = checkedNodes.findIndex((nid) => nid == node.id);
                    if (index >= 0) delete checkedNodes[index];
                    return (allNodesChecked = false);
                } else {
                    if (!checkedNodes.includes(node.id)) checkedNodes.push(node.id);
                }
            }
        } else {
            if (typeof changedNodesOrStatus == "boolean")
                return setNodeChecking(node.id, checkedNodes, changedNodesOrStatus);
            else if (!checkedNodes.includes(node.id)) return (allNodesChecked = false);
        }
    });
    return typeof changedNodesOrStatus == "boolean" ? changedNodesOrStatus : allNodesChecked;
}

function getNodesChanges(nodesBefore: string[], nodesAfter: string[]) {
    const result: { nodeId: string; status: boolean }[] = [];
    nodesAfter.forEach((nodeAfter) => {
        if (!nodesBefore.includes(nodeAfter)) result.push({ nodeId: nodeAfter, status: true });
    });
    nodesBefore.forEach((nodeBefore) => {
        if (!nodesAfter.includes(nodeBefore)) result.push({ nodeId: nodeBefore, status: false });
    });
    return result;
}

export default function AccentedTreeView({
    children,
    selectedItems: selectedItemsProp = [],
    checkedItems: checkedItemsProp = [],
    expandedNodes: expandedNodesProp = [],
    selectionMode = "single",
    onItemsSelect,
    onItemsChecked,
    onToggle,
    intend = "regular",
    checkable,
    checkedAndSelected,
    sx,
}: AccentedTreeViewProps) {
    let selectedItems: string[] = [];
    if (selectionMode == "single" && typeof selectedItemsProp == "string") selectedItems = [selectedItemsProp];
    if (selectionMode == "multiple" && Array.isArray(selectedItemsProp)) selectedItems = selectedItemsProp;

    const [expandedNodes, setExpandedNodes] = useState<string[]>(expandedNodesProp);
    const [selectedNodes, setSelectedNodes] = useState<string[]>(selectedItems);
    const [checkedNodes, setCheckedNodes] = useState<string[]>(checkedItemsProp);

    const nodesList: AccentedTreeItemProps[] = [];

    const accentedNodes: string[] = [];

    if (onItemsSelect && !areEqualShallow(selectedItems, selectedNodes)) setSelectedNodes(selectedItems);

    const onCheckedChange = (nodeId: string) => (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const alreadyChecked = checkedNodes.includes(nodeId);
        let newCheckedNodes: string[] | null = null;
        if (checked && !alreadyChecked) newCheckedNodes = [...checkedNodes, nodeId];
        if (!checked && alreadyChecked) newCheckedNodes = checkedNodes.filter((n) => n != nodeId);
        if (newCheckedNodes) {
            fixNodesFullChecking(children, newCheckedNodes, getNodesChanges(checkedNodes, newCheckedNodes));
            setCheckedNodes(newCheckedNodes);
            if (checkedAndSelected) setSelectedNodes(newCheckedNodes);
        }
        if (onItemsChecked && newCheckedNodes) onItemsChecked(nodesList.filter((n) => newCheckedNodes!.includes(n.id)));
        if (onItemsSelect && checkedAndSelected && newCheckedNodes) {
            const newSelectedFinalNodes =
                selectionMode == "single"
                    ? nodesList.find((n) => newCheckedNodes && n.id == newCheckedNodes[0])
                    : nodesList.filter((n) => newCheckedNodes!.includes(n.id));
            if (newSelectedFinalNodes)
                (onItemsSelect as (item: AccentedTreeItemProps | AccentedTreeItemProps[]) => void)(
                    newSelectedFinalNodes
                );
        }
    };

    const isIndeterminateNode = (nodeId: string): boolean | null => {
        const node = nodesList.find((n) => n.id == nodeId);
        if (!node) return null;

        if (node.children && node.children.length) {
            let checked = 0;
            const withChildren: string[] = [];
            node.children.forEach((child) => {
                const isChecked = checkedNodes.includes(child.id);
                if (isChecked) checked++;
                if (child.children?.length) withChildren.push(child.id);
            });
            if (checked != 0 && checked < node.children.length) return true;
            return withChildren.reduce<boolean | null>((acc, cur) => acc || isIndeterminateNode(cur), false);
        }
        return false;
    };

    const generateNode = (item?: AccentedTreeItemProps | AccentedTreeItemProps[], level: number = 0): ReactNode => {
        if (!item) return null;
        if (Array.isArray(item)) return item.map((subItem) => generateNode(subItem, level));
        else {
            nodesList.push(item);
            if ("content" in item) {
                return (
                    <AccentedTreeItem
                        key={item.id}
                        isContentedItem={true}
                        nodeId={item.id}
                        intend={intend}
                        level={level}
                        label={item.content}
                        style={{ "--level": level }}
                    />
                );
            } else {
                const hasChildren = !!(item.children && item.children.length);
                let icon: ReactNode = null;
                if (item.icon || hasChildren) {
                    const expandIcon = hasChildren ? (expandedNodes.includes(item.id) ? openedIcon : closedIcon) : null;
                    if (item.icon || expandIcon)
                        icon = (
                            <>
                                {expandIcon}
                                {checkable && (
                                    <Checkbox
                                        indeterminate={isIndeterminateNode(item.id) === true}
                                        checked={checkedNodes.includes(item.id)}
                                        onChange={onCheckedChange(item.id)}
                                    />
                                )}
                                {item.icon}
                            </>
                        );
                }
                if (item.isAccented) accentedNodes.push(item.id);
                return (
                    <AccentedTreeItem
                        key={item.id}
                        nodeId={item.id}
                        intend={intend}
                        hasIcon={!!item.icon}
                        hasChildren={!!hasChildren}
                        level={level}
                        isAccented={!!item.isAccented}
                        icon={icon}
                        label={item.title}
                        style={{ "--level": level }}
                        TransitionComponent={AccentedTreeItemTransitionComponent}
                    >
                        {generateNode(item.children, level + 1)}
                    </AccentedTreeItem>
                );
            }
        }
    };
    const allowSelect = (nodesIds: string | string[]) => {
        if (Array.isArray(nodesIds)) return true;
        const toggledNode = nodesList.find((n) => n.id == nodesIds);
        return toggledNode && (!toggledNode.children || toggledNode.children.length == 0);
    };
    const allowToggle = (toggledNodes: string[]) => {
        if (selectedNodes.length) {
            for (const selectedNode of selectedNodes) {
                if (
                    expandedNodes.includes(selectedNode)
                        ? !toggledNodes.includes(selectedNode)
                        : toggledNodes.includes(selectedNode)
                )
                    return true;
            }
            for (const accentedNode of accentedNodes) {
                if (
                    expandedNodes.includes(accentedNode)
                        ? !toggledNodes.includes(accentedNode)
                        : toggledNodes.includes(accentedNode)
                )
                    return true;
            }
        }
        return false;
    };
    const onToggleHandler: UseTreeViewExpansionParameters["onNodeToggle"] = (e: React.SyntheticEvent, toggled) => {
        if ((e.target as HTMLElement).closest(".MuiTreeItem-iconContainer .MuiCheckbox-root")) return;
        if (
            (e.target as HTMLElement).closest(".MuiTreeItem-iconContainer") ||
            selectionMode == "disable" ||
            allowToggle(toggled)
        ) {
            if (onToggle) onToggle(e, toggled);
            setExpandedNodes(toggled);
        }
    };

    const onSelect = (e: React.SyntheticEvent, nodeIds: string | string[]) => {
        if (!(e.target as HTMLElement).closest(".MuiTreeItem-iconContainer") || allowSelect(nodeIds)) {
            const newSelectedItems = typeof nodeIds == "string" ? [nodeIds] : nodeIds;
            const newSelectedNodes = nodesList.filter((c) => newSelectedItems.includes(c.id));
            const newFinallySelectedItems: string[] = [];
            let allNodesNotSelectable = true;
            const newFinallyExpandedNodes = [...expandedNodes];
            newSelectedNodes.forEach((n) => {
                if (n && n.notSelectable !== true) {
                    allNodesNotSelectable = false;
                    newFinallySelectedItems.push(n.id);
                } else {
                    if (newFinallyExpandedNodes.includes(n.id))
                        delete newFinallyExpandedNodes[newFinallyExpandedNodes.findIndex((sn) => sn == n.id)];
                    else newFinallyExpandedNodes.push(n.id);
                }
            });
            setExpandedNodes(newFinallyExpandedNodes);
            if (!allNodesNotSelectable) {
                if (checkedAndSelected) {
                    fixNodesFullChecking(
                        children,
                        newFinallySelectedItems,
                        getNodesChanges(selectedItems, newFinallySelectedItems)
                    );
                    setCheckedNodes(newFinallySelectedItems);
                    setSelectedNodes(newFinallySelectedItems);
                } else setSelectedNodes(newFinallySelectedItems);

                if (onItemsSelect) {
                    const newFinallySelectedNodes = nodesList.filter((c) => newFinallySelectedItems.includes(c.id));
                    (onItemsSelect as (item: AccentedTreeItemProps | AccentedTreeItemProps[]) => void)(
                        selectionMode == "single" ? newFinallySelectedNodes[0] : newFinallySelectedNodes
                    );
                }
                if (onItemsChecked) onItemsChecked(nodesList.filter((c) => newFinallySelectedItems.includes(c.id)));
            }
        }
    };
    return (
        <TreeView
            disableSelection={selectionMode == "disable"}
            multiSelect={selectionMode == "multiple"}
            onNodeToggle={onToggleHandler}
            onNodeSelect={onSelect}
            expanded={expandedNodes}
            selected={selectionMode == "single" ? (selectedNodes.length ? selectedNodes[0] : null) : selectedNodes}
            sx={{ userSelect: "none", ...sx }}
        >
            {generateNode(children)}
        </TreeView>
    );
}
