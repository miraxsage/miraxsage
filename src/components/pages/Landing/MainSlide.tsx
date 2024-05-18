import { Box, lighten, useTheme } from "@mui/material";
import FloatingLine from "./FloatingLine";
import FloatingBlock from "./FloatingBlock";
import { getThemeColor } from "@/components/contexts/Theme";
import { mix } from "@/utilities/colors";
import PersonIcon from "@mui/icons-material/Person";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LanguageIcon from "@/components/icons/LanguageIcon";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppearance, useColorMode, useLanguage } from "@/store/appearanceSlice";
import MiraxsageIcon from "@/components/icons/MiraxsageIcon";
import TelegramIcon from "@/components/icons/TelegramIcon";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GitHub } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AnimatedGeometricWaves } from "./AnimatedGeometricWaves";
// import { getGPUTier } from "detect-gpu";
import { GlobalStyles } from "@mui/material";
import __ from "@/utilities/transtation";
import { useLandingColor } from ".";
import TransparentButton from "./TransparentButton";
import { rangeProgress } from "@/utilities/common";

function TypingShield({ titles }: { titles: string[] }) {
    const [currentTitle, setCurrentTitle] = useState(0);
    const title = titles[Math.min(titles.length - 1, currentTitle)];
    const [typedSymbolsWithDirection, setTypedSymbols] = useState(title.length);
    const typedSymbols = Math.abs(typedSymbolsWithDirection);
    const [cursorShown, setCursorShown] = useState(false);
    const basicTypingDelay = 120;
    const theme = useTheme();
    useEffect(() => {
        let nextDelay = basicTypingDelay;
        const textTypingHandler = () => {
            setTypedSymbols((cur) => {
                const changeDirection = cur == title.length || cur == -1;
                if (changeDirection) {
                    cur = -1 * cur;
                    if (cur == 1) {
                        setCurrentTitle((currentTitleIndex) =>
                            currentTitleIndex >= titles.length - 1 ? 0 : currentTitleIndex + 1
                        );
                    }
                }
                const advancedDelay = cur == title.length - 1 ? 1800 : 0;
                nextDelay = advancedDelay != 0 ? advancedDelay : (cur < 0 ? 0.5 : 1) * basicTypingDelay;
                return changeDirection ? cur : cur + 1;
            });
            textTypingId = setTimeout(textTypingHandler, nextDelay);
        };
        let textTypingId = setTimeout(textTypingHandler, 300);

        return () => {
            clearTimeout(textTypingId);
        };
    }, [title, titles.length]);
    useEffect(() => {
        const cursorBlinkHandler = () => setCursorShown((cursorShown) => !cursorShown);
        const cursorBlinkIntervalId = setInterval(cursorBlinkHandler, 500);
        return () => {
            clearInterval(cursorBlinkIntervalId);
        };
    }, []);
    const typedTitle = title.slice(0, Math.min(typedSymbols, title.length) - 1);
    const isDarkMode = useColorMode().dark;
    const paleColor = useLandingColor(isDarkMode ? "accentAPale" : "contrast");
    return (
        <>
            {typedTitle}
            <Box
                sx={{
                    display: "inline",
                    borderRadius: "0 0 5px 5px",
                    ...(cursorShown || (typedSymbols > 1 && title.length != typedSymbols)
                        ? {
                              background: paleColor,
                              WebkitTextFillColor: getThemeColor("layoutBackground", theme),
                          }
                        : {}),
                }}
            >
                {title.slice(typedSymbols - 1, typedSymbols)}
            </Box>
        </>
    );
}

function WebDeveloperShield() {
    const isDarkMode = useColorMode().dark;
    let paleColor = useLandingColor(isDarkMode ? "accentAPale" : "contrast");
    paleColor = isDarkMode ? paleColor : lighten(paleColor, 0.3);
    const darkPaleColor = lighten(useLandingColor("accentA"), isDarkMode ? 0.4 : 0.4);
    const contrastColor = lighten(useLandingColor("contrast"), isDarkMode ? 0 : 0.2);
    const accentBLight = lighten(useLandingColor("accentB"), isDarkMode ? 0.2 : 0.5);
    const accentALight = lighten(useLandingColor("accentA"), isDarkMode ? 0.3 : 0.5);
    return (
        <Box
            sx={{
                fontSize: "57px",
                userSelect: "none",
                lineHeight: 1,
                background: `linear-gradient(45deg, ${contrastColor} 10%, ${darkPaleColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplate: "10px auto 10px auto 10px / 10px auto 10px 1fr 10px",
                }}
            >
                <Box
                    sx={{
                        border: "1px solid " + paleColor,
                        borderWidth: "2px 0px 0px 2px",
                        borderTopLeftRadius: "10px",
                    }}
                ></Box>
                <Box sx={{ border: "1px solid " + paleColor, borderWidth: "2px 0px 0px 0px" }}></Box>
                <Box
                    sx={{
                        border: "1px solid " + paleColor,
                        borderWidth: "2px 2px 0px 0px",
                        borderTopRightRadius: "10px",
                    }}
                ></Box>
                <Box sx={{ gridColumn: "2 span" }}></Box>
                <Box
                    sx={{
                        border: "1px solid",
                        borderImageSlice: 1,
                        borderImageSource: `linear-gradient(180deg, ${paleColor}, ${darkPaleColor})`,
                        borderWidth: "0px 0px 0px 2px",
                        gridArea: "2/1/5/1",
                    }}
                ></Box>
                <Box sx={{ gridArea: "2/2/span 2/span 1", padding: "0px 14px 0px 14px" }}>
                    <TypingShield titles={[__("Web"), "Frontend", "Fullstack"]} />
                </Box>
                <Box
                    sx={{
                        border: "1px solid " + paleColor,
                        borderWidth: "0px 2px 0px 0px",
                        marginBottom: "-2px",
                        gridArea: "2/3/2/3",
                    }}
                ></Box>
                <Box sx={{ gridColumn: "2 span" }}></Box>
                <div></div>
                <Box
                    sx={{
                        border: "1px solid " + paleColor,
                        borderWidth: "2px 0px 0px 0px",
                        gridArea: "3/4/3/4",
                    }}
                ></Box>
                <Box
                    sx={{
                        border: "1px solid " + paleColor,
                        borderWidth: "2px 2px 0px 0px",
                        borderTopRightRadius: "10px",
                        gridArea: "3/5/3/5",
                    }}
                ></Box>
                <Box sx={{ gridArea: "3/2/span 2/span 3", padding: "5px 14px 8px 14px" }}>{__("developer")}</Box>
                <Box
                    sx={{ border: "1px solid " + paleColor, borderWidth: "0px 2px 0px 0px", gridArea: "4/5/4/5" }}
                ></Box>
                <Box
                    sx={{
                        border: "1px solid " + darkPaleColor,
                        borderWidth: "0px 0px 2px 2px",
                        borderBottomLeftRadius: "10px",
                        gridArea: "5/1/5/1",
                    }}
                ></Box>
                <Box
                    sx={{
                        border: "1px solid " + paleColor,
                        borderImageSource: `linear-gradient(90deg, ${darkPaleColor}, ${accentALight} 25%, ${accentBLight} 75%, ${paleColor} 95%)`,
                        borderImageSlice: 1,
                        borderWidth: "0px 0px 2px 0px",
                        gridColumn: "span 3",
                        gridArea: "5/2/5/5",
                    }}
                ></Box>
                <Box
                    sx={{
                        border: "1px solid " + paleColor,
                        borderWidth: "0px 2px 2px 0px",
                        borderBottomRightRadius: "10px",
                        gridArea: "5/5/5/5",
                    }}
                ></Box>
            </Box>
        </Box>
    );
}

function SlideContent() {
    const lang = useAppearance().language;
    const isDarkMode = useColorMode().dark;
    const colorModeHook = useColorMode();
    const langHook = useLanguage();
    return (
        <Box
            className="container"
            sx={{
                position: "relative",
                margin: "0 auto",
                minHeight: "calc(100vh + 0.1763269807 * 100vw)",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100dvh" }}>
                <Box sx={{ padding: "100px 0px", position: "relative", top: "-100px" }}>
                    <Box
                        className="grid"
                        sx={{ justifyContent: "center", margin: "3vw 0", "& button": { fontSize: "22px" } }}
                    >
                        <Box className="flex">
                            <TransparentButton>
                                <PersonIcon />
                                {"\u00A0"}_{__("about")}
                            </TransparentButton>
                            <TransparentButton onClick={langHook.toggle}>
                                <LanguageIcon language={lang} />
                            </TransparentButton>
                            <TransparentButton onClick={colorModeHook.toggle}>
                                {!isDarkMode ? <Brightness4Icon /> : <LightModeIcon />}
                            </TransparentButton>
                            <TransparentButton dividerSize="collapsed">
                                <RocketLaunchIcon />
                                {"\u00A0"}_{__("projects")}
                            </TransparentButton>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Box sx={{ width: "400px", marginRight: "50px" }}>
                            <MiraxsageIcon contrast={true} />
                            <Box className="grid" sx={{ justifyContent: "center" }}>
                                <Box className="flex">
                                    <TransparentButton>
                                        <TelegramIcon />
                                    </TransparentButton>
                                    <TransparentButton>
                                        <AlternateEmailOutlinedIcon />
                                    </TransparentButton>
                                    <TransparentButton>
                                        <LinkedInIcon />
                                    </TransparentButton>
                                    <TransparentButton dividerSize="collapsed">
                                        <GitHub />
                                    </TransparentButton>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ fontFamily: "NeueMachina", fontSize: "90px", lineHeight: 1 }}>
                            <Box
                                sx={{
                                    display: "inline-block",
                                    background: `linear-gradient(25deg, ${useLandingColor(
                                        "accentA"
                                    )}, ${useLandingColor("accentB")})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                {__("Manin")}
                            </Box>
                            <Box
                                sx={{
                                    color: useLandingColor("contrast"),
                                    marginBottom: "50px",
                                }}
                            >
                                {__("Maxim")}
                            </Box>
                            <WebDeveloperShield />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

type MainSlideProps = {
    scrollProgress: number;
};

export default function MainSlide({ scrollProgress }: MainSlideProps) {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const pageBgColor = getThemeColor("pageBgColor", theme);
    const colorMode = useColorMode().mode;
    // useEffect(() => {
    //     (async () => {
    //         const gpuTier = await getGPUTier();
    //         console.log(gpuTier);
    //         // Example output:
    //         // {
    //         //   "tier": 1,
    //         //   "isMobile": false,
    //         //   "type": "BENCHMARK",
    //         //   "fps": 21,
    //         //   "gpu": "intel iris graphics 6100"
    //         // }
    //     })();
    // }, []);
    console.log("opa", scrollProgress, 1 - rangeProgress(scrollProgress, 10, 20));
    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                opacity: 1 - rangeProgress(scrollProgress, 7, 17),
                background: `linear-gradient(12deg, ${mix(pageBgColor, useLandingColor("accentB"), 0.08)}, ${
                    isDarkMode ? pageBgColor : "#ffffff"
                } 50%)`,
            }}
        >
            <GlobalStyles
                styles={{
                    "@keyframes rotate-by-circle": {
                        from: { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
                        to: { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
                    },
                    "@keyframes swing-waves": {
                        "0%": { transform: "translate(-10%, -5%) rotate(-20deg) scaleX(1)" },
                        "50%": { transform: "translate(15%, 0%) rotate(15deg) scaleX(1.5)" },
                        "100%": { transform: "translate(-10%, -5%) rotate(-20deg) scaleX(1)" },
                    },
                }}
            />
            <FloatingBlock />
            <FloatingLine shift={-25} />
            <FloatingLine shift={-10} />
            <FloatingLine shift={0} />
            <FloatingLine shift={15} />
            <FloatingLine shift={25} />
            <AnimatedGeometricWaves
                key={`waves-${colorMode}-1`}
                singleRender={true}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "150%",
                    height: "100vh",
                    animation: "rotate-by-circle 120s linear infinite",
                    "&>canvas": {
                        animation: "swing-waves 120s ease-in-out infinite",
                    },
                }}
            />
            <AnimatedGeometricWaves
                key={`waves-${colorMode}-2`}
                singleRender={false}
                sx={{
                    position: "absolute",
                    translate: "-5% -10%",
                    rotate: "-10deg",
                    top: 0,
                    left: 0,
                    width: "150%",
                    height: "100vh",
                }}
            />
            <AnimatedGeometricWaves
                key={`waves-${colorMode}-3`}
                singleRender={false}
                sx={{
                    position: "absolute",
                    translate: "-5% -10%",
                    rotate: "10deg",
                    top: 0,
                    left: 0,
                    width: "150%",
                    height: "100vh",
                }}
            />
            <SlideContent />
        </Box>
    );
}
