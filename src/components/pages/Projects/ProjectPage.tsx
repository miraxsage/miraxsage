import { Box, useTheme } from "@mui/material";
import ProjectsBreadcrumbs from "./ProjectsBreadcrumbs";
import { isProjectSlug } from "./Projects";
import { useParams } from "react-router-dom";
import ProjectInfoTable from "./ProjectInfoTable";
import CustomScrollbar from "@/components/Scrollbar";
import { LinkButton } from "@/components/DescriptionPanel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useAppearance } from "@/store/appearanceSlice";
import { AppSpinner } from "@/components/AppSpinner";
import { getLocatedProjects, getProjectsNavigationLink, useProjectsLocation } from "./projectsNavigation";

export default function ProjectPage() {
    const [refreshState, refresh] = useState<boolean>(false);
    const slug = useParams().slug!;
    const theme = useTheme();
    const lang = useAppearance().language;
    const content = useRef<{ ru: ReactNode; en: ReactNode; slug: string }>({ ru: null, en: null, slug });
    const curProjectLocation = useProjectsLocation();
    const locatedProjects = getLocatedProjects(curProjectLocation!, lang);
    const curProjIndex = locatedProjects.findIndex((p) => p.slug == slug);
    const prevProjSlug = curProjIndex < 0 ? "all" : curProjIndex == 0 ? null : locatedProjects[curProjIndex - 1].slug;
    const nextProjSlug =
        curProjIndex < 0
            ? "all"
            : curProjIndex == locatedProjects.length - 1
            ? null
            : locatedProjects[curProjIndex + 1].slug;
    useEffect(() => {
        if (content.current.slug != slug) content.current = { ru: null, en: null, slug };
        (async () => {
            try {
                const Module = await import(`@/components/pages/Projects/${slug}/${lang}.tsx`);
                content.current[lang] = <Module.Component />;
            } catch {
                content.current[lang] = lang == "ru" ? "Описание проекта отсутствует" : "Project's description absents";
            }
            refresh(!refreshState);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, slug]);
    return (
        slug &&
        isProjectSlug(slug) && (
            <Box className="grid h-full" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
                <ProjectsBreadcrumbs project={slug} />
                <Box className="grid h-full" sx={{ gridTemplate: "minmax(0, 1fr) / 1fr 1px 3fr" }}>
                    <CustomScrollbar>
                        <ProjectInfoTable project={slug} />
                    </CustomScrollbar>
                    <Box sx={{ background: theme.palette.divider }}></Box>
                    <Box className="grid" sx={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr auto 1fr",
                                "& .MuiSvgIcon-root": {
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
                                link={
                                    prevProjSlug
                                        ? getProjectsNavigationLink({ project: prevProjSlug }, curProjectLocation!)
                                        : undefined
                                }
                            >
                                {prevProjSlug && (
                                    <>
                                        <ArrowBackIcon />
                                        Предыдущий
                                    </>
                                )}
                            </LinkButton>
                            <LinkButton
                                borders="right-bottom-left"
                                link={getProjectsNavigationLink({ project: "all" }, curProjectLocation!)}
                            >
                                <RocketLaunchIcon />
                                Все проекты
                            </LinkButton>
                            <LinkButton
                                borders="bottom"
                                link={
                                    nextProjSlug
                                        ? getProjectsNavigationLink({ project: nextProjSlug }, curProjectLocation!)
                                        : undefined
                                }
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        margin: "0px 0px 0px 8px",
                                    },
                                }}
                            >
                                {nextProjSlug && (
                                    <>
                                        Следующий
                                        <ArrowForwardIcon />
                                    </>
                                )}
                            </LinkButton>
                        </Box>
                        {content.current[lang] ? (
                            content.current[lang]
                        ) : (
                            <Box
                                sx={{
                                    "& .loader-container": {
                                        minHeight: "unset",
                                    },
                                }}
                            >
                                <AppSpinner />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        )
    );
}

export const Component = ProjectPage;