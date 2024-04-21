import { Box, alpha, useTheme } from "@mui/material";
import { ProjectInterface } from "./Projects";
import { LinkButton } from "@/components/DescriptionPanel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { useEffect, useReducer, useRef, useState } from "react";
import { getThemeColor } from "@/components/contexts/Theme";
import CustomScrollbar from "@/components/Scrollbar";
import { SimpleSpinner } from "@/components/Spinners";
import { useColorMode } from "@/store/appearanceSlice";

type ProjectImageViewerProps = {
    project: ProjectInterface;
    image: number;
    onClose: () => void;
};
export default function ProjectImageViewer({ project, image, onClose }: ProjectImageViewerProps) {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const [loading, setLoading] = useState(true);
    const [scale, setScale] = useReducer((_old: number, action: number) => {
        if (action > 1.5) return 1.5;
        if (action < 0.5) return 0.5;
        return action;
    }, 1);
    const imageSource = useRef<{
        src: string;
        img?: HTMLImageElement;
        num: number;
        height?: number;
        width?: number;
    } | null>(null);
    const curImage = imageSource.current?.num ?? image;
    const isFirstImage = curImage == 1;
    const isLastImage = curImage == project.images;

    const setCurImage = (img: number, initial?: boolean) => {
        if (img == imageSource.current?.num) return;
        if (!initial) {
            setLoading(true);
            //setScale(1);
        }
        const newImageSource = new Image();
        newImageSource.onload = (e) => {
            if (imageSource.current?.num != img) return;
            const target = e.target as HTMLImageElement;
            imageSource.current.height = target.height;
            imageSource.current.width = target.width;
            setLoading(false);
        };
        newImageSource.src = `/img/projects/${project.slug}/${img}.jpg`;
        imageSource.current = {
            src: newImageSource.src,
            img: newImageSource,
            num: img,
        };
    };

    const navigate = (to: "prev" | "next") => {
        if (to == "prev" && isFirstImage) return;
        if (to == "next" && isLastImage) return;
        setCurImage(curImage + (to == "prev" ? -1 : 1));
    };

    useEffect(() => {
        setCurImage(image, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            className="grid h-full"
            sx={{ gridTemplateRows: "auto minmax(0, 1fr)", gridTemplateColumns: "minmax(0, 1fr)" }}
        >
            <Box
                sx={{
                    display: "grid",
                    background: getThemeColor("layoutBackground", theme),
                    gridTemplateColumns: "1fr auto auto auto 1fr",
                    "& .MuiSvgIcon-root": {
                        color: getThemeColor("regularIcon", theme),
                        fontSize: "20px",
                        marginRight: "8px",
                        position: "relative",
                        top: "-2px",
                    },
                }}
            >
                <LinkButton
                    borders="right-bottom"
                    sx={{
                        textAlign: "right",
                    }}
                    onClick={!isFirstImage ? () => navigate("prev") : undefined}
                >
                    <div style={{ opacity: !isFirstImage ? 1 : 0.5 }}>
                        <ArrowBackIcon />
                        Предыдущее
                    </div>
                </LinkButton>
                <LinkButton borders="bottom" onClick={scale > 0.5 ? () => setScale(scale - 0.1) : undefined}>
                    <div style={{ opacity: scale > 0.5 ? 1 : 0.5 }}>
                        <ZoomOutIcon />
                        Мельче
                    </div>
                </LinkButton>
                <LinkButton borders="right-bottom-left" onClick={onClose}>
                    <RocketLaunchIcon />К описанию
                </LinkButton>
                <LinkButton borders="bottom" onClick={scale < 1.5 ? () => setScale(scale + 0.1) : undefined}>
                    <div style={{ opacity: scale < 1.5 ? 1 : 0.5 }}>
                        <ZoomInIcon />
                        Крупнее
                    </div>
                </LinkButton>

                <LinkButton
                    borders="bottom-left"
                    sx={{
                        "& .MuiSvgIcon-root": {
                            margin: "0px 0px 0px 8px",
                        },
                    }}
                    onClick={!isLastImage ? () => navigate("next") : undefined}
                >
                    <div style={{ opacity: !isLastImage ? 1 : 0.5 }}>
                        Следующее
                        <ArrowForwardIcon />
                    </div>
                </LinkButton>
            </Box>
            <CustomScrollbar>
                <Box
                    sx={{
                        minHeight: imageSource.current?.height
                            ? `max(100%, ${imageSource.current.height * scale}px)`
                            : "100%",
                        minWidth: imageSource.current?.width ? imageSource.current.width * scale : "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        userSelect: "none",
                        background: alpha(getThemeColor("layoutBackground", theme), isDarkMode ? 0.95 : 0.8),
                    }}
                    onClick={(e) => {
                        if (!loading && !(e.target instanceof HTMLImageElement)) onClose?.();
                    }}
                >
                    {loading ? (
                        <SimpleSpinner />
                    ) : (
                        <img
                            style={{
                                height: imageSource.current?.height ? imageSource.current.height * scale : "unset",
                                width: imageSource.current?.width ? imageSource.current.width * scale : "unset",
                                position: "relative",
                                boxShadow: `0px 0px 185px ${getThemeColor(
                                    isDarkMode ? "layoutBackground" : "layoutGlow",
                                    theme
                                )}, 0px 0px 100px ${getThemeColor(
                                    isDarkMode ? "layoutBackground" : "layoutGlow",
                                    theme
                                )}`,
                            }}
                            src={imageSource.current?.src}
                        />
                    )}
                </Box>
            </CustomScrollbar>
        </Box>
    );
}
