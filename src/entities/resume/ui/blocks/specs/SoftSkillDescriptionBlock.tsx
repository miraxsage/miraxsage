"use client";
import { getThemeColor } from "@/shared/lib/theme";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { ReactNode, useState } from "react";
import { CustomChip } from "@/shared/ui/Chip";
import GrowingMetricIcon from "@/shared/icons/GrowingMetricIcon";
import BarChartIcon from "@mui/icons-material/BarChart";
import AverageMetricIcon from "@/shared/icons/AverageMetricIcon";
import { useColorMode, useLanguage } from "@/shared/lib/store/appearanceSlice";

type SoftSkillDescriptionBlockProps = {
    label: string;
    description: { ru: string; en: string };
    number: number;
} & DiagrammProps;

type DiagrammProps = {
    icon: ReactNode;
    level: number;
    totalLevel: number;
    averagePercent: number;
    levelPercent: number;
    accentedElement?: "total" | "average" | "level";
};

function Diagramm({ icon, level, totalLevel, averagePercent, levelPercent, accentedElement }: DiagrammProps) {
    const theme = useTheme();
    const isDark = useColorMode().dark;
    const primaryColor = isDark ? theme.palette.primary.main : theme.palette.primary.dark;
    const secondaryColor = !isDark
        ? theme.palette.secondary.dark
        : accentedElement == "average"
        ? theme.palette.secondary.light
        : theme.palette.secondary.main;
    const dividerColor = theme.palette.divider;
    const totalToColor = getThemeColor("regularText", theme);
    const totalFromColor = accentedElement == "total" ? totalToColor : dividerColor;
    const averageFromColor = accentedElement == "average" ? secondaryColor : dividerColor;
    const averageToColor = secondaryColor;
    const levelFromColor = accentedElement == "level" ? primaryColor : dividerColor;
    const levelToColor = primaryColor;
    const totalPercent = totalLevel > 0 ? Math.round((100 * level) / totalLevel) : 0;
    return (
        <div className="pt-3 pr-3 pb-3 flex flex-wrap">
            <div className="flex self-center h-full max-h-24">
                <Box
                    sx={{
                        width: "2px",
                        marginRight: "5px",
                        transition: "all 0.2s",
                        backgroundImage: `linear-gradient(transparent 0%, transparent ${
                            100 - totalPercent
                        }%, ${totalToColor} ${100 - totalPercent}%, ${totalFromColor} 100%)`,
                    }}
                ></Box>
                <Box
                    sx={{
                        width: "2px",
                        marginRight: "5px",
                        backgroundImage: `linear-gradient(transparent 0%, transparent ${
                            100 - averagePercent
                        }%, ${averageToColor} ${100 - averagePercent}%, ${averageFromColor} 100%)`,
                    }}
                ></Box>
                <Box
                    sx={{
                        width: "2px",
                        transition: "all 0.2s",
                        marginRight: "10px",
                        backgroundImage: `linear-gradient(transparent 0%, transparent ${
                            100 - levelPercent
                        }%, ${levelToColor} ${100 - levelPercent}%, ${levelFromColor} 100%)`,
                    }}
                ></Box>
            </div>
            <Box
                sx={{
                    borderRadius: "50%",
                    padding: "2px",
                    alignSelf: "center",
                    backgroundImage: `conic-gradient(from 0deg, ${averageFromColor} 0%, ${averageToColor} ${averagePercent}%, transparent ${averagePercent}%)`,
                }}
            >
                <Box
                    sx={{
                        borderRadius: "50%",
                        padding: "3px",
                        background: getThemeColor("layoutBackground", theme),
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: "50%",
                            padding: "2px",
                            backgroundImage: `conic-gradient(from 0deg, ${levelFromColor} 0%, ${levelToColor} ${levelPercent}%, transparent ${levelPercent}%)`,
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: "50%",
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: getThemeColor("layoutBackground", theme),
                                "& .MuiSvgIcon-root": {
                                    width: "42px",
                                    height: "42px",
                                    margin: "16px",
                                    color: getThemeColor("regularIcon", theme),
                                },
                            }}
                        >
                            {icon}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

const MetricChip = styled(CustomChip)<{ "data-kind": "total" | "average" | "level" }>(
    ({ theme, ["data-kind"]: kind }) => {
        const mainColor =
            kind == "level"
                ? theme.palette.primary.dark
                : kind == "average"
                ? theme.palette.secondary.light
                : getThemeColor("regularText", theme);
        return {
            color: getThemeColor("notelessText", theme),
            transition: "all 0.2s",
            "& .MuiChip-icon": {
                marginBottom: "1px",
                transition: "all 0.2s",
                color: getThemeColor("notelessText", theme),
            },
            "&:hover": {
                color: mainColor,
                "& .MuiChip-icon": {
                    color: mainColor,
                },
            },
        };
    }
);

export default function SoftSkillDescriptionBlock({
    number,
    label,
    description,
    icon,
    level,
    totalLevel,
    averagePercent,
    levelPercent,
}: SoftSkillDescriptionBlockProps) {
    const theme = useTheme();
    const lang = useLanguage();
    const belowlg = useMediaQuery(theme.breakpoints.down("lg"));
    const [accentedElement, setAccentedElement] = useState<DiagrammProps["accentedElement"]>();
    return (
        <Box
            sx={{
                display: "grid",
                position: "relative",
                gridTemplateColumns: "auto 1fr auto",
                height: "100%",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "6px",
                ["@media (max-width: 450px)"]: {
                    gridTemplateColumns: "auto 1fr",
                },
            }}
        >
            <Box
                sx={{
                    background: getThemeColor("titleBg", theme),
                    padding: belowlg ? "10px" : "12px",
                    border: `1px solid ${theme.palette.divider}`,
                    display: "flex",
                    alignItems: "center",
                    borderWidth: "0px 1px 0px 0px",
                    gridRow: "span " + (belowlg ? 2 : 1),
                    ["@media (max-width: 450px)"]: {
                        gridRow: "span 3",
                    },
                }}
            >
                {number}
            </Box>
            <div className={"flex flex-col gap-2 px-4 py-3"}>
                <div
                    className="flex gap-2 flex-wrap"
                    onPointerOver={(e: React.PointerEvent) => {
                        const chip = (e.target as HTMLElement).closest(".MuiChip-root[data-kind]");
                        if (!chip) return;
                        const kind = chip.getAttribute("data-kind");
                        if (kind != accentedElement) setAccentedElement(kind as typeof accentedElement);
                    }}
                    onPointerLeave={() => setAccentedElement(undefined)}
                >
                    <Box sx={{ color: getThemeColor("regularHoverText", theme), flexGrow: 1 }}>{label}</Box>
                    <div className="flex gap-2 flex-wrap">
                        <MetricChip data-kind="total" label={`${level} / ${totalLevel}`} icon={<GrowingMetricIcon />} />
                        <MetricChip data-kind="average" label={`${averagePercent}%`} icon={<AverageMetricIcon />} />
                        <MetricChip data-kind="level" label={`${levelPercent}%`} icon={<BarChartIcon />} />
                    </div>
                </div>
                {!belowlg && description[lang.lang]}
            </div>
            <Box
                sx={{
                    display: "flex",
                    ["@media (max-width: 450px)"]: {
                        justifyContent: "center",
                    },
                }}
            >
                <Diagramm
                    icon={icon}
                    level={level}
                    totalLevel={totalLevel}
                    averagePercent={averagePercent}
                    levelPercent={levelPercent}
                    accentedElement={accentedElement}
                />
            </Box>

            {belowlg && (
                <Box
                    sx={{
                        gridColumn: "span 2",
                        padding: "0px 16px 12px 16px",
                        ["@media (max-width: 450px)"]: {
                            gridColumn: "span 1",
                        },
                    }}
                >
                    {description[lang.lang]}
                </Box>
            )}
        </Box>
    );
}
