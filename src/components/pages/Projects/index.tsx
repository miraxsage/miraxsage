import CustomBreadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { Box, useTheme } from "@mui/material";
import CustomScrollbar from "@/components/Scrollbar";
import DownIcon from "@mui/icons-material/South";
import UpIcon from "@mui/icons-material/North";
import ProjectFiltersList from "./FiltersList";
import { projects } from "./Projects";
import ProjectCard from "./ProjectCard";
import { getThemeColor } from "@/components/contexts/Theme";
import { useNavigate } from "react-router-dom";
import ProjectsBreadcrumbs from "./ProjectsBreadcrumbs";
import { useAppearance } from "@/store/appearanceSlice";
import { navigateToProjects, projectsOrderItems, useProjectsLocation } from "./projectsNavigation";
import CategoriesToolbar from "@/components/CategoriesToolbar";
import { useEffect, useState } from "react";

export default function Projects() {
    const theme = useTheme();
    const navigate = useNavigate();
    const lang = useAppearance().language;
    const projectsLocation = useProjectsLocation()!;
    const { techs, order, orderDirection } = projectsLocation;
    const orderItem = projectsOrderItems.find((o) => o.slug == order);
    const OrderIcon = orderItem?.icon;

    const [changeExpandedNodes, setChangeExpandedNodes] = useState<string[] | undefined>();

    useEffect(() => {
        if (changeExpandedNodes) setChangeExpandedNodes(undefined);
    }, [changeExpandedNodes]);

    return (
        <Box className="grid h-full" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
            <ProjectsBreadcrumbs />
            <Box className="flex h-full">
                <Box className="grid h-full" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
                    <CategoriesToolbar
                        onFold={() => {
                            setChangeExpandedNodes([]);
                        }}
                        onUnfold={() => {
                            setChangeExpandedNodes(["frontend", "backend", "desktop"]);
                        }}
                    />
                    <CustomScrollbar right="2px" top="2px" bottom="3px">
                        <ProjectFiltersList
                            expandedNodes={changeExpandedNodes}
                            activeItems={techs}
                            onItemsChecked={(checkedProjects) =>
                                navigateToProjects(
                                    navigate,
                                    { techs: checkedProjects.map((p) => p.id) },
                                    projectsLocation
                                )
                            }
                        />
                    </CustomScrollbar>
                </Box>
                <Box className="w-px h-full" sx={{ backgroundColor: "divider" }} />
                <Box
                    className="grid h-full w-full"
                    sx={{
                        gridTemplateRows: "37px auto minmax(0, 1fr)",
                    }}
                >
                    <CustomBreadcrumbs sx={{ margin: "0px 0px 0px 5px", alignSelf: "center" }}>
                        {
                            [
                                {
                                    label: orderItem?.name,
                                    icon: OrderIcon ? (
                                        <Box
                                            sx={{
                                                "& > :first-of-type": {
                                                    position: "relative",
                                                    top: "-1px",
                                                    fontSize: "20px",
                                                },
                                                "& > :last-of-type": {
                                                    fontSize: "18px",
                                                    position: "relative",
                                                    top: "-1px",
                                                },
                                            }}
                                        >
                                            <OrderIcon />
                                            {orderDirection == "desc" ? <DownIcon /> : <UpIcon />}
                                        </Box>
                                    ) : (
                                        <div></div>
                                    ),
                                    onClick: () =>
                                        navigateToProjects(
                                            navigate,
                                            {
                                                orderDirection: orderDirection == "desc" ? "asc" : "desc",
                                            },
                                            projectsLocation
                                        ),
                                    subitems: projectsOrderItems
                                        .filter((o) => o.slug != order)
                                        .map((o) => {
                                            const Icon = o.icon;
                                            return {
                                                label: o.name,
                                                icon: <Icon />,
                                                onClick: (item) =>
                                                    navigateToProjects(
                                                        navigate,
                                                        {
                                                            order:
                                                                item.label == "По наименованию"
                                                                    ? "name"
                                                                    : item.label == "По рейтингу"
                                                                    ? "rating"
                                                                    : "techs",
                                                        },
                                                        projectsLocation
                                                    ),
                                            };
                                        }),
                                },
                            ] as BreadcrumbItem[]
                        }
                    </CustomBreadcrumbs>
                    <Box sx={{ border: `1px solid ${theme.palette.divider}`, borderWidth: "0px 0px 1px 0px" }}></Box>
                    <CustomScrollbar>
                        <Box
                            className="grid w-full"
                            sx={{
                                background: getThemeColor("layoutBackground", theme),
                                gridTemplateColumns: "repeat(3, 380px)",
                                [theme.breakpoints.between("xl", "3xl")]: {
                                    gridTemplateColumns: "repeat(2, 380px)",
                                },
                                [theme.breakpoints.down("xl")]: {
                                    gridTemplateColumns: "380px",
                                },
                                justifyContent: "center",
                                gap: "25px",
                                padding: "25px",
                            }}
                        >
                            {projects
                                .sort((a, b) => {
                                    if (order == "name")
                                        return (
                                            (orderDirection == "desc" ? -1 : 1) *
                                            a.name[lang].localeCompare(b.name[lang])
                                        );
                                    if (order == "rating")
                                        return (orderDirection == "desc" ? -1 : 1) * (a.rating - b.rating);
                                    if (order == "techs")
                                        return (
                                            (orderDirection == "desc" ? -1 : 1) *
                                            (a.technologies.length - b.technologies.length)
                                        );
                                    return 0;
                                })
                                .filter((p) => techs.length == 0 || p.technologies.some((t) => techs.includes(t)))
                                .map((p) => (
                                    <ProjectCard
                                        onClick={() =>
                                            navigateToProjects(navigate, { project: p.slug }, projectsLocation)
                                        }
                                        key={`project-${p.slug}-card`}
                                        project={p}
                                    />
                                ))}
                        </Box>
                    </CustomScrollbar>
                </Box>
            </Box>
        </Box>
    );
}
