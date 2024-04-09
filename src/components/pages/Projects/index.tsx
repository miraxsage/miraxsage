import CustomBreadcrumbs, { BreadcrumbItem } from "@/components/Breadcrumbs";
import { Box, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WebhookIcon from "@mui/icons-material/Webhook";
import StarIcon from "@mui/icons-material/Star";
import CustomScrollbar from "@/components/Scrollbar";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import CloseIcon from "@mui/icons-material/Close";
import DownIcon from "@mui/icons-material/South";
import UpIcon from "@mui/icons-material/North";
import { ToolbarButton } from "@/components/ToolbarButton";
import ProjectFiltersList from "./FiltersList";
import { projects } from "./Projects";
import ProjectCard from "./ProjectCard";
import { getThemeColor } from "@/components/contexts/Theme";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectsBreadcrumbs from "./ProjectsBreadcrumbs";

function Toolbar() {
    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                minWidth: "230px",
                justifyContent: "right",
            }}
            className="flex"
        >
            <ToolbarButton sx={{ paddingLeft: "10.5px", paddingRight: "10.5px" }}>
                <FirstPageIcon />
            </ToolbarButton>
            <ToolbarButton>
                <UnfoldMoreIcon />
            </ToolbarButton>
            <ToolbarButton>
                <UnfoldLessIcon />
            </ToolbarButton>
            <ToolbarButton sx={{ paddingLeft: "11px", paddingRight: "11px" }} dividerSize="collapsed">
                <CloseIcon />
            </ToolbarButton>
        </Box>
    );
}

const orderItems = [
    { slug: "name", name: "По наименованию", icon: PersonIcon },
    { slug: "rating", name: "По рейтингу", icon: StarIcon },
    { slug: "techs", name: "По технологиям", icon: WebhookIcon },
];

export default function Projects() {
    const theme = useTheme();
    const [techFilters, setTechFilters] = useState<string[]>([]);
    const [order, setOrder] = useState<"rating" | "name" | "techs">("rating");
    const [orderDirection, setOrderDirection] = useState<"up" | "down">("down");
    const orderItem = orderItems.find((o) => o.slug == order);
    const OrderIcon = orderItem?.icon;
    const navigate = useNavigate();
    console.log(useLocation().pathname);
    return (
        <Box className="grid h-full" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
            <ProjectsBreadcrumbs />
            <Box className="flex h-full">
                <Box className="grid h-full" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
                    <Toolbar />
                    <CustomScrollbar right="2px" top="2px" bottom="3px">
                        <ProjectFiltersList
                            onItemsChecked={(checkedProjects) => setTechFilters(checkedProjects.map((p) => p.id))}
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
                                            {orderDirection == "down" ? <DownIcon /> : <UpIcon />}
                                        </Box>
                                    ) : (
                                        <div></div>
                                    ),
                                    onClick: () => setOrderDirection((o) => (o == "up" ? "down" : "up")),
                                    subitems: orderItems
                                        .filter((o) => o.slug != order)
                                        .map((o) => {
                                            const Icon = o.icon;
                                            return {
                                                label: o.name,
                                                icon: <Icon />,
                                                onClick: (item) =>
                                                    setOrder(
                                                        item.label == "По наименованию"
                                                            ? "name"
                                                            : item.label == "По рейтингу"
                                                            ? "rating"
                                                            : "techs"
                                                    ),
                                            };
                                        }),
                                },
                            ] as BreadcrumbItem[]
                        }
                    </CustomBreadcrumbs>
                    <Box sx={{ border: `1px solid ${theme.palette.divider}`, borderWidth: "0px 0px 1px 0px" }}></Box>
                    <CustomScrollbar padding="3px">
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
                                        return (orderDirection == "down" ? -1 : 1) * a.name.localeCompare(b.name);
                                    if (order == "rating")
                                        return (orderDirection == "down" ? -1 : 1) * (a.rating - b.rating);
                                    if (order == "techs")
                                        return (
                                            (orderDirection == "down" ? -1 : 1) *
                                            (a.technologies.length - b.technologies.length)
                                        );
                                    return 0;
                                })
                                .filter(
                                    (p) =>
                                        techFilters.length == 0 || p.technologies.some((t) => techFilters.includes(t))
                                )
                                .map((p) => (
                                    <ProjectCard
                                        onClick={() => navigate(`/projects/${p.slug}`)}
                                        key={`project-${p.slug}-card`}
                                        {...p}
                                    />
                                ))}
                        </Box>
                    </CustomScrollbar>
                </Box>
            </Box>
        </Box>
    );
}
