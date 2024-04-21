import { Box, useTheme } from "@mui/material";
import { ProjectInterface } from "./Projects";
import { LinkButton } from "@/components/DescriptionPanel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { useState } from "react";
import { getThemeColor } from "@/components/contexts/Theme";
import CustomScrollbar from "@/components/Scrollbar";

type ProjectImageViewerProps = {
    project: ProjectInterface;
    image: number;
    onClose: () => void;
};
export default function ProjectImageViewer({ project, image, onClose }: ProjectImageViewerProps) {
    const theme = useTheme();
    const [curImage, setCurImage] = useState(image);

    const isFirstImage = curImage == 0;
    const isLastImage = curImage == project.images;

    const navigate = (to: "prev" | "next") => {
        if (to == "prev" && isFirstImage) return;
        if (to == "next" && isLastImage) return;
        setCurImage(curImage + (to == "prev" ? -1 : 1));
    };
    return (
        <Box className="grid h-full" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
            <Box
                sx={{
                    display: "grid",
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
                    borders="bottom"
                    sx={{
                        textAlign: "right",
                    }}
                    onClick={() => navigate("prev")}
                >
                    {!isFirstImage && (
                        <>
                            <ArrowBackIcon />
                            Предыдущее
                        </>
                    )}
                </LinkButton>
                <LinkButton borders="bottom">
                    <>
                        <ZoomInIcon />
                        Крупнее
                    </>
                </LinkButton>
                <LinkButton borders="right-bottom-left" onClick={onClose}>
                    <RocketLaunchIcon />
                    Все проекты
                </LinkButton>
                <LinkButton borders="bottom">
                    <>
                        <ZoomOutIcon />
                        Мельче
                    </>
                </LinkButton>
                <LinkButton
                    borders="bottom"
                    sx={{
                        "& .MuiSvgIcon-root": {
                            margin: "0px 0px 0px 8px",
                        },
                    }}
                    onClick={() => navigate("next")}
                >
                    {!isLastImage && (
                        <>
                            Следующий
                            <ArrowForwardIcon />
                        </>
                    )}
                </LinkButton>
            </Box>
            <CustomScrollbar>123</CustomScrollbar>
        </Box>
    );
}
