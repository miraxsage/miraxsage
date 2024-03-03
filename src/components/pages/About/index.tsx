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
import CloseIcon from "@mui/icons-material/Close";
import AccentedTabs from "@/components/AccentedTabs";
import __ from "@/utilities/transtation";
import { useReducer, useState } from "react";
import { useThemeColor } from "@/components/contexts/Theme";
import categories, { findCategory } from "./Categories";
import AboutBlock from "./Blocks/Block";
import AboutGeneralBlock from "./Blocks/General";

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
    const [openedCats, setOpenedCats] = useReducer(
        (_oldState: unknown, newState: string[]) =>
            Object.keys(categories)
                .map((k) => (newState.includes(k) ? k : false))
                .filter(Boolean) as string[],
        ["biography"]
    );
    const [activeCat, setActiveCatState] = useState<string | null>("biography");
    const [selectedCat, setSelectedCat] = useState<string | null>("biography");
    const setActiveCat = (cat: string | null) => {
        setActiveCatState(cat);
        if (!cat) setSelectedCat(null);
        else if (
            !findCategory(
                selectedCat ?? "",
                categories[cat as keyof typeof categories].items
            )
        )
            setSelectedCat(cat);
    };

    return (
        <Box
            className="grid h-full"
            sx={{ gridTemplateColumns: "auto 1px 1fr" }}
        >
            <Box className="grid" sx={{ gridTemplateRows: "auto 1fr" }}>
                <Toolbar />
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
                                        categories[c as keyof typeof categories]
                                            .items
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
            </Box>
            <Box className="w-px h-full" sx={{ backgroundColor: "divider" }} />
            <div>
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
                )}
                <div className="px-[15px] py-[17px]">
                    <AboutBlock category="general">
                        <AboutGeneralBlock />
                    </AboutBlock>
                    <AboutBlock category="education">Education</AboutBlock>
                    <AboutBlock category="labor">Labor</AboutBlock>
                    <AboutBlock category="questionaire">
                        Questionaire
                    </AboutBlock>
                </div>
            </div>
        </Box>
    );
}
