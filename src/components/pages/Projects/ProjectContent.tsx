import { Box } from "@mui/material";
import { ReactNode, useEffect, useRef } from "react";
import { ProjectsList, isProjectSlug } from "./Projects";
import { getThemeColor } from "@/components/contexts/Theme";
import { useTheme } from "@mui/material";
import { ProjectCardImage } from "./ProjectCard";

export type ProjectContentProps = {
    onImageClick: (img: number) => void;
    children: ReactNode;
};

export type ProjectContentImageProps = {
    slug: ProjectsList;
    img: number;
    side?: "left" | "right";
};

export function ProjectContentImage({ img, side = "left", slug }: ProjectContentImageProps) {
    const theme = useTheme();
    if (!slug || !isProjectSlug(slug)) return null;
    return (
        <ProjectCardImage
            slug={slug}
            img={img}
            component="span"
            sx={{
                width: "380px",
                height: "200px",
                float: side,
                margin: side == "left" ? "15px 25px 15px 0px" : "15px 0px 15px 25px",
                borderRadius: "4px",
                border: `1px solid ${theme.palette.divider}`,
                "@media (max-width: 520px)": {
                    float: "none",
                    clear: "both",
                    margin: "15px auto",
                    display: "block",
                },
                [theme.breakpoints.down("sm")]: {
                    width: "340px",
                    height: "179px",
                },
                "@media (max-width: 375px)": {
                    width: "330px",
                    height: "173px",
                },
            }}
        />
    );
}

export function ProjectContent({ children, onImageClick }: ProjectContentProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const theme = useTheme();
    useEffect(() => {
        if (!onImageClick) return;
        rootRef.current?.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.matches("img[data-img-num]")) onImageClick(Number(target.getAttribute("data-img-num")));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Box sx={{ background: getThemeColor("layoutBackground", theme) }} ref={rootRef}>
            {children}
        </Box>
    );
}
