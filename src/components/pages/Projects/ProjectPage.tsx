import { Box, SxProps, useMediaQuery, useTheme } from "@mui/material";
import ProjectsBreadcrumbs from "./ProjectsBreadcrumbs";
import { isProjectSlug, projects } from "./Projects";
import { useParams } from "react-router-dom";
import ProjectInfoTable from "./ProjectInfoTable";
import CustomScrollbar from "@/components/Scrollbar";
import { LinkButton } from "@/components/DescriptionPanel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useAppearance, useScreenMode } from "@/store/appearanceSlice";
import { AppSpinner } from "@/components/Spinners";
import {
    getLocatedProjects,
    getProjectsNavigationLink,
    navigateToProjects,
    useProjectsLocation,
} from "./projectsNavigation";
import { getThemeColor } from "@/components/contexts/Theme";
import ProjectCarousel from "@/components/pages/Projects/ProjectCarousel";
import ProjectImageViewer from "./ProjectImageViewer";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import __ from "@/utilities/transtation";
import classes from "classnames";
import { hideLoadingShield } from "@/components/App";
import { useNavigate } from "@/utilities/common";

function OptionalCustomScrollbar({
    useScrollbar,
    children,
    useDivInstead,
    sx,
}: {
    useScrollbar: boolean;
    children: ReactNode;
    useDivInstead?: boolean;
    sx?: SxProps;
}) {
    return useScrollbar ? (
        <CustomScrollbar sx={sx}>{children}</CustomScrollbar>
    ) : useDivInstead ? (
        <div>{children}</div>
    ) : (
        children
    );
}

export default function ProjectPage() {
    const [refreshState, refresh] = useState<boolean>(false);
    const [beingViewedImage, setBeingViewedImage] = useState<number | undefined>();
    const screenMode = useScreenMode();
    const slug = useParams().slug!;
    const theme = useTheme();
    const lang = useAppearance().language;
    const curProjectLocation = useProjectsLocation();
    const locatedProjects = getLocatedProjects(curProjectLocation!, lang);
    const allProjectsLocation = curProjectLocation!.techs.length == 0 || locatedProjects.length == projects.length;
    const content = useRef<{ ru: ReactNode; en: ReactNode; slug: string; swapDirection?: "left" | "right" }>({
        ru: null,
        en: null,
        slug,
    });
    const muchSmall = useMediaQuery("@media (max-width: 450px)");
    const lessLg = useMediaQuery(theme.breakpoints.down("lg"));
    const lessXl = useMediaQuery(theme.breakpoints.down("xl"));
    const navigate = useNavigate();
    const prevProjIndex = locatedProjects.findIndex((p) => p.slug == content.current.slug);
    const curProjIndex = locatedProjects.findIndex((p) => p.slug == slug);
    if (content.current.slug != slug) {
        const swapDirection = prevProjIndex < 0 ? undefined : prevProjIndex < curProjIndex ? "right" : "left";
        content.current = { ru: null, en: null, slug, swapDirection };
    }
    if (
        !content.current[lang] &&
        Object.keys(content.current).some(
            (k) => !k.match(/^slug|swap/) && content.current[k as keyof typeof content.current]
        )
    )
        content.current.swapDirection = undefined;
    const swapDir = content.current.swapDirection;
    const curProject = locatedProjects[curProjIndex];
    const prevProjSlug = curProjIndex < 0 ? "all" : curProjIndex == 0 ? null : locatedProjects[curProjIndex - 1].slug;
    const nextProjSlug =
        curProjIndex < 0
            ? "all"
            : curProjIndex == locatedProjects.length - 1
            ? null
            : locatedProjects[curProjIndex + 1].slug;
    useEffect(() => {
        (async () => {
            try {
                const Module = await import(`@/components/pages/Projects/${slug}/${lang}.tsx`);
                content.current[lang] = <Module.Component onImageClick={(img: number) => setBeingViewedImage(img)} />;
            } catch {
                content.current[lang] = lang == "ru" ? "Описание проекта отсутствует" : "Project's description absents";
            }
            hideLoadingShield();
            refresh(!refreshState);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, slug]);

    const projectsNavigationElement = (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                "& .MuiSvgIcon-root": {
                    color: getThemeColor("regularIcon", theme),
                    fontSize: "20px",
                    marginRight: "8px",
                    position: "relative",
                    top: "-2px",
                },
                [theme.breakpoints.down("sm")]: {
                    gridTemplateColumns: "auto auto auto",
                    "& a": {
                        padding: "8px 10px",
                    },
                },
            }}
        >
            <LinkButton
                borders="bottom"
                sx={{
                    textAlign: lessLg ? "center" : "right",
                }}
                link={
                    prevProjSlug ? getProjectsNavigationLink({ project: prevProjSlug }, curProjectLocation!) : undefined
                }
            >
                <div style={{ opacity: prevProjSlug ? 1 : 0.5 }}>
                    <ArrowBackIcon />
                    {lessLg && <br />}
                    {__("Previous")}
                </div>
            </LinkButton>
            <LinkButton
                sx={{ textAlign: "center" }}
                borders="right-bottom-left"
                link={getProjectsNavigationLink({ project: "all" }, curProjectLocation!)}
            >
                <RocketLaunchIcon />
                {lessLg && <br />}
                {muchSmall ? __("Projects") : allProjectsLocation ? __("All projects") : __("All chosen projects")}
            </LinkButton>
            <LinkButton
                borders="bottom"
                link={
                    nextProjSlug ? getProjectsNavigationLink({ project: nextProjSlug }, curProjectLocation!) : undefined
                }
                sx={{
                    textAlign: lessLg ? "center" : "left",
                    "& .MuiSvgIcon-root": {
                        margin: "0px 0px 0px 8px",
                    },
                }}
            >
                <div style={{ opacity: nextProjSlug ? 1 : 0.5 }}>
                    {lessLg ? <ArrowForwardIcon /> : __("Next")}
                    {lessLg && <br />}
                    {lessLg ? __("Next") : <ArrowForwardIcon />}
                </div>
            </LinkButton>
        </Box>
    );

    const projectCarousel = (
        <ProjectCarousel
            key={`${slug}-carousel`}
            project={curProject}
            onImageClick={(img) => setBeingViewedImage(img)}
        />
    );

    const projectViewer = beingViewedImage && (
        <Box
            sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
            }}
        >
            <ProjectImageViewer
                image={beingViewedImage}
                project={curProject}
                onClose={() => setBeingViewedImage(undefined)}
            />
        </Box>
    );

    const projDetailsSize = useMotionValue(325);
    const projDetailsSizeValue = useTransform(projDetailsSize, (initValue) =>
        lessLg
            ? `minmax(0, 1fr) / 1fr`
            : `minmax(0, 1fr) / ${
                  initValue < 325 && lessXl
                      ? initValue + "px " + (initValue == 0 ? "0px" : "1px") + " 3fr"
                      : `minmax(325px, 1fr) 1px 3fr`
              }`
    );
    useEffect(() => {
        animate(projDetailsSize, beingViewedImage ? 0 : 325, { duration: 0.4 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [beingViewedImage]);

    return (
        slug &&
        isProjectSlug(slug) && (
            <Box className="grid h-full relative" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
                <ProjectsBreadcrumbs
                    project={slug}
                    onBack={
                        !curProjectLocation
                            ? undefined
                            : () => {
                                  navigateToProjects(navigate, { project: "all" }, curProjectLocation);
                              }
                    }
                />
                <motion.div
                    className="grid h-full"
                    transition={{ duration: 1 }}
                    style={{
                        gridTemplate: projDetailsSizeValue,
                        // gridTemplate: lessLg
                        //     ? `minmax(0, 1fr) / 1fr`
                        //     : `minmax(0, 1fr) / ${beingViewedImage && lessXl ? "0 0" : "minmax(325px, 1fr) 1px"} 3fr`,
                    }}
                >
                    <OptionalCustomScrollbar useScrollbar={lessLg}>
                        {lessLg ? (
                            <>
                                {projectsNavigationElement}
                                {projectCarousel}
                                <ProjectInfoTable project={slug} />
                            </>
                        ) : (
                            <CustomScrollbar>
                                <ProjectInfoTable project={slug} />
                            </CustomScrollbar>
                        )}
                        {!lessLg && <Box sx={{ background: theme.palette.divider }}></Box>}
                        <Box sx={{ position: lessLg ? "static" : "relative" }}>
                            <Box className="grid" sx={{ gridTemplateRows: "auto minmax(0, 1fr)", height: "100%" }}>
                                {!lessLg && projectsNavigationElement}
                                <Box sx={{ display: "grid", gridTemplateRows: "minmax(0, 1fr)", height: "100%" }}>
                                    <AnimatePresence mode="sync">
                                        {content.current[lang] ? (
                                            <motion.div
                                                key={`${slug}-content`}
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    opacity: 1,
                                                    clipPath: [
                                                        !swapDir
                                                            ? "circle(75% at 50% -300%)"
                                                            : swapDir == "left"
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
                                                    transition: { duration: 0.5 },
                                                }}
                                                style={{ gridArea: "1/1/1/1", height: "100%" }}
                                            >
                                                <CustomScrollbar top="5px" bottom="5px" right="4.5px">
                                                    {
                                                        <Box
                                                            className={classes({
                                                                "container mx-auto": screenMode.full,
                                                            })}
                                                            sx={{
                                                                width: "100%",
                                                                "&.container": {
                                                                    width: "calc(min(100%, 1500px))",
                                                                },
                                                                padding: "15px",
                                                                "& p": {
                                                                    textIndent: "40px",
                                                                    textAlign: "justify",
                                                                },
                                                                [theme.breakpoints.down("md")]: {
                                                                    padding: "0 15px 15px",
                                                                },
                                                                "@media (max-width: 500px)": {
                                                                    "& p": {
                                                                        hyphens: "auto",
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            {!lessLg && projectCarousel}
                                                            {content.current[lang]}
                                                        </Box>
                                                    }
                                                </CustomScrollbar>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key={`${slug}-spinner`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.1, delay: swapDir ? 0.15 : 0 }}
                                                style={{ gridArea: "1/1/1/1", height: "100%" }}
                                            >
                                                <AppSpinner withoutBg={true} compact={true} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Box>
                            </Box>
                            {!lessLg && projectViewer}
                        </Box>
                    </OptionalCustomScrollbar>
                </motion.div>
                {lessLg && projectViewer}
            </Box>
        )
    );
}

export const Component = ProjectPage;
