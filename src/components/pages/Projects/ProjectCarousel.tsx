import { Box, Button, lighten, useTheme } from "@mui/material";
import { register } from "swiper/element/bundle";
import { useEffect, useRef, useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ProjectInterface, ProjectsList } from "./Projects";
import { SimpleSpinner } from "../../Spinners";
import { ProjectCardImage } from "./ProjectCard";
import { getThemeColor } from "@/components/contexts/Theme";
import { useColorMode } from "@/store/appearanceSlice";
import { darken } from "@mui/material";

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
        destroy: () => void;
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
    const isDarkMode = useColorMode().dark;
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
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                [theme.breakpoints.values.lg]: {
                    slidesPerView: 2,
                },
                [theme.breakpoints.values["2xl"]]: {
                    slidesPerView: 3,
                },
            },
        };
        let swiper: SwiperElement["swiper"] | null = null;
        if (rootRef.current) {
            setTimeout(() => {
                if (rootRef.current) {
                    Object.assign(rootRef.current, swiperParams);
                    rootRef.current.initialize();
                    swiper = rootRef.current.swiper;
                    swiper.on("slideChange", function () {
                        actualContext.current?.refreshProgress?.();
                    });
                }
            });
        }
        return () => swiper?.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                onClick={() => onImageClick?.(i + 1)}
            >
                <Box className="loader-container" sx={{ position: "absolute", width: "100%", height: "100%" }}>
                    <SimpleSpinner />
                </Box>
                <ProjectCardImage
                    slug={project.slug as ProjectsList}
                    img={i + 1}
                    lazyLoading={true}
                    sx={{
                        height: "100%",
                        "&  img": {
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                        },
                        "&:after": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 0,
                            height: "100%",
                            width: "5px",
                            background: getThemeColor("layoutBackground", theme),
                        },
                    }}
                    onImageLoad={(e) => {
                        if (e.target)
                            (e.target as HTMLElement)
                                .closest("swiper-slide")
                                ?.querySelector(":scope .loader-container")
                                ?.remove();
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
                    "--swiper-pagination-bullet-inactive-color": isDarkMode
                        ? lighten(theme.palette.divider, 0.3)
                        : darken(theme.palette.divider, 0.5),
                    "--swiper-pagination-bullet-inactive-opacity": 0.5,
                    "--swiper-theme-color": theme.palette.primary.main,
                    "--swiper-pagination-bottom": "4px",
                    "--swiper-navigation-color": theme.palette.divider,
                    "--swiper-navigation-size": "25px",
                    overflow: "hidden",
                    flexGrow: 1,
                },
                [theme.breakpoints.down("md")]: {
                    borderTopWidth: 0,
                    borderRadius: 0,
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
                    marginRight: "5px",
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
