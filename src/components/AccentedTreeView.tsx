import { TreeItem, TreeView } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CSSProperties, ReactNode, useState } from "react";
import { UseTreeViewExpansionParameters } from "@mui/x-tree-view/internals/plugins/useTreeViewExpansion";
import { Collapse, styled } from "@mui/material";
import { motion } from "framer-motion";
import { getThemeColor } from "./contexts/Theme";
import { TransitionProps } from "@mui/material/transitions";
import { TreeItemProps } from "@mui/x-tree-view/TreeItem";

declare module "@mui/x-tree-view" {
    interface TreeItemProps {
        style?: (CSSProperties & { "--level": number }) | undefined;
    }
}

export interface AccentedTreeItemProps {
    id: string;
    title: string;
    icon?: ReactNode;
    accented?: boolean;
    children?: AccentedTreeItemProps[];
}

export interface AccentedTreeViewProps {
    children: AccentedTreeItemProps[];
}

const openedIcon = <ExpandMoreIcon />;
const closedIcon = <ChevronRightIcon />;

// react made us to make this wrapper, couse he doesn`t have any imagination about StyledTreeItemProps and give annoying warnings
function TreeItemStyledWrapper(props: TreeItemProps & StyledTreeItemProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const treeProps: any = { ...props };
    ["level", "accented", "hasIcon", "hasChildren"].forEach(
        (p) => delete treeProps[p]
    );
    return <TreeItem {...treeProps} />;
}

interface StyledTreeItemProps {
    level: number;
    accented: boolean;
    hasIcon: boolean;
    hasChildren: boolean;
}

const AccentedTreeItem = styled(TreeItemStyledWrapper)<StyledTreeItemProps>(
    ({ theme, level, accented, hasIcon, hasChildren }) => ({
        position: "relative",
        color: getThemeColor("regularText", theme),
        "& .MuiTreeItem-content": {
            transition: "color 0.25s, background 0.15s",
            position: "relative",
            zIndex: "calc(var(--level) + 1)",
            padding: "3px 8px",
            paddingLeft:
                "calc(12px * var(--level) + 10px * var(--level) - 6px)",
        },
        "&:before": {
            content: '""',
            display: "block",
            height: "1px",
            width: level > 0 ? "10px" : "0px",
            position: "absolute",
            backgroundColor: theme.palette.divider,
            top: "16px",
            left: "calc(12px * var(--level) + 10px * var(--level) - 6px)",
        },
        "& > .MuiTreeItem-content .MuiTreeItem-iconContainer": {
            width: "auto",
            marginLeft:
                level > 0 ? (hasIcon || hasChildren ? "10px" : "3px") : "4px",
            marginRight: "0px",
            paddingLeft: "2px",
            paddingRight: !hasIcon && hasChildren ? "0px" : "3px",
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
        ...(accented
            ? {
                  "& > .MuiTreeItem-content:after": {
                      content: '""',
                      display: "block",
                      background: getThemeColor("secondaryHoverText", theme),
                      width: "3px",
                      height: "100%",
                      position: "absolute",
                      right: 0,
                  },
                  "& > .MuiTreeItem-group:after": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      top: 0,
                      right: 0,
                      backgroundColor: getThemeColor(
                          "secondaryHoverText",
                          theme
                      ),
                  },
              }
            : {}),
        [`& .MuiTreeItem-content.Mui-selected, 
                          & .MuiTreeItem-content.Mui-focused, 
                          & .MuiTreeItem-content.Mui-selected.Mui-focused
                        ${accented ? ", & > .MuiTreeItem-content" : ""}`]: {
            color: getThemeColor(
                accented ? "secondaryHoverText" : "accentedHoverText",
                theme
            ),
            background: getThemeColor(
                accented ? "secondaryBg" : "accentedBg",
                theme
            ),
        },
        [`& .MuiTreeItem-content.Mui-selected:hover, 
                          & .MuiTreeItem-content.Mui-focused:hover`]: {
            background: getThemeColor(
                accented ? "secondaryHoverBg" : "accentedHoverBg",
                theme
            ),
        },
        "& .MuiTreeItem-content:hover": {
            background: getThemeColor(
                accented ? "secondaryHoverBg" : "regularHoverBg",
                theme
            ),
        },
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
            left: "calc(12px * (var(--level) + 1) + 10px * var(--level) + 3px)",
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

export default function AccentedTreeView({ children }: AccentedTreeViewProps) {
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
    const generateNode = (
        item?: AccentedTreeItemProps | AccentedTreeItemProps[],
        level: number = 0
    ): ReactNode => {
        if (!item) return null;
        if (Array.isArray(item))
            return item.map((subItem) => generateNode(subItem, level));
        else {
            const hasChildren = item.children && item.children.length;
            let icon: ReactNode = null;
            if (item.icon || hasChildren) {
                const expandIcon = hasChildren
                    ? expandedNodes.includes(item.id)
                        ? openedIcon
                        : closedIcon
                    : null;
                if (item.icon || expandIcon)
                    icon = (
                        <>
                            {expandIcon}
                            {item.icon}
                        </>
                    );
            }
            return (
                <AccentedTreeItem
                    key={item.id}
                    nodeId={item.id}
                    hasIcon={!!item.icon}
                    hasChildren={!!hasChildren}
                    level={level}
                    accented={!!item.accented}
                    icon={icon}
                    label={item.title}
                    style={{ "--level": level }}
                    TransitionComponent={AccentedTreeItemTransitionComponent}
                >
                    {generateNode(item.children, level + 1)}
                </AccentedTreeItem>
            );
        }
    };
    const onToggle: UseTreeViewExpansionParameters["onNodeToggle"] = (
        e: React.SyntheticEvent,
        toggled
    ) => {
        if ((e.target as HTMLElement).closest(".MuiTreeItem-iconContainer"))
            setExpandedNodes(toggled);
    };
    return (
        <TreeView
            onNodeToggle={onToggle}
            expanded={expandedNodes}
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {generateNode(children)}
        </TreeView>
    );
}
