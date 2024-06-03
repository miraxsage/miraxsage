import { getThemeColor } from "@/components/contexts/Theme";
import { styled, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import { ReactNode, useState } from "react";
import { CustomChip } from "@/components/Chip";
import GrowingMetricIcon from "@/components/icons/GrowingMetricIcon";
import BarChartIcon from "@mui/icons-material/BarChart";
import AverageMetricIcon from "@/components/icons/AverageMetricIcon";
import { useColorMode } from "@/store/appearanceSlice";

type SoftSkillDescriptionBlockProps = {
    label: string;
    description: string;
    number: number;
} & DiagrammProps;

type DiagrammProps = {
    icon: ReactNode;
    level: number;
    totalLevel: number;
    averageLevel: number;
    accentedElement?: "total" | "average" | "level";
};

function Diagramm({ icon, level, averageLevel, totalLevel, accentedElement }: DiagrammProps) {
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
    const averageFromColor = accentedElement == "average" ? secondaryColor : dividerColor;
    const averageToColor = secondaryColor;
    const levelFromColor = accentedElement == "level" ? primaryColor : dividerColor;
    const levelToColor = primaryColor;
    const levelPercent = Math.round((100 * level) / totalLevel);
    const averagePercent = Math.round((100 * averageLevel) / totalLevel);
    return (
        <div className="pt-3 pr-3 pb-3 flex flex-wrap">
            <div className="flex self-center h-full max-h-24">
                <Box
                    sx={{
                        width: "2px",
                        marginRight: "5px",
                        background: accentedElement == "total" ? totalToColor : dividerColor,
                        transition: "all 0.2s",
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
    averageLevel,
}: SoftSkillDescriptionBlockProps) {
    const theme = useTheme();
    const belowlg = useMediaQuery(theme.breakpoints.down("lg"));
    const [accentedElement, setAccentedElement] = useState<DiagrammProps["accentedElement"]>();
    const levelPercent = Math.round((100 * level) / totalLevel);
    const averagePercent = Math.round((100 * averageLevel) / totalLevel);
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
            <div className={"flex flex-col " + (belowlg ? "px-3 py-2" : "px-4 py-3")}>
                <div
                    className="flex gap-2 flex-wrap"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onPointerOver={(e: any) => {
                        const chip = e.target.closest(".MuiChip-root[data-kind]");
                        if (!chip) return;
                        const kind = chip.getAttribute("data-kind");
                        if (kind != accentedElement) setAccentedElement(kind);
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
                {!belowlg && description}
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
                    averageLevel={averageLevel}
                    totalLevel={totalLevel}
                    accentedElement={accentedElement}
                />
            </Box>

            {belowlg && (
                <Box
                    sx={{
                        gridColumn: "span 2",
                        padding: "5px 8px 8px 8px",
                        ["@media (max-width: 450px)"]: {
                            gridColumn: "span 1",
                        },
                    }}
                >
                    {description}
                </Box>
            )}
        </Box>
    );
}
