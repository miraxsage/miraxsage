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
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

type ProjectImageViewerProps = {
    project: ProjectInterface;
    image: number;
    onClose: () => void;
};
type ImageSource = { src: string; img?: HTMLImageElement; num: number; height?: number; width?: number };

type ProjectImageProps = {
    source?: ImageSource;
    scale: number;
    loading?: boolean;
    onClose?: () => void;
};
function ProjectImage({ source, scale, loading }: ProjectImageProps) {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    return (
        <Box
            sx={{
                minHeight: source?.height ? `max(100%, ${source.height * scale}px)` : "100%",
                maxHeight: source?.height ? source?.height : "100%",
                minWidth: source?.width ? source.width * scale : "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
            }}
        >
            {loading ? (
                <SimpleSpinner />
            ) : (
                <img
                    style={{
                        height: source?.height ? source.height * scale : "unset",
                        width: source?.width ? source.width * scale : "unset",
                        position: "relative",
                        boxShadow: `0px 0px 185px ${getThemeColor(
                            isDarkMode ? "layoutBackground" : "layoutGlow",
                            theme
                        )}, 0px 0px 100px ${getThemeColor(isDarkMode ? "layoutBackground" : "layoutGlow", theme)}`,
                    }}
                    src={source?.src}
                />
            )}
        </Box>
    );
}

export default function ProjectImageViewer({ project, image, onClose }: ProjectImageViewerProps) {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const [loading, setLoading] = useState(true);
    const [scale, setScale] = useReducer((_old: number, action: number) => {
        if (action > 1.5) return 1.5;
        if (action < 0.5) return 0.5;
        return action;
    }, 1);
    const imageSource = useRef<{ prev?: ImageSource; cur: ImageSource } | null>(null);
    const curImage = imageSource.current?.cur.num ?? image;
    const isFirstImage = curImage == 1;
    const isLastImage = curImage == project.images;

    const setCurImage = (img: number, initial?: boolean) => {
        if (img == imageSource.current?.cur.num) return;
        if (!initial) {
            setLoading(true);
            //setScale(1);
        }
        const newImageSource = new Image();
        newImageSource.onload = (e) => {
            if (imageSource.current?.cur.num != img) return;
            const target = e.target as HTMLImageElement;
            imageSource.current.cur.height = target.height;
            imageSource.current.cur.width = target.width;
            setLoading(false);
        };
        newImageSource.src = `/img/projects/${project.slug}/${img}.jpg`;
        imageSource.current = {
            prev: loading ? imageSource.current?.prev : imageSource.current?.cur,
            cur: {
                src: newImageSource.src,
                img: newImageSource,
                num: img,
            },
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
            sx={{
                gridTemplateRows: "auto minmax(0, 1fr)",
                gridTemplateColumns: "minmax(0, 1fr)",
            }}
        >
            <motion.div
                style={{ backgroundColor: alpha(getThemeColor("layoutBackground", theme), isDarkMode ? 0.95 : 0.8) }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
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
            </motion.div>
            <motion.div
                initial={{ opacity: 1, backgroundColor: alpha(getThemeColor("layoutBackground", theme), 0) }}
                animate={{ backgroundColor: alpha(getThemeColor("layoutBackground", theme), isDarkMode ? 0.95 : 0.8) }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}
                style={{ display: "grid", height: "100%", gridTemplateRows: "minmax(0,1fr)" }}
                onClick={(e) => {
                    if (!loading && !(e.target instanceof HTMLImageElement)) onClose?.();
                }}
            >
                <AnimatePresence mode="sync">
                    {loading && imageSource.current?.prev && (
                        <CustomScrollbar
                            sx={{ gridArea: "1/1/1/1" }}
                            key={`${project.slug}-${imageSource.current?.prev.num}`}
                        >
                            <motion.div
                                style={{
                                    minHeight: "100%",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                exit={{
                                    opacity: 0,
                                    clipPath: "circle(1000% at 50% 50%)",
                                    transition: { duration: 0.4 },
                                }}
                            >
                                <ProjectImage source={imageSource.current?.prev} scale={scale} />
                            </motion.div>
                        </CustomScrollbar>
                    )}
                    <CustomScrollbar
                        sx={{ gridArea: "1/1/1/1", display: "grid", width: "100%" }}
                        key={`${project.slug}-${imageSource.current?.cur.num}`}
                    >
                        <motion.div
                            style={{
                                minHeight: "100%",
                                display: "flex",
                                width: "max(100%, " + (imageSource.current?.cur?.width ?? 0) * scale + "px)",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                clipPath: [
                                    (imageSource.current?.prev?.num ?? -1) > (imageSource.current?.cur?.num ?? -1)
                                        ? "circle(75% at -300% 50%)"
                                        : "circle(75% at 300% 50%)",
                                    "circle(75% at 50% 50%)",
                                    "circle(1000% at 50% 50%)",
                                ],
                                transition: {
                                    opacity: { duration: 0.45 },
                                    clipPath: { duration: 0.5, times: [0, 0.99, 1] },
                                },
                            }}
                            exit={{
                                opacity: 0,
                                clipPath: "circle(1000% at 50% 50%)",
                                transition: { duration: 0.4 },
                            }}
                        >
                            <ProjectImage
                                source={imageSource.current?.cur}
                                scale={scale}
                                loading={loading}
                                onClose={onClose}
                                key={`${project.slug}-${imageSource.current?.cur.num}`}
                            />
                        </motion.div>
                    </CustomScrollbar>
                </AnimatePresence>
            </motion.div>
        </Box>
    );
}
