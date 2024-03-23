import { useLanguage } from "@/store/appearanceSlice";
import AboutCategoriesList from "./CategoriesList";
import { Box, useTheme } from "@mui/material";
import { HorizontalPanelButton, HorizontalPanelButtonProps } from "@/components/PanelButtons";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import CloseIcon from "@mui/icons-material/Close";
import AccentedTabs from "@/components/AccentedTabs";
import __ from "@/utilities/transtation";
import React, { NamedExoticComponent, useLayoutEffect, useReducer, useRef, useState } from "react";
import { getThemeColor, useThemeColor } from "@/components/contexts/Theme";
import categories, { AboutCategoriesKeysRecursive, AboutCategoriesType, findCategory } from "./Categories";
import CustomScrollbar from "@/components/Scrollbar";
import { Params, useLocation, useNavigate, useParams } from "react-router-dom";
import AboutBlocksIntegrator from "./BlocksIntegrator";
import { motion } from "framer-motion";

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
            const catBlocks = Object.keys(categories[cat as keyof AboutCategoriesType]["items"]);
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
            newActiveBlock &&
            newActiveBlock != newActiveCat &&
            !Object.keys(categories[newActiveCat as keyof AboutCategoriesType]["items"]).includes(newActiveBlock)
        )
            newActiveBlock = Object.keys(categories[newActiveCat as keyof AboutCategoriesType]["items"])[0];
        setActiveCatAndBlock(newActiveCat, newActiveBlock);
    });

    if (activeCat && !(activeCat in catsBlocksIntegrators)) {
        const integratorCat = activeCat as keyof AboutCategoriesType;
        let isSwitchingRender = true;
        catsBlocksIntegrators[integratorCat] = {
            activeBlock: selectedCat,
            integrator: React.memo(
                ({ cat, block, params }) => {
                    catsBlocksIntegrators[cat]!.activeBlock =
                        block && findCategory(block, categories[cat]["items"]) ? block : null;
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
                                if (!openedCats.includes(item.id)) setOpenedCats([...openedCats, item.id]);
                                setActiveCatAndBlock(
                                    item.id,
                                    catsBlocksIntegrators[item.id as keyof AboutCategoriesType]?.activeBlock ??
                                        "default"
                                );
                            } else {
                                const rootCategory = rootCats.find(
                                    (c) => !!findCategory(item.id, categories[c as keyof AboutCategoriesType].items)
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
            <Box className="grid w-full" sx={{ gridTemplateRows: "auto 1fr" }}>
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
                                catsBlocksIntegrators[String(tab.id) as keyof AboutCategoriesType]?.activeBlock ?? null
                            );
                        }}
                    >
                        {openedCats.map((cat) => ({
                            id: cat,
                            title: `_${__(cat)}`,
                        }))}
                    </AccentedTabs>
                )}{" "}
                <CustomScrollbar right="4.5px" top="4px" bottom="4px">
                    {activeCat && (
                        <Box
                            sx={{
                                display: "grid",
                                position: "relative",
                                padding: "17px 15px 17px 14px",
                            }}
                            ref={blocksIntegratorContainer}
                        >
                            {Object.entries(catsBlocksIntegrators).map(([cat, { integrator: Integrator }]) => (
                                <motion.div
                                    style={{
                                        gridArea: "1/1/1/1",
                                        zIndex: cat == activeCat ? 1 : 0,
                                        background: getThemeColor("layoutBackground", theme),
                                    }}
                                    key={`${cat}-integrator`}
                                    data-id={`${cat}-integrator`}
                                    initial={
                                        Object.keys(catsBlocksIntegrators).length > 1
                                            ? { opacity: 0, clipPath: "circle(75% at 50% -125%)" }
                                            : false
                                    }
                                    animate={{
                                        display: cat == activeCat ? "block" : "none",
                                        opacity: cat == activeCat ? 1 : 0,
                                        clipPath:
                                            cat == activeCat
                                                ? ["circle(75% at 50% -305%)", "circle(75% at 50% 50%)"]
                                                : ["circle(75% at 50% 50%)"],
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        opacity: { duration: cat == activeCat ? 0 : 0.4 },
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
                </CustomScrollbar>
            </Box>
        </Box>
    );
}
