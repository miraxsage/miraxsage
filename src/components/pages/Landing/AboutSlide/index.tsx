import { getThemeColor } from "@/components/contexts/Theme";
import { mix } from "@/utilities/colors";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import CodeBackground from "../CodeBackground";
import FloatingLine from "../FloatingLine";
import HelloBlock from "./HelloBlock";
import { ScrollObservable, useLandingColor } from "..";
import { useColorMode } from "@/store/appearanceSlice";
import AboutMeBlock from "./AboutMeBlock";
import SkillsBlock from "./SkillsBlock";
import ExperienceBlock from "./ExperienceBlock";
import TeamBlock from "./TeamBlock";
import { useEffect, useRef } from "react";
import { rangeProgress, round } from "@/utilities/math";
import AchievementsBlock from "./AchievementsBlock";

type AboutSlideProps = {
    scrollObservable?: ScrollObservable;
};

const blocks = {
    hello: HelloBlock,
    "about-me": AboutMeBlock,
    skills: SkillsBlock,
    experience: ExperienceBlock,
    achievements: AchievementsBlock,
    team: TeamBlock,
};

export function AboutSlide({ scrollObservable }: AboutSlideProps) {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const layoutBackgroundColor = getThemeColor("layoutBackground", theme);
    const rootRef = useRef<HTMLDivElement | undefined>();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
        if (!scrollObservable) return;
        scrollObservable.onChange(() => {
            if (!rootRef.current) return;
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            const halfvh = vh / 2;
            const pxToAboutSlide = halfvh + 0.1763269807 * vw;
            let mainPos = 0;
            let margin = "";

            const blocksKeys = Object.keys(blocks);
            const blocksElements: (HTMLElement | null)[] = [];
            const blocksInnerScrollHeights = blocksKeys.map((id) => {
                const block = rootRef.current?.querySelector(`#${id}-block`);
                blocksElements.push((block as HTMLElement) ?? null);
                if (!block) return 0;
                const delta = vh - block.children[0].getBoundingClientRect().height - 100;
                return delta < 0 ? -1 * delta : 0;
            });
            const scollingPlaceholder = document.querySelector("#about-scrolling-placeholder") as HTMLElement;
            scollingPlaceholder.style.height =
                blocksInnerScrollHeights.reduce((sum, cur) => sum + cur) + (blocksKeys.length - 1) * halfvh + "px";

            if (scrollObservable.scrollTop < halfvh) {
                mainPos = -rangeProgress(scrollObservable.scrollTop, 0, halfvh) * pxToAboutSlide;
                rootRef.current.style.position = "relative";
                blocksElements.forEach((el, i) => (el!.style.visibility = i == 0 ? "visible" : "hidden"));
            } else {
                let scroll = scrollObservable.scrollTop - halfvh;
                let hideRemined = false;
                for (let i = 0; i < blocksKeys.length; i++) {
                    const block = blocksElements[i]!;
                    const prevBlock = i > 0 ? blocksElements[i - 1] : null;
                    if (i > 0) {
                        if (hideRemined) {
                            prevBlock!.style.zIndex = "";
                            block.style.visibility = "hidden";
                            continue;
                        } else block.style.visibility = "visible";
                        if (scroll <= halfvh) {
                            const progress = scroll / halfvh;
                            block.style.translate = "0 " + (70 - round(70 * progress, 2)) + "%";

                            block.style.clipPath = `xywh(-20% -${
                                (1 - rangeProgress(progress, 0.2, 1)) * 125
                            }% 140% 125% round 0 0 100vw 100vw)`;
                            const smoothProgress = Math.sin((progress * Math.PI) / 2);
                            const smoothInProgress = 1.5 * progress ** 0.25 - 0.5;
                            prevBlock!.style.translate =
                                "0 -" + (halfvh * 0.7 * smoothProgress + blocksInnerScrollHeights[i - 1]) + "px";
                            prevBlock!.style.scale = (1 - 0.05 * smoothProgress).toString();
                            prevBlock!.style.opacity = (1 - Math.max(0, smoothInProgress * 1.5 - 0.5)).toString();
                            if (!smallScreen)
                                prevBlock!.style.filter = `blur(${rangeProgress(progress, 0.4, 1) * 10}px)`;
                            prevBlock!.style.zIndex = !hideRemined && progress < 0.5 ? "1" : "";
                            hideRemined = true;
                        } else {
                            block.style.translate = "0 0";
                            block.style.clipPath = "";
                            prevBlock!.style.opacity = "0";
                            prevBlock!.style.filter = "";
                            prevBlock!.style.zIndex = "";
                            scroll -= halfvh;
                        }
                    }
                    block.style.visibility = "visible";
                    if (!hideRemined) {
                        if (scroll <= blocksInnerScrollHeights[i]) {
                            block.style.translate = "0 -" + scroll + "px";
                            hideRemined = true;
                        } else {
                            block.style.translate = "0 -" + blocksInnerScrollHeights[i] + "px";
                            scroll -= blocksInnerScrollHeights[i];
                        }
                    }
                }
                if (scroll > 0 && !hideRemined) {
                    const lastBlock = blocksElements.at(-1)!;
                    const vhProgress = rangeProgress(scroll, 0, vh);
                    lastBlock.style.translate = "0 -" + (blocksInnerScrollHeights.at(-1)! + scroll * 0.5) + "px";
                    lastBlock.style.opacity = (1 - vhProgress).toString();
                    lastBlock.style.filter = `blur(${rangeProgress(scroll, halfvh * 0.5, vh) * 10}px)`;
                    lastBlock.style.scale = (1 - 0.1 * vhProgress).toString();
                }

                margin = -round(pxToAboutSlide, 2) + "px 0 0 0";
                rootRef.current.style.position = "sticky";
            }
            rootRef.current.style.top = round(mainPos, 2) + "px";
            rootRef.current.style.margin = margin;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollObservable]);
    return (
        <>
            <Box
                ref={rootRef}
                sx={{
                    position: "relative",
                    width: "100%",
                    height: 0,
                    minHeight: "calc(100dvh + 0.1763269807 * 100dvw)",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        overflow: "hidden",
                        height: "calc(100% + 0.1763269807 * 100dvw)",
                        translate: "0 calc(-0.1763269807 * 100dvw)",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            overflow: "hidden",
                            height: "150%",
                            transformOrigin: "100% 0%",
                            transform: "skew(0, -10deg)",
                            borderTop: `1px solid ${theme.palette.divider}`,
                            background: `linear-gradient(200deg, ${mix(
                                layoutBackgroundColor,
                                useLandingColor(isDarkMode ? "accentA" : "accentB"),
                                0.08
                            )}, ${layoutBackgroundColor} 50%)`,
                        }}
                    >
                        {!smallScreen && (
                            <Box sx={{ width: "100%", height: "100%", opacity: 0.7 }}>
                                <FloatingLine shift={-25} />
                                <FloatingLine shift={-10} />
                                <FloatingLine shift={0} />
                                <FloatingLine shift={15} />
                                <FloatingLine shift={25} />
                            </Box>
                        )}
                        <CodeBackground
                            sx={{
                                left: "unset",
                                maxHeight: "calc(0.1763269807 * 100vw * 1.5)",
                                textAlign: "right",
                                right: "-1%",
                                transformOrigin: "100% 0%",
                                transform: "skew(0, 10deg)",
                            }}
                        />
                    </Box>
                </Box>
                <CodeBackground
                    gradientOrientation="toTop"
                    sx={{
                        top: "unset",
                        bottom: 0,
                        maxHeight: "calc(0.1763269807 * 100vw * 1.5)",
                        left: "-1%",
                        transform: "translateY(0%)",
                    }}
                />
                <Box
                    className="container"
                    sx={{
                        position: "relative",
                        display: "grid",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100dvh",
                        margin: "0 auto",
                    }}
                >
                    {Object.entries(blocks).map(([id, Block]) => (
                        <Block key={id} id={`${id}-block`} />
                    ))}
                </Box>
            </Box>
            <Box id="about-scrolling-placeholder" sx={{ width: "100%", background: "transparent" }}></Box>
        </>
    );
}
