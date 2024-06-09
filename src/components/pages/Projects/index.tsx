import CustomBreadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { Box, alpha, useMediaQuery, useTheme } from "@mui/material";
import CustomScrollbar from "@/components/Scrollbar";
import DownIcon from "@mui/icons-material/South";
import UpIcon from "@mui/icons-material/North";
import ProjectFiltersList from "./FiltersList";
import { motion } from "framer-motion";
import { projects } from "./Projects";
import ProjectCard from "./ProjectCard";
import { getThemeColor } from "@/components/contexts/Theme";
import { useNavigate } from "react-router-dom";
import ProjectsBreadcrumbs from "./ProjectsBreadcrumbs";
import { useAppearance } from "@/store/appearanceSlice";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { navigateToProjects, projectsOrderItems, useProjectsLocation } from "./projectsNavigation";
import CategoriesToolbar from "@/components/CategoriesToolbar";
import { useEffect, useState } from "react";
import { ToolbarButton } from "@/components/ToolbarButton";

export default function Projects() {
    const theme = useTheme();
    const navigate = useNavigate();
    const lang = useAppearance().language;
    const projectsLocation = useProjectsLocation()!;
    const { techs, order, orderDirection } = projectsLocation;
    const orderItem = projectsOrderItems.find((o) => o.slug == order);
    const OrderIcon = orderItem?.icon;
    const lessMd = useMediaQuery(theme.breakpoints.down("md"));
    const lessLg = useMediaQuery(theme.breakpoints.down("lg"));

    const [changeExpandedNodes, setChangeExpandedNodes] = useState<string[] | undefined>();
    const [filterMenuShown, setFilterMenuShown] = useState(false);

    useEffect(() => {
        if (changeExpandedNodes) setChangeExpandedNodes(undefined);
    }, [changeExpandedNodes]);

    return (
        <Box
            className="grid h-full"
            sx={{ gridTemplateRows: "auto minmax(0, 1fr)", gridTemplateColumns: "minmax(0, 1fr)" }}
        >
            {!lessMd ? <ProjectsBreadcrumbs /> : <div></div>}
            <Box
                sx={{
                    display: "grid",
                    position: "relative",
                    height: "100%",
                    gridTemplate: "minmax(0, 1fr) / 250px 1px minmax(0, 1fr)",
                    [theme.breakpoints.down("lg")]: {
                        gridTemplate: "minmax(0, 1fr) / minmax(0, 1fr)",
                    },
                }}
            >
                <motion.div
                    onClick={() => setFilterMenuShown(false)}
                    animate={{
                        opacity: filterMenuShown ? 1 : 0,
                        visibility: filterMenuShown ? "visible" : "collapse",
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                            visibility: { delay: filterMenuShown ? 0 : 0.3 },
                        },
                    }}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                        background: alpha(getThemeColor("barBackground", theme), 0.8),
                        backdropFilter: "blur(3px)",
                    }}
                ></motion.div>
                <motion.div
                    className="grid h-full"
                    initial={false}
                    animate={{ width: lessLg && !filterMenuShown ? "0px" : "250px" }}
                    style={{
                        gridTemplate: "auto minmax(0, 1fr) / minmax(0, 1fr)",
                        overflow: "hidden",
                        ...(lessLg
                            ? {
                                  position: "absolute",
                                  zIndex: 1,
                                  background: getThemeColor("layoutBackground", theme),
                                  borderRight: lessMd || filterMenuShown ? `1px solid ${theme.palette.divider}` : 0,
                              }
                            : {}),
                    }}
                >
                    <CategoriesToolbar
                        onFold={() => {
                            setChangeExpandedNodes([]);
                        }}
                        onUnfold={() => {
                            setChangeExpandedNodes(["frontend", "backend", "desktop"]);
                        }}
                        onFilter={lessLg ? () => setFilterMenuShown(false) : undefined}
                        onFilterClear={() => navigateToProjects(navigate, { techs: [] }, projectsLocation)}
                    />
                    <CustomScrollbar right="2px" top="2px" bottom="3px">
                        <ProjectFiltersList
                            expandedNodes={changeExpandedNodes}
                            selectedItems={techs}
                            onItemsChecked={(checkedProjects) =>
                                navigateToProjects(
                                    navigate,
                                    { techs: checkedProjects.map((p) => p.id) },
                                    projectsLocation
                                )
                            }
                        />
                    </CustomScrollbar>
                </motion.div>
                {!lessLg && <Box className="h-full" sx={{ backgroundColor: "divider", minWidth: "1px" }} />}
                <Box
                    className="grid h-full w-full"
                    sx={{
                        gridTemplateRows: "37px auto minmax(0, 1fr)",
                    }}
                >
                    <Box className="flex">
                        {lessLg && (
                            <ToolbarButton
                                onClick={() => {
                                    setFilterMenuShown(true);
                                }}
                                dividerSide="right"
                                dividerSize="full"
                                sx={{
                                    ...(techs.length == 0
                                        ? {}
                                        : {
                                              backgroundColor: getThemeColor("accentedBg", theme) + " !important",
                                              color: theme.palette.primary.main,
                                              "&:hover": {
                                                  backgroundColor:
                                                      getThemeColor("accentedHoverBg", theme) + " !important",
                                                  color: theme.palette.primary.main,
                                              },
                                          }),
                                }}
                            >
                                <FilterAltIcon />
                            </ToolbarButton>
                        )}
                        <CustomBreadcrumbs sx={{ margin: "0px 0px 0px 5px", alignSelf: "center" }}>
                            {
                                [
                                    {
                                        label: orderItem?.name[lang],
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
                                                    label: o.name[lang],
                                                    icon: <Icon />,
                                                    onClick: (item) =>
                                                        navigateToProjects(
                                                            navigate,
                                                            {
                                                                order:
                                                                    item.label ==
                                                                    (lang == "ru" ? "По наименованию" : "By name")
                                                                        ? "name"
                                                                        : item.label ==
                                                                          (lang == "ru" ? "По рейтингу" : "By rating")
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
                    </Box>
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
                                [theme.breakpoints.down("lg")]: {
                                    padding: "20px",
                                },
                                "@media (max-width: 450px)": {
                                    padding: "15px",
                                    gridTemplateColumns: "340px",
                                },
                                "@media (max-width: 375px)": {
                                    padding: "15px",
                                    gridTemplateColumns: "330px",
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
