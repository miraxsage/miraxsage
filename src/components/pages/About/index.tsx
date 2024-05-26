import { useLanguage } from "@/store/appearanceSlice";
import AboutCategoriesList from "./CategoriesList";
import { Box, useTheme } from "@mui/material";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import CloseIcon from "@mui/icons-material/Close";
import AccentedTabs from "@/components/AccentedTabs";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CallIcon from "@mui/icons-material/Call";
import __ from "@/utilities/transtation";
import React, { NamedExoticComponent, useLayoutEffect, useReducer, useRef, useState } from "react";
import { getThemeColor } from "@/components/contexts/Theme";
import categories, {
    AboutCategories,
    AboutCategoriesKeysRecursive,
    AboutCategoriesType,
    AboutContentfulCategories,
    findCategory,
    hasSubcategories,
} from "./Categories";
import CustomScrollbar from "@/components/Scrollbar";
import { Params, useLocation, useNavigate, useParams } from "react-router-dom";
import AboutBlocksIntegrator from "./BlocksIntegrator";
import { motion } from "framer-motion";
import { ToolbarButton } from "@/components/ToolbarButton";
import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { capitalize } from "@/utilities/string";
import { RevealAsideMenuButton } from "@/components/layout/RevealAsideMenuButton";

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

export default function About() {
    useLanguage();

    const theme = useTheme();

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const blocksIntegratorContainer = useRef<HTMLDivElement>();

    type PreIntegratorProps = {
        cat: keyof AboutCategoriesType;
        block: AboutCategoriesKeysRecursive<AboutCategoriesType[keyof AboutCategoriesType]>;
        params: Readonly<Params<string>>;
    };
    type PreIntegrators = {
        [K in keyof AboutCategoriesType]?: {
            activeBlock: string | null;
            integrator: NamedExoticComponent<PreIntegratorProps>;
        };
    };
    const catsBlocksIntegratorsRef = useRef<PreIntegrators>({});
    const catsBlocksIntegrators = catsBlocksIntegratorsRef.current;

    const initialCategory = params.category ?? "biography";
    const initialBlock = params.block ?? "default";

    const [openedCats, setOpenedCats] = useReducer(
        (_oldState: unknown, newState: string[]) =>
            Object.keys(categories)
                .map((k) => (newState.includes(k) ? k : false))
                .filter(Boolean) as string[],
        [initialCategory]
    );
    const [activeCat, setActiveCat] = useState<string | null>(initialCategory);
    const [selectedCat, setSelectedCat] = useState<string | null>(initialBlock);
    const setActiveCatAndBlock = (
        cat: string | null,
        block: string | null = "default",
        actualParams?: Readonly<Params<string>>
    ) => {
        actualParams = actualParams ?? params;
        if (cat == "current") cat = activeCat;
        if (cat != activeCat) {
            setActiveCat(cat);
            if (cat ? !openedCats.includes(cat) : openedCats.length) setOpenedCats(!cat ? [] : [...openedCats, cat]);
        }
        if (cat) {
            const catBlocks = hasSubcategories(cat as AboutCategories)
                ? Object.keys(categories[cat as AboutContentfulCategories]["items"])
                : [];
            if (block && !catBlocks.includes(block)) block = catBlocks[0];
        }
        if (block != selectedCat) setSelectedCat(block);
        if (cat != actualParams.category || block != actualParams.block)
            navigate(`/about${cat ? `/${cat}${block ? `/${block}` : ``}` : ``}`);
    };

    useLayoutEffect(() => {
        if (!location.pathname.startsWith("/about")) return;
        let newActiveCat = params.category ? params.category : activeCat;
        let newActiveBlock = !newActiveCat ? null : params.block ? params.block : selectedCat;
        if (newActiveCat && !Object.keys(categories).includes(newActiveCat)) newActiveCat = "biography";
        if (
            hasSubcategories(newActiveCat as AboutCategories) &&
            newActiveBlock &&
            newActiveBlock != newActiveCat &&
            !Object.keys(categories[newActiveCat as AboutContentfulCategories]["items"]).includes(newActiveBlock)
        )
            newActiveBlock = Object.keys(categories[newActiveCat as AboutContentfulCategories]["items"])[0];
        setActiveCatAndBlock(newActiveCat, newActiveBlock);
    });

    if (activeCat && !(activeCat in catsBlocksIntegrators)) {
        const integratorCat = activeCat as AboutCategories;
        let isSwitchingRender = true;
        catsBlocksIntegrators[integratorCat] = {
            activeBlock: selectedCat,
            integrator: React.memo(
                ({ cat, block, params }) => {
                    catsBlocksIntegrators[cat]!.activeBlock =
                        block &&
                        hasSubcategories(cat) &&
                        findCategory(block, categories[cat as AboutContentfulCategories]["items"])
                            ? block
                            : null;
                    setTimeout(function () {
                        // use timeout because of React.StrictMode twice render
                        isSwitchingRender = false;
                    });
                    return (
                        <AboutBlocksIntegrator
                            isSwitchingRender={isSwitchingRender}
                            category={cat}
                            selectedBlock={block}
                            onSelectedBlockChanged={(newSelectedBlock) =>
                                setActiveCatAndBlock(cat, newSelectedBlock, params)
                            }
                        />
                    );
                },
                (_oldp, newp) => {
                    if (newp.cat != integratorCat) isSwitchingRender = true;
                    return newp.cat != integratorCat;
                }
            ),
        };
    }

    return (
        <Box
            sx={{
                display: "grid",
                height: "100%",
                gridTemplate: "auto 1px minmax(0, 1fr) / auto minmax(0, 1fr)",
            }}
        >
            <RevealAsideMenuButton />
            <CustomBreadcrumbs sx={{ padding: "6px 8px", margin: 0 }}>
                {(() => {
                    const items = [
                        { label: "Miraxsage", link: "/" },
                        {
                            label: __("About"),
                            subitems: [
                                {
                                    label: __("Profile"),
                                    icon: <AssignmentIndIcon />,
                                    link: "/profile",
                                },
                                {
                                    label: __("Projects"),
                                    icon: <RocketLaunchIcon />,
                                    link: "/projects",
                                },
                                {
                                    label: __("Interact"),
                                    icon: <CallIcon />,
                                    link: "/interact",
                                },
                            ],
                        },
                    ];
                    if (activeCat)
                        items.push({
                            label: __(capitalize(activeCat)),
                            subitems: Object.entries(categories)
                                .filter(([key]) => key != activeCat)
                                .map(([key, val]) => ({
                                    label: __(capitalize(key)),
                                    icon: val.icon,
                                    link: "/about/" + key,
                                })),
                        });
                    const activeCategory = activeCat as AboutCategories;
                    if (selectedCat && hasSubcategories(activeCategory))
                        items.push({
                            label: __(capitalize(selectedCat)),
                            subitems: Object.entries(categories[activeCategory]["items"])
                                .filter(([key]) => key != selectedCat)
                                .map(([key, val]) => ({
                                    label: __(capitalize(key)),
                                    icon: val.icon,
                                    link: "/about/" + activeCategory + "/" + key,
                                })),
                        });
                    return items;
                })()}
            </CustomBreadcrumbs>
            <Box
                sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    gridColumn: "span 2",
                }}
            ></Box>
            <Box className="flex h-full" sx={{ gridColumn: "span 2" }}>
                <Box className="grid" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
                    <Toolbar />
                    <CustomScrollbar right="2px" top="2px" bottom="3px">
                        <AboutCategoriesList
                            intend="double"
                            selectionMode="single"
                            activeItem={activeCat}
                            selectedItems={selectedCat ?? undefined}
                            onItemsSelect={(item) => {
                                const rootCats = Object.keys(categories);
                                if (rootCats.includes(item.id)) {
                                    if (!openedCats.includes(item.id)) setOpenedCats([...openedCats, item.id]);
                                    setActiveCatAndBlock(
                                        item.id,
                                        catsBlocksIntegrators[item.id as keyof AboutCategoriesType]?.activeBlock ??
                                            "default"
                                    );
                                } else {
                                    const rootCategory = rootCats.find(
                                        (c) => !!findCategory(item.id, categories[c as AboutContentfulCategories].items)
                                    );
                                    if (rootCategory) {
                                        if (!openedCats.includes(rootCategory))
                                            setOpenedCats([...openedCats, rootCategory]);
                                        setActiveCatAndBlock(rootCategory, item.id);
                                    }
                                }
                            }}
                        />
                    </CustomScrollbar>
                </Box>
                <Box className="w-px h-full" sx={{ backgroundColor: "divider" }} />
                <Box className="grid w-full" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
                    {!!openedCats.length && (
                        <AccentedTabs
                            size="small"
                            accentMode="primaryStrong"
                            activeTab={activeCat}
                            onTabClose={(tab) => {
                                const activeCatIndex = openedCats.findIndex((c) => c == activeCat);
                                const newOpenedCats = openedCats.filter((c) => c != tab.id);
                                setOpenedCats(newOpenedCats);
                                if (tab.id == activeCat)
                                    setActiveCatAndBlock(
                                        !openedCats.length
                                            ? null
                                            : newOpenedCats[activeCatIndex > 0 ? activeCatIndex - 1 : 0]
                                    );
                            }}
                            onTabSelect={(tab) => {
                                setActiveCatAndBlock(
                                    String(tab.id),
                                    catsBlocksIntegrators[String(tab.id) as keyof AboutCategoriesType]?.activeBlock ??
                                        null
                                );
                            }}
                        >
                            {openedCats.map((cat) => ({
                                id: cat,
                                title: `_${__(cat)}`,
                            }))}
                        </AccentedTabs>
                    )}{" "}
                    {activeCat && (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateRows: "minmax(0, 1fr)",
                                height: "100%",
                            }}
                            ref={blocksIntegratorContainer}
                        >
                            {Object.entries(catsBlocksIntegrators).map(([cat, { integrator: Integrator }]) => (
                                <motion.div
                                    style={{
                                        gridArea: "1/1/1/1",
                                        zIndex: cat == activeCat ? 1 : 0,
                                        background: getThemeColor("layoutBackground", theme),
                                        gridTemplateRows: "auto minmax(0, 1fr)",
                                    }}
                                    key={`${cat}-integrator`}
                                    data-id={`${cat}-integrator`}
                                    initial={
                                        Object.keys(catsBlocksIntegrators).length > 1
                                            ? { opacity: 0, clipPath: "circle(75% at 50% -125%)" }
                                            : false
                                    }
                                    animate={{
                                        display: cat == activeCat ? "grid" : "none",
                                        opacity: cat == activeCat ? 1 : 0,
                                        clipPath:
                                            cat == activeCat
                                                ? [
                                                      "circle(75% at 50% -305%)",
                                                      "circle(75% at 50% 50%)",
                                                      "circle(1000% at 50% 50%)",
                                                  ]
                                                : [
                                                      "circle(1000% at 50% 50%)",
                                                      "circle(1000% at 50% 50%)",
                                                      "circle(1000% at 50% 50%)",
                                                  ],
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        clipPath: { duration: 0.5, times: [0, 0.99, 1] },
                                        opacity: { duration: cat == activeCat ? 0 : 0.4, delay: 0.1 },
                                        display: { delay: cat == activeCat ? 0 : 0.4 },
                                    }}
                                >
                                    {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        <Integrator cat={activeCat as any} block={selectedCat as any} params={params} />
                                    }
                                </motion.div>
                            ))}
                        </Box>
                    )}
                    {/* </CustomScrollbar> */}
                </Box>
            </Box>
        </Box>
    );
}
