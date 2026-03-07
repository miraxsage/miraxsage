"use client";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import AboutCategoriesList from "./CategoriesList";
import { Alert, Box, useMediaQuery, useTheme } from "@mui/material";
import AccentedTabs from "@/shared/ui/AccentedTabs";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CallIcon from "@mui/icons-material/Call";
import __ from "@/shared/lib/i18n/translation";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import React, { NamedExoticComponent, useContext, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { getThemeColor } from "@/shared/lib/theme";
import categories, {
    AboutCategories,
    AboutCategoriesKeysRecursive,
    AboutCategoriesType,
    AboutContentfulCategories,
    findCategory,
    hasSubcategories,
} from "@/entities/resume/model/categories";
import CustomScrollbar from "@/shared/ui/Scrollbar";
import { usePathname, useParams, useRouter } from "next/navigation";
import AboutBlocksIntegrator from "./BlocksIntegrator";
import { motion } from "framer-motion";
import CustomBreadcrumbs from "@/shared/ui/Breadcrumbs";
import { capitalize } from "@/shared/lib/string";
import { RevealAsideMenuButton } from "@/widgets/layout/RevealAsideMenuButton";
import CategoriesToolbar from "@/shared/ui/CategoriesToolbar";
import PersonalDataIllustration from "./PersonalDataIllustration";
import { alpha } from "@mui/material";
import { CategoryLabelsContext, useVisibleCategories } from "@/entities/resume/model/categoryLabels";

export default function About() {
    const lang = useLanguage();
    const labels = useContext(CategoryLabelsContext);
    const t = useUiLabels();
    const visibleCategories = useVisibleCategories();
    const catLabel = (slug: string) => {
        const entry = labels[slug];
        if (!entry) return __(capitalize(slug));
        return lang.lang === "en" ? entry.label_en : entry.label_ru;
    };
    useEffect(() => {
        document.title = t("Resume") + " | Miraxsage";
    }, [lang.lang]); // eslint-disable-line react-hooks/exhaustive-deps

    const theme = useTheme();

    const rawParams = useParams<{ params?: string[] }>();
    const router = useRouter();
    const pathname = usePathname();
    const params = {
        category: rawParams.params?.[0],
        block: rawParams.params?.[1],
    };

    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    const lessLg = useMediaQuery(theme.breakpoints.down("lg"));
    const lastScreenLessLgRef = useRef(lessLg);
    const catsCollapsedBeforeResizeRef = useRef(false);

    const blocksIntegratorContainer = useRef<HTMLDivElement>();

    type PreIntegratorProps = {
        cat: keyof AboutCategoriesType;
        block: AboutCategoriesKeysRecursive<AboutCategoriesType[keyof AboutCategoriesType]>;
        params: Readonly<{ category?: string; block?: string }>;
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
        (_oldState: string[], newState: string[]) => {
            return Object.keys(categories)
                .map((k) => (newState.includes(k) ? k : false))
                .filter(Boolean) as string[];
        },
        [initialCategory]
    );
    const [activeCat, setActiveCat] = useState<string | null>(initialCategory);
    const [selectedCat, setSelectedCat] = useState<string | null>(initialBlock);
    const [catsCollapsed, setCatsCollapsed] = useState(lessLg);
    const [changeExpandedNodes, setChangeExpandedNodes] = useState<string[] | undefined>();

    const prevParamsRef = useRef(params);

    const setActiveCatAndBlock = (
        cat: string | null,
        block: string | null = "default",
        actualParams?: Readonly<{ category?: string; block?: string }>
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
            router.push(`/about${cat ? `/${cat}${block ? `/${block}` : ``}` : ``}`);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
        if (!pathname.startsWith("/about")) return;
        if (lessLg != lastScreenLessLgRef.current) {
            lastScreenLessLgRef.current = lessLg;
            if (lessLg) {
                catsCollapsedBeforeResizeRef.current = catsCollapsed;
                setCatsCollapsed(true);
            } else setCatsCollapsed(catsCollapsedBeforeResizeRef.current);
        }
        if (lessSm && openedCats.length > 1 && activeCat) {
            setOpenedCats([activeCat]);
        }

        if (changeExpandedNodes) setChangeExpandedNodes(undefined);
        const prevParams = prevParamsRef.current;
        prevParamsRef.current = params;
        const paramsBlockChanged = params.block !== prevParams.block;
        let newActiveCat = params.category ? params.category : activeCat;
        let newActiveBlock = !newActiveCat
            ? null
            : paramsBlockChanged
              ? (params.block ?? null)
              : selectedCat;
        const visibleCatKeys = Object.keys(visibleCategories);
        if (newActiveCat && !visibleCatKeys.includes(newActiveCat)) newActiveCat = visibleCatKeys[0] ?? null;
        if (
            newActiveCat &&
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
                function CategoryIntegrator({ cat, block, params }) {
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
                        ...(lessSm
                            ? []
                            : [
                                  { label: "Miraxsage", link: "/" },
                                  {
                                      label: t("Resume"),
                                      subitems: [
                                          {
                                              label: t("Portfolio"),
                                              icon: <RocketLaunchIcon />,
                                              link: "/projects",
                                          },
                                          {
                                              label: t("Interact"),
                                              icon: <CallIcon />,
                                              link: "/interact",
                                          },
                                      ],
                                  },
                              ]),
                    ];
                    if (activeCat) {
                        items.push({
                            label: catLabel(activeCat),
                            subitems: Object.entries(visibleCategories)
                                .filter(([key]) => key != activeCat)
                                .map(([key, val]) => ({
                                    label: catLabel(key),
                                    icon: val.icon as React.JSX.Element,
                                    link: "/about/" + key,
                                })),
                        });
                        const activeCategory = activeCat as AboutCategories;
                        const visibleSubItems = visibleCategories[activeCategory]?.items ?? {};
                        if (selectedCat && Object.keys(visibleSubItems).length > 0)
                            items.push({
                                label: catLabel(selectedCat),
                                subitems: Object.entries(visibleSubItems)
                                    .filter(([key]) => key != selectedCat)
                                    .map(([key, val]) => ({
                                        label: catLabel(key),
                                        icon: val.icon as React.JSX.Element,
                                        link: "/about/" + activeCategory + "/" + key,
                                    })),
                            });
                    }
                    return items;
                })()}
            </CustomBreadcrumbs>
            <Box
                sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    gridColumn: "span 3",
                }}
            ></Box>
            <Box sx={{ display: "flex", height: "100%", position: "relative", gridColumn: "span 2" }}>
                <motion.div
                    onClick={() => setCatsCollapsed(true)}
                    animate={{
                        opacity: !catsCollapsed && lessLg ? 1 : 0,
                        visibility: !catsCollapsed && lessLg ? "visible" : "collapse",
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                            visibility: { delay: !catsCollapsed ? 0 : 0.3 },
                        },
                    }}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex: 3,
                        background: alpha(getThemeColor("barBackground", theme), 0.8),
                        backdropFilter: "blur(3px)",
                    }}
                ></motion.div>
                <motion.div
                    initial={false}
                    animate={{ maxWidth: catsCollapsed ? "39px" : "230px" }}
                    style={{
                        display: "grid",
                        ...(lessLg
                            ? {
                                  position: lessLg ? "absolute" : "static",
                                  zIndex: 3,
                                  height: "100%",
                              }
                            : {}),
                        gridTemplateRows: "auto minmax(0, 1fr)",
                    }}
                >
                    {lessLg && (
                        <Box
                            sx={{
                                minWidth: "1px",
                                height: "100%",
                                background: theme.palette.divider,
                                position: "absolute",
                                right: "-1px",
                                zIndex: 3,
                            }}
                        ></Box>
                    )}
                    <CategoriesToolbar
                        collapsed={catsCollapsed}
                        onRevealCollapse={(collapse) => setCatsCollapsed(collapse)}
                        onFold={() => {
                            setChangeExpandedNodes([]);
                        }}
                        onUnfold={() => {
                            setChangeExpandedNodes(["biography", "experience", "specifications"]);
                        }}
                        onClose={
                            lessSm
                                ? undefined
                                : () => {
                                      setOpenedCats([]);
                                      setActiveCatAndBlock(null);
                                      if (lessLg) setCatsCollapsed(true);
                                  }
                        }
                        style={{ overflow: "hidden" }}
                    />

                    <CustomScrollbar right="2px" top="2px" bottom="3px">
                        <motion.div
                            initial={false}
                            style={{
                                background: getThemeColor("layoutBackground", theme),
                                overflow: "hidden",
                                minHeight: "100%",
                            }}
                            animate={{
                                maxWidth: catsCollapsed ? "39px" : "230px",
                            }}
                        >
                            <AboutCategoriesList
                                initiallyExpandedNodes={["biography", "experience", "specifications"]}
                                expandedNodes={changeExpandedNodes}
                                intend={catsCollapsed ? "small" : "regular"}
                                selectionMode="single"
                                activeItem={activeCat}
                                selectedItems={selectedCat ?? undefined}
                                onItemsSelect={(item) => {
                                    if (lessLg) setCatsCollapsed(true);
                                    const rootCats = Object.keys(visibleCategories);
                                    if (rootCats.includes(item.id)) {
                                        if (!openedCats.includes(item.id)) setOpenedCats([...openedCats, item.id]);
                                        setActiveCatAndBlock(
                                            item.id,
                                            catsBlocksIntegrators[item.id as keyof AboutCategoriesType]?.activeBlock ??
                                                "default"
                                        );
                                    } else {
                                        const rootCategory = rootCats.find(
                                            (c) =>
                                                !!findCategory(
                                                    item.id,
                                                    categories[c as AboutContentfulCategories].items
                                                )
                                        );
                                        if (rootCategory) {
                                            if (!openedCats.includes(rootCategory))
                                                setOpenedCats([...openedCats, rootCategory]);
                                            setActiveCatAndBlock(rootCategory, item.id);
                                        }
                                    }
                                }}
                                sx={{
                                    "& li": {
                                        whiteSpace: "nowrap",
                                    },
                                }}
                            />
                        </motion.div>
                    </CustomScrollbar>
                </motion.div>
                {lessLg && <Box sx={{ minWidth: "39px", height: "100%" }}></Box>}
                <Box sx={{ height: "100%", backgroundColor: "divider", minWidth: "1px" }} />
                <Box sx={{ display: "grid", width: "100%", gridTemplateRows: "auto minmax(0, 1fr)" }}>
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
                                title: `_${catLabel(cat)}`,
                            }))}
                        </AccentedTabs>
                    )}{" "}
                    {activeCat ? (
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
                                        gridTemplateRows: "minmax(0, 1fr)",
                                    }}
                                    key={`${cat}-integrator`}
                                    data-id={`${cat}-integrator`}
                                    initial={
                                        Object.keys(catsBlocksIntegrators).length > 1
                                            ? { opacity: 1, clipPath: "circle(0% at 50% 25%)" }
                                            : false
                                    }
                                    animate={{
                                        display: cat == activeCat ? "grid" : "none",
                                        clipPath: cat == activeCat
                                            ? "circle(150% at 50% 50%)"
                                            : "circle(0% at 50% 25%)",
                                    }}
                                    transition={{
                                        clipPath: { duration: 0.7, ease: "easeOut" },
                                        display: { delay: cat == activeCat ? 0 : 0.7 },
                                    }}
                                >
                                    <Integrator cat={activeCat as any} block={selectedCat as any} params={params} />
                                </motion.div>
                            ))}
                        </Box>
                    ) : (
                        <CustomScrollbar sx={{ gridRow: "span 2" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "600px",
                                        [theme.breakpoints.down("xl")]: {
                                            width: "400px",
                                        },
                                        [theme.breakpoints.down("lg")]: {
                                            width: "300px",
                                        },
                                    }}
                                >
                                    <PersonalDataIllustration />
                                    <Alert variant="outlined" severity="info" sx={{ marginTop: "20px" }}>
                                        {lang.ru
                                            ? `Выберите один из пунктов анкеты в меню слева чтобы посмотреть что нибудь о моей биографии, опыте, характеристиках или интересных сниппетах`
                                            : `Select an item in the menu on the left to learn something about my biography, experience, characteristics, or interesting snippets.`}
                                    </Alert>
                                </Box>
                            </Box>
                        </CustomScrollbar>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export const Component = About;
