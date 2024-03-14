import { useLanguage } from "@/store/appearanceSlice";
import AboutCategoriesList from "./CategoriesList";
import { Box } from "@mui/material";
import { HorizontalPanelButton, HorizontalPanelButtonProps } from "@/components/PanelButtons";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import CloseIcon from "@mui/icons-material/Close";
import AccentedTabs from "@/components/AccentedTabs";
import __ from "@/utilities/transtation";
import { useLayoutEffect, useReducer, useState } from "react";
import { useThemeColor } from "@/components/contexts/Theme";
import categories, { AboutCategoriesType, findCategory } from "./Categories";
import CustomScrollbar from "@/components/Scrollbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AboutBlocksIntegrator from "./BlocksIntegrator";

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

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const initialCategory = params.category ?? "biography";
    const initialBlock = params.block ?? "initial";

    const [openedCats, setOpenedCats] = useReducer(
        (_oldState: unknown, newState: string[]) =>
            Object.keys(categories)
                .map((k) => (newState.includes(k) ? k : false))
                .filter(Boolean) as string[],
        [initialCategory]
    );
    const [activeCat, setActiveCat] = useState<string | null>(initialCategory);
    const [selectedCat, setSelectedCat] = useState<string | null>(initialBlock);

    const setActiveCatAndBlock = (cat: string | null, block: string | null) => {
        if (cat != activeCat) {
            setActiveCat(cat);
            if (cat ? !openedCats.includes(cat) : openedCats.length) setOpenedCats(!cat ? [] : [...openedCats, cat]);
        }
        if (block != selectedCat) setSelectedCat(block);
        if (cat != params.category || block != params.block)
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
                                setActiveCatAndBlock(item.id, null);
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
                                        : newOpenedCats[activeCatIndex > 0 ? activeCatIndex - 1 : 0],
                                    null
                                );
                        }}
                        onTabSelect={(tab) => {
                            setActiveCatAndBlock(String(tab.id), null);
                        }}
                    >
                        {openedCats.map((cat) => ({
                            id: cat,
                            title: `_${__(cat)}`,
                        }))}
                    </AccentedTabs>
                )}{" "}
                <CustomScrollbar right="4.5px" top="4px" bottom="4px">
                    <Box sx={{ padding: "17px 15px 17px 14px" }}>
                        <AboutBlocksIntegrator
                            category="biography"
                            onSelectedBlockChanged={(newSelectedBlock) =>
                                setActiveCatAndBlock(activeCat, newSelectedBlock)
                            }
                            selectedBlock={
                                (selectedCat ?? undefined) as
                                    | keyof AboutCategoriesType["biography"]["items"]
                                    | undefined
                            }
                        />
                    </Box>
                </CustomScrollbar>
            </Box>
        </Box>
    );
}
