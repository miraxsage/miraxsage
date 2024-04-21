import { Box, Button, useTheme } from "@mui/material";
import { register } from "swiper/element/bundle";
import { useEffect, useRef, useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ProjectInterface } from "./Projects";
import { SimpleSpinner } from "../../Spinners";

let swiperWebComponentsAreRegistered = false;

type WebComponentProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    class?: string;
    init?: string;
};

interface SwiperElement extends HTMLElement {
    initialize: () => void;
    swiper: {
        slideNext: () => void;
        slidePrev: () => void;
        on: (event: string, handler: () => void) => void;
        progress: number;
    };
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            "swiper-container": WebComponentProps;
            "swiper-slide": WebComponentProps;
            "swiper-pagination": WebComponentProps;
            "swiper-button-prev": WebComponentProps;
            "swiper-button-next": WebComponentProps;
        }
    }
}

type ProjectCarouselProps = {
    project: ProjectInterface;
    onImageClick?: (image: number) => void;
};

export default function ProjectCarousel({ project, onImageClick }: ProjectCarouselProps) {
    const theme = useTheme();
    const [progress, setProgress] = useState<"start" | "middle" | "end">("start");
    const actualContext = useRef<{ refreshProgress?: () => void }>({});
    if (!swiperWebComponentsAreRegistered) {
        register();
        swiperWebComponentsAreRegistered = true;
    }
    const rootRef = useRef<SwiperElement | null>(null);
    actualContext.current.refreshProgress = () => {
        const swiper = rootRef.current?.swiper;
        if (!swiper) return;
        const newProgressState = swiper.progress == 0 ? "start" : swiper.progress == 1 ? "end" : "middle";
        if (newProgressState != progress) setProgress(newProgressState);
    };
    const navigate = (to: "prev" | "next") => {
        const swiper = rootRef.current?.swiper;
        if (!swiper) return;
        swiper[to == "prev" ? "slidePrev" : "slideNext"]();
    };
    useEffect(() => {
        const swiperParams = {
            lazy: true,
            slidesPerView: 3,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
            },
        };
        if (rootRef.current) {
            setTimeout(() => {
                if (rootRef.current) {
                    Object.assign(rootRef.current, swiperParams);
                    rootRef.current.initialize();
                    rootRef.current.swiper.on("slideChange", function () {
                        actualContext.current?.refreshProgress?.();
                    });
                }
            });
        }
    }, []);
    const slides = Array.from(new Array(project.images)).map((_e, i) => (
        <swiper-slide>
            <Box
                sx={{
                    height: "200px",
                    overflow: "hidden",
                    position: "relative",
                    boxSizing: "border-box",
                }}
                onClick={() => onImageClick?.(i)}
            >
                <Box sx={{ position: "absolute", width: "100%", height: "100%" }}>
                    <SimpleSpinner />
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        marginLeft: "-1px",
                    }}
                    component="img"
                    src={`/img/projects/${project.slug}/${i + 1}.jpg`}
                    loading="lazy"
                    onLoad={(e) => {
                        if (e.target) (e.target as HTMLElement).parentElement?.querySelector(":scope > div")?.remove();
                    }}
                />
            </Box>
        </swiper-slide>
    ));
    return (
        <Box
            sx={{
                minWidth: "100%",
                maxWidth: "100%",
                width: "0px",
                userSelect: "none",
                display: "flex",
                position: "relative",
                border: "1px solid " + theme.palette.divider,
                borderRadius: "5px",
                minHeight: "202px",
                "& swiper-container": {
                    "--swiper-pagination-bullet-inactive-color": theme.palette.divider,
                    "--swiper-pagination-bullet-inactive-opacity": 0.5,
                    "--swiper-theme-color": theme.palette.primary.main,
                    "--swiper-pagination-bottom": "4px",
                    "--swiper-navigation-color": theme.palette.divider,
                    "--swiper-navigation-size": "25px",
                    overflow: "hidden",
                    flexGrow: 1,
                },
            }}
        >
            <Button
                disabled={progress == "start"}
                color="regular"
                sx={{
                    borderRight: `1px solid ${theme.palette.divider}`,
                    borderRadius: "4px 0px 0px 4px",
                    minWidth: "45px",
                }}
                onClick={() => navigate("prev")}
            >
                <ArrowLeftIcon sx={{ opacity: progress == "start" ? 0.3 : 1 }} />
            </Button>
            <swiper-container ref={rootRef} init="false">
                {...slides}
            </swiper-container>
            <Button
                disabled={progress == "end"}
                color="regular"
                sx={{
                    borderLeft: `1px solid ${theme.palette.divider}`,
                    borderRadius: "0px 4px 4px 0px",
                    minWidth: "45px",
                }}
                onClick={() => navigate("next")}
            >
                <ArrowRightIcon sx={{ opacity: progress == "end" ? 0.3 : 1 }} />
            </Button>
        </Box>
    );
}
