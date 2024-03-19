import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CSSProperties, ReactNode, useState } from "react";
import { UseTreeViewExpansionParameters } from "@mui/x-tree-view/internals/plugins/useTreeViewExpansion";
import { Collapse, styled } from "@mui/material";
import { motion } from "framer-motion";
import { getThemeColor } from "./contexts/Theme";
import { TransitionProps } from "@mui/material/transitions";

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
    children?: AccentedTreeItemProps[];
};
export type AccentedContentedTreeItemProps = {
    content: ReactNode;
    id: string;
    title?: never;
    icon?: never;
    isAccented?: never;
    children?: never;
};
export type AccentedTreeItemProps = AccentedContentedTreeItemProps | AccentedTextTreeItemProps;

export interface AccentedTreeViewProps {
    children: AccentedTreeItemProps[];
    expandedNodes?: string[];
    disableSelection?: boolean;
    selectedItem?: string | null;
    intend?: "regular" | "double";
    onItemSelect?: (item: AccentedTreeItemProps) => void;
}

const openedIcon = <ExpandMoreIcon />;
const closedIcon = <ChevronRightIcon />;

interface StyledTreeItemProps {
    level: number;
    isAccented?: boolean;
    isContentedItem?: boolean;
    hasIcon?: boolean;
    hasChildren?: boolean;
    intend: "regular" | "double";
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
    }) => ({
        position: "relative",
        color: getThemeColor("regularText", theme),
        "& .MuiTreeItem-content": {
            transition: "color 0.25s, background 0.15s",
            position: "relative",
            zIndex: "calc(var(--level) + 1)",
            padding: isContentedItem ? "0px" : "3px 8px",
            paddingLeft: `calc(${intend == "double" ? 34 : 12}px * var(--level) + 10px * var(--level) - 6px)`,
        },
        "&:before": {
            content: '""',
            display: "block",
            height: "1px",
            width: level > 0 ? (isContentedItem ? "14px" : "10px") : "0px",
            position: "absolute",
            backgroundColor: theme.palette.divider,
            top: isContentedItem ? "50%" : "16px",
            left: `calc(${intend == "double" ? 34 : 12}px * var(--level) + 10px * var(--level) - 6px)`,
        },
        "&:last-child:before": {
            height: isContentedItem ? "50%" : "calc(100% - 16px)",
            borderColor: theme.palette.divider,
            backgroundColor: getThemeColor("layoutBackground", theme),
            borderWidth: "1px 0px 0px 0px",
            top: isContentedItem ? "50%" : "16px",
            left: `calc(${intend == "double" ? 34 : 12}px * var(--level) + 10px * var(--level) - 7px)`,
            zIndex: "var(--level)",
        },
        "& > .MuiTreeItem-content .MuiTreeItem-iconContainer": {
            width: "auto",
            marginLeft: level > 0 ? (hasIcon || hasChildren ? "10px" : "3px") : "4px",
            marginRight: "0px",
            paddingLeft: "2px",
            paddingRight: !hasIcon && hasChildren ? "0px" : "3px",
        },
        "& > .MuiTreeItem-content:not(.Mui-selected) .MuiTreeItem-iconContainer": {
            color: isAccented ? "inherit" : getThemeColor("regularIcon", theme),
        },
        "& .MuiTreeItem-content .MuiTreeItem-iconContainer > * + *": {
            marginLeft: "3px",
        },
        "& .MuiTreeItem-content .MuiTreeItem-iconContainer svg": {
            fontSize: "19px",
        },
        "& .MuiTreeItem-content .MuiTreeItem-label": {
            paddingLeft: "5px",
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
            left: `calc(${intend == "double" ? 34 : 12}px * (var(--level) + 1) + 10px * var(--level) + 3px)`,
            backgroundColor: theme.palette.divider,
            zIndex: "var(--level)",
        },
    })
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

export default function AccentedTreeView({
    children,
    selectedItem,
    expandedNodes: expandedNodesProp,
    disableSelection,
    onItemSelect,
    intend = "regular",
}: AccentedTreeViewProps) {
    const [expandedNodes, setExpandedNodes] = useState<string[]>(expandedNodesProp ?? []);
    const [selectedNode, setSelectedNode] = useState<string | null>(selectedItem || null);

    const nodesList: AccentedTreeItemProps[] = [];

    const accentedNodes: string[] = [];

    if (selectedItem !== undefined && selectedItem != selectedNode) setSelectedNode(selectedItem);

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
    const toggledNodeIsExpanded = (toggledNodes: string[]) => {
        if (selectedNode) {
            if (
                expandedNodes.includes(selectedNode)
                    ? !toggledNodes.includes(selectedNode)
                    : toggledNodes.includes(selectedNode)
            )
                return true;
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
    const onToggle: UseTreeViewExpansionParameters["onNodeToggle"] = (e: React.SyntheticEvent, toggled) => {
        if (
            (e.target as HTMLElement).closest(".MuiTreeItem-iconContainer") ||
            disableSelection ||
            toggledNodeIsExpanded(toggled)
        )
            setExpandedNodes(toggled);
    };

    const onSelect = (e: React.SyntheticEvent, nodeIds: string) => {
        if (!(e.target as HTMLElement).closest(".MuiTreeItem-iconContainer")) {
            setSelectedNode(nodeIds);
            if (onItemSelect) onItemSelect(nodesList.find((c) => c.id == nodeIds)!);
        }
    };
    return (
        <TreeView
            disableSelection={!!disableSelection}
            onNodeToggle={onToggle}
            onNodeSelect={onSelect}
            expanded={expandedNodes}
            selected={selectedNode}
            sx={{ userSelect: "none" }}
        >
            {generateNode(children)}
        </TreeView>
    );
}
