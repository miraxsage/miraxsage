import { useLanguage } from "@/store/appearanceSlice";
import AboutCategoriesList from "./CategoriesList";
import { Box } from "@mui/material";
import {
    HorizontalPanelButton,
    HorizontalPanelButtonProps,
} from "@/components/PanelButtons";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import AccentedTabs from "@/components/AccentedTabs";
import __ from "@/utilities/transtation";
import { useLayoutEffect, useReducer, useState } from "react";
import { useThemeColor } from "@/components/contexts/Theme";
import categories, { findCategory } from "./Categories";
import AboutBlock from "./Blocks/Block";
import AboutGeneralBlock from "./Blocks/General";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { capitalize } from "@/utilities/string";
import CustomScrollbar from "@/components/Scrollbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const profileIcon = <AssignmentIndIcon />;
const projectsIcon = <RocketLaunchIcon />;
const contactIcon = <CallIcon />;

function ToolbarButton({ children, sx, ...props }: HorizontalPanelButtonProps) {
    return (
        <HorizontalPanelButton
            dividerSize="squeezed"
            iconMode={true}
            sx={{
                padding: "8.2px 10.5px",
                "&:hover": {
                    background: useThemeColor("regularHoverBg"),
                },
                ...sx,
            }}
            iconSize="regular"
            {...props}
        >
            {children}
        </HorizontalPanelButton>
    );
}

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
            <ToolbarButton
                sx={{ paddingLeft: "10.5px", paddingRight: "10.5px" }}
            >
                <FirstPageIcon />
            </ToolbarButton>
            <ToolbarButton>
                <UnfoldMoreIcon />
            </ToolbarButton>
            <ToolbarButton>
                <UnfoldLessIcon />
            </ToolbarButton>
            <ToolbarButton
                sx={{ paddingLeft: "11px", paddingRight: "11px" }}
                dividerSize="collapsed"
            >
                <CloseIcon />
            </ToolbarButton>
        </Box>
    );
}

export default function About() {
    useLanguage();

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const initialCategory = params.category ?? "biography";

    const [openedCats, setOpenedCats] = useReducer(
        (_oldState: unknown, newState: string[]) =>
            Object.keys(categories)
                .map((k) => (newState.includes(k) ? k : false))
                .filter(Boolean) as string[],
        [initialCategory]
    );
    const [activeCat, setActiveCatState] = useState<string | null>(
        initialCategory
    );
    const [selectedCat, setSelectedCat] = useState<string | null>(
        initialCategory
    );

    const setActiveCat = (cat: string | null) => {
        if (cat != activeCat) {
            setActiveCatState(cat);
            if (!cat) setSelectedCat(null);
            else if (
                !findCategory(
                    selectedCat ?? "",
                    categories[cat as keyof typeof categories].items
                )
            )
                setSelectedCat(cat);
            if (cat ? !openedCats.includes(cat) : openedCats.length)
                setOpenedCats(!cat ? [] : [...openedCats, cat]);
        }
        if (cat != params.category) navigate(`/about${cat ? `/${cat}` : ``}`);
    };

    useLayoutEffect(() => {
        if (!location.pathname.startsWith("/about")) return;
        let newActiveCat = params.category ? params.category : activeCat;
        if (
            newActiveCat &&
            !newActiveCat.match(
                /^(biography|experience|specifications|snippets)$/
            )
        )
            newActiveCat = "biography";
        setActiveCat(newActiveCat);
    });

    return (
        <Box className="flex h-full">
            <Box className="grid" sx={{ gridTemplateRows: "auto 1fr" }}>
                <Toolbar />
                <CustomScrollbar right="4px" top="2px" bottom="3px">
                    <AboutCategoriesList
                        intend="double"
                        activeItem={activeCat}
                        selectedItem={selectedCat}
                        onItemSelect={(item) => {
                            const rootCats = Object.keys(categories);
                            if (rootCats.includes(item.id)) {
                                if (!openedCats.includes(item.id))
                                    setOpenedCats([...openedCats, item.id]);
                                setActiveCat(item.id);
                            } else {
                                const rootCategory = rootCats.find(
                                    (c) =>
                                        !!findCategory(
                                            item.id,
                                            categories[
                                                c as keyof typeof categories
                                            ].items
                                        )
                                );
                                if (rootCategory) {
                                    setActiveCat(rootCategory);
                                    if (!openedCats.includes(rootCategory))
                                        setOpenedCats([
                                            ...openedCats,
                                            rootCategory,
                                        ]);
                                }
                            }
                            setSelectedCat(item.id);
                        }}
                    />
                </CustomScrollbar>
            </Box>
            <Box className="w-px h-full" sx={{ backgroundColor: "divider" }} />
            <Box className="grid w-full" sx={{ gridTemplateRows: "auto 1fr" }}>
                {!!openedCats.length && (
                    <AccentedTabs
                        size="small"
                        accentMode="primaryStrong"
                        activeTab={activeCat}
                        onTabClose={(tab) => {
                            const activeCatIndex = openedCats.findIndex(
                                (c) => c == activeCat
                            );
                            const newOpenedCats = openedCats.filter(
                                (c) => c != tab.id
                            );
                            setOpenedCats(newOpenedCats);
                            if (tab.id == activeCat)
                                setActiveCat(
                                    !openedCats.length
                                        ? null
                                        : newOpenedCats[
                                              activeCatIndex > 0
                                                  ? activeCatIndex - 1
                                                  : 0
                                          ]
                                );
                        }}
                        onTabSelect={(tab) => {
                            setActiveCat(String(tab.id));
                        }}
                    >
                        {openedCats.map((cat) => ({
                            id: cat,
                            title: `_${__(cat)}`,
                        }))}
                    </AccentedTabs>
                )}{" "}
                <CustomScrollbar right="5px" top="3px" bottom="3px">
                    <Box sx={{ padding: "17px 15px 17px 14px" }}>
                        <CustomBreadcrumbs>
                            {[
                                { label: "Miraxsage", link: "/" },
                                {
                                    label: __("About"),
                                    subitems: [
                                        {
                                            label: __("Profile"),
                                            icon: profileIcon,
                                            link: "/profile",
                                        },
                                        {
                                            label: __("Projects"),
                                            icon: projectsIcon,
                                            link: "/projects",
                                        },
                                        {
                                            label: __("Interact"),
                                            icon: contactIcon,
                                            link: "/interact",
                                        },
                                    ],
                                },
                            ].concat(
                                !activeCat
                                    ? []
                                    : {
                                          label: __(capitalize(activeCat)),
                                          subitems: Object.entries(categories)
                                              .filter(
                                                  ([key]) => key != activeCat
                                              )
                                              .map(([key, val]) => ({
                                                  label: __(capitalize(key)),
                                                  icon: val.icon,
                                                  link: "/about/" + key,
                                              })),
                                      }
                            )}
                        </CustomBreadcrumbs>
                        <AboutBlock category="general">
                            <AboutGeneralBlock />
                        </AboutBlock>
                        <AboutBlock category="education">Education</AboutBlock>
                        <AboutBlock category="labor">Labor</AboutBlock>
                        <AboutBlock category="questionaire">
                            Questionaire
                        </AboutBlock>
                    </Box>
                </CustomScrollbar>
            </Box>
        </Box>
    );
}
