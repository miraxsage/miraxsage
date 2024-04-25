import { Box, SxProps, alpha, lighten, useMediaQuery, useTheme } from "@mui/material";
import { TechnologiesList, getTechnologyInfo } from "../About/Blocks/specs/Technologies";
import StarIcon from "@mui/icons-material/Star";
import CustomScrollbar from "@/components/Scrollbar";
import { ProjectInterface, ProjectsList, projects } from "./Projects";
import { getThemeColor } from "@/components/contexts/Theme";
import { useId } from "react";
import { useAppearance, useColorMode } from "@/store/appearanceSlice";

type ProjectCardProps = {
    project: ProjectInterface;
    sx?: SxProps;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function TechIcon({ technology }: { technology: TechnologiesList }) {
    const techInfo = getTechnologyInfo(technology);
    if (techInfo) {
        const Icon = techInfo[2];
        return <Icon />;
    }
}

function Title({ children }: { children: string }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode == "dark";
    const filterId = useId();
    return (
        <Box
            sx={{
                position: "absolute",
                left: "15px",
                top: "15px",
                right: "18px",
                color: isDarkMode
                    ? getThemeColor("regularText", theme)
                    : alpha(getThemeColor("regularText", theme), 0.7),
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "25px",
                "& .text": {
                    padding: "5px 8px",
                    background: getThemeColor("layoutBackground", theme),
                    boxDecorationBreak: "clone",
                    filter: `url(#${filterId})`,
                    transition: "all 0.3s",
                },
                "& .backdrop": {
                    position: "absolute",
                    transform: "translate(4px, 4px)",
                    "& .text": {
                        userSelect: "none",
                        background: isDarkMode
                            ? lighten(theme.palette.divider, 0.1)
                            : lighten(getThemeColor("regularText", theme), 0.6),
                    },
                },
            }}
        >
            <svg
                style={{ visibility: "hidden", position: "absolute" }}
                width="0"
                height="0"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <defs>
                    <filter id={filterId}>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result={filterId}
                        />
                        <feComposite in="SourceGraphic" in2={filterId} operator="atop" />
                    </filter>
                </defs>
            </svg>
            <div className="backdrop">
                <span className="text">{children}</span>
            </div>
            <span className="text">{children}</span>
        </Box>
    );
}

export type ProjectCardImageProps = {
    slug: ProjectsList;
    img?: number;
    component?: React.ElementType;
    lazyLoading?: boolean;
    onImageLoad?: React.ReactEventHandler<HTMLImageElement>;
    sx?: SxProps;
};

export function ProjectCardImage({ slug, img, component, lazyLoading, onImageLoad, sx }: ProjectCardImageProps) {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const project: ProjectInterface | undefined = projects.find((p) => p.slug == slug);
    if (!slug || !project) return null;
    return (
        <Box
            component={component}
            sx={{
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                background: getThemeColor("layoutBackground", theme),
                "& img": {
                    transition: "opacity 0.2s, transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)",
                    "&:first-of-type": {
                        mixBlendMode: isDarkMode
                            ? project.coverBrightmess == "dark"
                                ? "luminosity"
                                : "soft-light"
                            : "normal",
                        filter: isDarkMode
                            ? project.coverBrightmess == "dark"
                                ? "grayscale(1) contrast(1.05) brightness(0.7)"
                                : "grayscale(1) contrast(0.6)"
                            : "grayscale(1)",
                        opacity: isDarkMode ? (project.coverBrightmess == "dark" ? 0.35 : 1) : 0.55,
                    },
                    "&:last-of-type": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        "&:hover": {
                            opacity: isDarkMode ? 0.8 : 1,
                            transform: "scale(1.05)",
                        },
                    },
                },
                ...sx,
            }}
        >
            <img
                {...(lazyLoading ? { loading: "lazy" } : {})}
                {...(onImageLoad ? { onLoad: onImageLoad } : {})}
                data-img-num={img}
                src={`/img/projects/${slug}/${img ? img + "_preview" : "cover"}.jpg`}
            />
            <img data-img-num={img} src={`/img/projects/${slug}/${img ? img + "_preview" : "cover"}.jpg`} />
        </Box>
    );
}

export default function ProjectCard({ project, sx, style, onClick }: ProjectCardProps) {
    const theme = useTheme();
    const threeCols = useMediaQuery(theme.breakpoints.only("3xl"));
    const twoCols = useMediaQuery(theme.breakpoints.between("xl", "3xl"));
    const oneCol = useMediaQuery(theme.breakpoints.down("xl"));
    const isDarkMode = theme.palette.mode == "dark";
    const lang = useAppearance().language;
    return (
        <Box
            onClick={onClick}
            style={style}
            sx={{
                borderRadius: "8px",
                border: "1px solid " + theme.palette.divider,
                color: getThemeColor("regularText", theme),
                position: "relative",
                transition: "all 0.3s",
                transitionProperty: "color, background",
                "& .MuiSvgIcon-root": {
                    fontSize: "19px",
                    color: getThemeColor("regularIcon", theme),
                    transition: "color 0.3s",
                },
                [threeCols
                    ? "&:not(:nth-of-type(3n)):not(:last-of-type) .connector"
                    : twoCols
                    ? "&:nth-of-type(odd):not(:last-of-type) .connector"
                    : ""]: {
                    display: "block",
                    width: "25px",
                    position: "absolute",
                    top: "50%",
                    right: "-25px",
                    "& > div:first-of-type": {
                        background: theme.palette.divider,
                        width: "100%",
                        height: "1px",
                        position: "absolute",
                        "&:after, &:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: "5px",
                            height: "5px",
                            background: theme.palette.divider,
                            borderRadius: "50%",
                            top: "-2px",
                            zIndex: 1,
                        },
                        "&:before": {
                            left: "-2.5px",
                        },
                        "&:after": {
                            right: "-4px",
                        },
                    },
                },
                [threeCols
                    ? "&:nth-of-type(3n):not(:last-of-type) .connector"
                    : twoCols
                    ? "&:nth-of-type(even):not(:last-of-type) .connector"
                    : "&:not(:last-of-type) .connector"]: {
                    display: "block",
                    height: "25px",
                    width: threeCols ? "calc(200% + 50px)" : twoCols ? "calc(100% + 25px)" : "50%",
                    position: "absolute",
                    bottom: "-26px",
                    right: oneCol ? "25%" : "50%",
                    "& > div": {
                        border: "1px solid " + theme.palette.divider,
                        width: "50%",
                        height: "calc(50% + 0.5px)",
                        position: "absolute",
                        "&:after": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: "5px",
                            height: "5px",
                            background: theme.palette.divider,
                            borderRadius: "50%",
                            zIndex: 1,
                        },
                    },
                    "& > div:first-of-type": {
                        borderBottomRightRadius: "10px",
                        borderWidth: "0px 1px 1px 0px",
                        right: 0,
                        "&:after": {
                            right: "-2.5px",
                            top: "-2.5px",
                        },
                    },
                    "& > div:last-of-type": {
                        borderTopLeftRadius: "10px",
                        borderWidth: "1px 0px 0px 1px",
                        left: 0,
                        bottom: 0,
                        "&:after": {
                            left: "-3px",
                            bottom: "-2.5px",
                        },
                    },
                },
                ...sx,
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateRows: "200px auto 102px",
                    cursor: "pointer",
                    transition: "color 0.3s",
                    "&:hover": {
                        color: getThemeColor("regularHoverIcon", theme),
                        background: getThemeColor("cardHoverBg", theme),
                        "& img:last-of-type": {
                            opacity: isDarkMode ? 0.8 : 1,
                            transform: "scale(1.05)",
                        },
                        ".text": {
                            color: isDarkMode
                                ? getThemeColor("regularHoverText", theme)
                                : lighten(getThemeColor("regularText", theme), 0.1),
                        },
                        ".backdrop .text": {
                            background: isDarkMode
                                ? getThemeColor("regularHoverText", theme)
                                : lighten(getThemeColor("regularText", theme), 0.2),
                        },
                        "& .MuiSvgIcon-root": {
                            color: getThemeColor("regularHoverIcon", theme),
                        },
                    },
                }}
            >
                <ProjectCardImage slug={project.slug as ProjectsList} sx={{ borderRadius: "8px 8px 0px 0px" }} />
                <Title>{project.name[lang]}</Title>
                <Box
                    className="flex"
                    sx={{ border: "1px solid" + theme.palette.divider, borderWidth: "1px 0px 1px 0px" }}
                >
                    <Box
                        className="flex flex-grow justify-center"
                        sx={{
                            padding: "5px",
                            borderRight: "1px solid " + theme.palette.divider,
                            "& .MuiSvgIcon-root:not(:first-of-type)": {
                                marginLeft: "10px",
                            },
                        }}
                    >
                        {project.technologies.map((t) => (
                            <TechIcon key={t} technology={t} />
                        ))}
                    </Box>
                    <Box
                        sx={{
                            padding: "3px 11px 2px 12px",
                            verticalAlign: "top",
                            "& .MuiSvgIcon-root": {
                                marginTop: "-2px",
                            },
                        }}
                    >
                        <span>{project.rating}</span> <StarIcon />
                    </Box>
                </Box>
                <CustomScrollbar>
                    <Box sx={{ padding: "8px 10px", lineHeight: 1.25 }}>{project.description[lang]}</Box>
                </CustomScrollbar>
            </Box>
            <div className="connector">
                <div></div>
                <div></div>
            </div>
        </Box>
    );
}
