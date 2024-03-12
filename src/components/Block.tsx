import { getThemeColor } from "@/components/contexts/Theme";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import categories, { AboutCategory, findCategory } from "./pages/About/Categories";
import { ReactNode } from "react";
import __ from "@/utilities/transtation";
import { capitalize } from "@/utilities/string";

export type AboutCategoriesKeysRecursive<T extends object, K extends keyof T = keyof T> = T extends {
    icon: unknown;
    items: unknown;
}
    ? T["items"] extends object
        ? AboutCategoriesKeysRecursive<T["items"]>
        : never
    : K extends string
    ? T[K] extends { icon: unknown; items: unknown }
        ? K | AboutCategoriesKeysRecursive<T[K]>
        : K
    : never;

interface AboutBlockProps {
    category: AboutCategoriesKeysRecursive<typeof categories>;
    children: ReactNode;
}

export default function AboutBlock({ category, children }: AboutBlockProps) {
    const theme = useTheme();
    const categoryObj: AboutCategory = findCategory(category);
    return (
        <Box
            className="border rounded-md mb-4"
            sx={{
                borderColor: "divider",
                color: getThemeColor("regularText", theme),
            }}
        >
            <Box
                className="py-2 px-3 flex align-middle gap-3"
                sx={{
                    borderColor: "divider",
                    borderBottomWidth: "1px",
                    background: getThemeColor("titleBg", theme),
                    "& .MuiSvgIcon-root": {
                        fontSize: "22px",
                        color: getThemeColor("regularIcon", theme),
                    },
                }}
            >
                {categoryObj.icon}
                {__(capitalize(category))}
            </Box>
            {children}
        </Box>
    );
}
