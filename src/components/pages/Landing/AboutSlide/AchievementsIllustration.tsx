import { useColorMode } from "@/store/appearanceSlice";
import { Box, SxProps, alpha, darken, lighten } from "@mui/material";
import { useLandingColor } from "..";

const AchievementIllustration = ({ sx }: { sx?: SxProps }) => {
    const isDarkMode = useColorMode().dark;
    const accentColor = lighten(useLandingColor(isDarkMode ? "accentB" : "accentA"), isDarkMode ? 0.1 : 0.5);
    const maxPaleBackgroundColor = alpha(useLandingColor("contrast"), isDarkMode ? 0.03 : 0.13);
    const borderColor = isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(156, 159, 171, 0.5)";
    const darkColor = darken(useLandingColor(isDarkMode ? "noteless" : "contrast"), isDarkMode ? 0 : 0.5);
    return (
        <Box sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.9 481.53">
                <g data-name="Background Simple">
                    <path
                        d="M430.79 105a151.56 151.56 0 0 0-10.68-15.59c-31.63-40.45-73-57.56-120.24-69-48.79-11.9-105.93-15.63-152.77 5.78-11 5-21.49 11.79-29.81 20.94-31.29 34.45-42.08 92.17-77 137.8S-11.64 287.34 19.7 341.34c13.3 22.85 30.17 41.71 50.18 58.25 24.64 20.37 45.89 47.84 74.36 63.73C174.16 480 214 485.86 247.13 478.21c37.78-8.74 59.94-43.45 88.78-67.13 22.74-18.66 49.94-30.88 72.22-50.13 34.13-29.49 60-76.9 55.68-123.89-4.19-45.58-9.63-93-33.02-132.06Z"
                        style={{
                            fill: maxPaleBackgroundColor,
                        }}
                    />
                </g>
                <path
                    d="M344.37 335.44c3.29 2.21 12.05 3.61 12.06 3.61s-.84-6.06-.94-6.43c-1.18-4.36-6-12.08-11.08-12.31a6 6 0 0 0-6.07 6.51c.2 3.56 3.23 6.74 6.03 8.62Z"
                    style={{
                        fill: borderColor,
                    }}
                />
                <path
                    d="M370 445.11v.6l3 1.9v-2.51c0-2.43-.12-5-.23-7.7a63 63 0 0 0 7.39-1.95c2 3.22 8 7.63 8.74 8.2-1.28 2-2.55 4-3.78 5.79q-1.26 1.89-2.46 3.61l3.3.61c.54-.84 1.1-1.69 1.66-2.57 1.32-2 2.68-4.26 4.06-6.55.9.37 8.27 3.32 12 3.17 3.37-.15 7.62-1.26 9.66-4.2a6 6 0 0 0-1.77-8.72c-4.42-2.44-12.59 1.6-15.88 4.69-.2.18-2.08 2.39-3.25 3.81.56-.94 1.12-1.84 1.68-2.81 1.13-1.91 2.19-3.86 3.35-5.94.52-1 1-2.07 1.59-3.11s1-2.19 1.51-3.29c1.13-2.57 2.15-5.24 3.12-7.94 1.68 1 7.69 4.38 11.06 4.76s7.72-.09 10.17-2.68a6 6 0 0 0-.42-8.9c-4-3.08-12.69-.33-16.41 2.23-.23.16-2.7 2.3-4 3.5.57-1.64 1.15-3.26 1.67-4.93 1.52-4.82 2.9-9.74 4.3-14.65.42-1.51.87-3 1.31-4.49.59.35 7.64 4.55 11.41 5 3.36.37 7.73-.09 10.18-2.68a6 6 0 0 0-.42-8.89c-4-3.09-12.69-.33-16.41 2.23-.28.19-3.82 3.27-4.68 4.09 1-3.29 2-6.57 3.07-9.75a105.55 105.55 0 0 1 5.26-12.61c.28.16 7.62 4.58 11.48 5 3.36.37 7.73-.09 10.18-2.68a6 6 0 0 0-.42-8.89c-4-3.09-12.69-.33-16.41 2.22-.29.2-4.1 3.52-4.75 4.17.12-.24.22-.5.34-.73a77 77 0 0 1 7.45-11.52c1.54-2 3.12-3.84 4.69-5.58 1.29 1 7.2 5.29 10.63 6.06s7.69.76 10.41-1.54a6 6 0 0 0 .56-8.89c-3.64-3.5-12.58-1.72-16.56.41-.22.12-2.28 1.54-3.78 2.6.73-.78 1.46-1.59 2.17-2.32 2.65-2.76 5.25-5.12 7.57-7.19 1.32-1.16 2.55-2.19 3.7-3.14 1.75.29 8.83 1.36 12.17.48s7.17-2.87 8.52-6.17a6 6 0 0 0-3.59-8.14c-4.85-1.44-12 4.26-14.51 8-.22.32-3.08 5.76-3 5.77h.1c-1.13.89-2.33 1.86-3.62 2.95-2.37 2-5 4.33-7.74 7a105.72 105.72 0 0 0-8.37 9.15 78.11 78.11 0 0 0-7.81 11.55 1 1 0 0 0-.07.15c.29-1.45 1-5.54 1-5.86.24-4.51-2-13.36-6.69-15.15a6 6 0 0 0-7.8 4.29c-.92 3.45 1 7.42 3.05 10.08 2.33 3 9.64 6.82 10.22 7.13a106.31 106.31 0 0 0-5.74 12.91c-1 2.57-1.85 5.19-2.7 7.84.21-1.27.39-2.4.4-2.56.23-4.51-2-13.36-6.69-15.15a6 6 0 0 0-7.8 4.29c-.93 3.45 1 7.41 3 10.08s8.26 6.08 9.9 7c-.31 1-.64 2-1 3-1.5 4.89-3 9.76-4.59 14.5-.56 1.67-1.18 3.3-1.79 4.93.19-1.13.34-2.07.35-2.22.23-4.51-2-13.35-6.7-15.15a6 6 0 0 0-7.79 4.3c-.93 3.44 1 7.41 3 10.07s7.66 5.75 9.61 6.8c-.68 1.65-1.35 3.3-2.08 4.87-.52 1.06-.95 2.11-1.53 3.14s-1.11 2.07-1.66 3.08c-1.12 1.92-2.26 3.9-3.4 5.75-.79 1.28-1.56 2.5-2.33 3.72.58-1.66 1.65-4.92 1.7-5.21a23.16 23.16 0 0 0-1-11.67 7.31 7.31 0 0 0 .15-1.32 6 6 0 0 0-6.28-6.3c-5 .4-9.63 8.28-10.66 12.67-.06.26-.41 3.14-.6 5-.06-1.09-.09-2.15-.16-3.27-.12-2.22-.3-4.43-.48-6.8-.13-1.15-.26-2.31-.4-3.47s-.37-2.38-.55-3.58c-.47-2.77-1.09-5.56-1.77-8.35 1.94-.1 8.83-.58 11.84-2.13s6.39-4.33 7-7.84a6 6 0 0 0-5.26-7.19c-5-.37-10.77 6.73-12.46 10.91-.1.26-1 3.4-1.43 5.14-.42-1.68-.84-3.35-1.32-5-1.4-4.86-3-9.73-4.5-14.59-.48-1.49-.93-3-1.39-4.47.69 0 8.89-.42 12.27-2.15 3-1.54 6.39-4.33 7-7.85a6 6 0 0 0-5.26-7.18c-5-.37-10.77 6.72-12.46 10.91-.13.31-1.38 4.83-1.64 6-1-3.28-2-6.56-2.82-9.84a107 107 0 0 1-2.57-13.42c.33 0 8.89-.38 12.34-2.15 3-1.54 6.4-4.33 7-7.85a6 6 0 0 0-5.25-7.18c-5.05-.37-10.77 6.72-12.46 10.91-.14.33-1.48 5.19-1.66 6.09 0-.26-.1-.53-.13-.79a78.6 78.6 0 0 1-.1-13.7c.18-2.52.48-4.92.84-7.25 1.6.1 8.92.45 12.21-.8s6.83-3.61 7.83-7a6 6 0 0 0-4.44-7.72c-5-.92-11.44 5.5-13.58 9.48-.12.22-1.06 2.54-1.72 4.25.18-1.05.33-2.14.52-3.14.7-3.75 1.56-7.15 2.35-10.16.47-1.71.92-3.24 1.36-4.67 1.62-.72 8.11-3.73 10.41-6.31s4.4-6.35 3.71-9.85a6 6 0 0 0-7.5-4.81c-4.83 1.48-7.61 10.16-7.68 14.68 0 .39.6 6.5.68 6.46h.1c-.45 1.36-.91 2.83-1.39 4.45-.86 3-1.8 6.38-2.58 10.14a106 106 0 0 0-1.84 12.08 78.75 78.75 0 0 0-.19 13.87.88.88 0 0 0 0 .16c-.56-1.37-2.25-5.15-2.41-5.43-2.29-3.89-9-10.05-13.94-8.94a6 6 0 0 0-4.13 7.88c1.13 3.39 4.9 5.65 8.09 6.72 3.6 1.22 11.81.38 12.46.31a104.83 104.83 0 0 0 2.34 13.94c.62 2.67 1.32 5.35 2.06 8-.52-1.17-1-2.21-1.07-2.35-2.3-3.89-9-10.05-13.94-8.94a6 6 0 0 0-4.14 7.88c1.13 3.39 4.9 5.65 8.1 6.72s10.25.52 12.1.35c.3 1 .58 2 .88 3.07 1.44 4.9 2.89 9.79 4.17 14.62.45 1.71.83 3.4 1.22 5.1-.46-1-.86-1.91-.94-2-2.29-3.89-9-10.05-13.94-8.95a6 6 0 0 0-4.13 7.89c1.13 3.38 4.9 5.64 8.1 6.72s9.56.57 11.76.37c.35 1.75.7 3.5.95 5.21.15 1.17.38 2.29.46 3.47s.21 2.33.32 3.48c.12 2.22.26 4.5.33 6.67.05 1.51.08 2.94.11 4.39-.43-1.7-1.34-5-1.45-5.28-1.68-4.19-7.38-11.31-12.42-11a6 6 0 0 0-5.28 7.17c.6 3.52 4 6.32 7 7.87 3.3 1.71 11.21 2.14 12.19 2.19.01 2.42.06 4.75.01 6.95Z"
                    style={{
                        fill: borderColor,
                    }}
                />
                <path
                    d="M432.31 353.47c.07.06 2.65-5.51 2.77-5.88 1.41-4.29 1.63-13.4-2.46-16.38a6 6 0 0 0-8.62 2.09c-1.8 3.07-1 7.4.28 10.51 1.48 3.66 8.02 9.66 8.03 9.66ZM121.3 337.88c-3.22 2.16-11.8 3.53-11.81 3.53s.82-5.93.92-6.3c1.16-4.27 5.91-11.83 10.85-12.06a5.86 5.86 0 0 1 5.94 6.38c-.2 3.49-3.2 6.57-5.9 8.45Z"
                    style={{
                        fill: borderColor,
                    }}
                />
                <path
                    d="M96.16 445.29v.59l-3 1.86v-2.46c0-2.39.11-4.93.22-7.54a62.71 62.71 0 0 1-7.23-1.92c-2 3.16-7.81 7.48-8.57 8 1.26 2 2.51 3.9 3.71 5.68.83 1.23 1.63 2.41 2.41 3.54l-3.23.59c-.54-.82-1.08-1.65-1.63-2.52-1.29-2-2.63-4.17-4-6.41-.88.36-8.1 3.25-11.73 3.1-3.3-.14-7.47-1.23-9.46-4.11a5.85 5.85 0 0 1 1.73-8.54c4.33-2.4 12.34 1.56 15.56 4.59.19.18 2 2.35 3.18 3.73-.55-.91-1.09-1.8-1.64-2.75-1.11-1.87-2.15-3.78-3.29-5.82l-1.55-3.05c-.54-1-1-2.13-1.48-3.21-1.11-2.52-2.11-5.13-3.06-7.78-1.65 1-7.53 4.29-10.83 4.66s-7.56-.09-10-2.63a5.86 5.86 0 0 1 .41-8.71c3.92-3 12.43-.32 16.07 2.19.23.15 2.64 2.24 3.95 3.42-.56-1.6-1.13-3.19-1.64-4.83-1.48-4.72-2.83-9.54-4.2-14.35-.42-1.47-.86-2.93-1.29-4.4-.58.35-7.49 4.47-11.18 4.87-3.28.37-7.56-.08-10-2.62a5.86 5.86 0 0 1 .42-8.71c3.92-3 12.43-.32 16.07 2.18.27.19 3.74 3.21 4.58 4-.94-3.23-1.92-6.44-3-9.56a102.58 102.58 0 0 0-5.15-12.35c-.27.17-7.46 4.49-11.25 4.91-3.28.36-7.56-.09-10-2.63a5.85 5.85 0 0 1 .41-8.7c3.92-3 12.43-.33 16.08 2.18.28.19 4 3.44 4.64 4.08-.12-.23-.21-.49-.33-.72A74.79 74.79 0 0 0 39.73 362c-1.5-2-3-3.76-4.59-5.47-1.26.94-7 5.19-10.41 5.94s-7.53.75-10.19-1.51a5.86 5.86 0 0 1-.55-8.7c3.57-3.44 12.32-1.69 16.22.4.21.11 2.23 1.51 3.69 2.54-.7-.76-1.42-1.56-2.11-2.27-2.6-2.7-5.15-5-7.42-7-1.3-1.14-2.49-2.15-3.63-3.08-1.71.29-8.64 1.33-11.91.47s-7-2.81-8.35-6a5.86 5.86 0 0 1 3.52-8c4.75-1.4 11.71 4.19 14.21 7.84.21.31 3 5.63 2.93 5.65h-.1c1.1.87 2.28 1.82 3.54 2.88 2.32 2 4.92 4.24 7.59 6.89a104.43 104.43 0 0 1 8.2 9A77.21 77.21 0 0 1 48 372.67a1 1 0 0 1 .07.15c-.28-1.42-1-5.43-1-5.74-.23-4.41 1.92-13.08 6.55-14.84a5.87 5.87 0 0 1 7.64 4.21c.9 3.38-1 7.26-3 9.86-2.29 2.94-9.44 6.69-10 7a104.07 104.07 0 0 1 5.61 12.64c.94 2.52 1.81 5.09 2.65 7.68-.2-1.24-.38-2.35-.39-2.5-.13-4.43 2-13.13 6.63-14.85a5.85 5.85 0 0 1 7.63 4.2c.91 3.38-1 7.26-3 9.87s-8.09 6-9.7 6.82c.31 1 .64 2 .94 3 1.48 4.78 2.93 9.56 4.5 14.2.55 1.64 1.15 3.23 1.75 4.82-.18-1.1-.33-2-.33-2.17-.23-4.41 1.92-13.08 6.55-14.84a5.86 5.86 0 0 1 7.64 4.21c.9 3.37-1 7.26-3 9.86s-7.51 5.64-9.41 6.67c.66 1.61 1.32 3.23 2 4.76.51 1 .93 2.07 1.5 3.09s1.09 2 1.62 3c1.1 1.88 2.22 3.82 3.34 5.63.77 1.26 1.52 2.44 2.28 3.64-.57-1.62-1.61-4.82-1.67-5.1a22.76 22.76 0 0 1 1-11.43 7.09 7.09 0 0 1-.15-1.29 5.87 5.87 0 0 1 6.24-6.22c4.93.4 9.42 8.11 10.44 12.42.06.25.4 3.08.59 4.86 0-1.06.08-2.1.15-3.2.11-2.17.29-4.33.47-6.66.13-1.12.26-2.26.39-3.4s.36-2.32.54-3.5c.46-2.71 1.07-5.44 1.74-8.18-1.91-.1-8.65-.57-11.6-2.08S79 405 78.34 401.6a5.86 5.86 0 0 1 5.15-7c4.94-.35 10.55 6.59 12.2 10.69.11.26 1 3.33 1.4 5 .42-1.64.83-3.28 1.3-4.93 1.37-4.75 2.9-9.52 4.41-14.28.46-1.46.91-2.92 1.36-4.38-.68 0-8.71-.41-12-2.11-2.93-1.51-6.26-4.24-6.86-7.68a5.86 5.86 0 0 1 5.15-7c4.94-.36 10.54 6.59 12.2 10.69.13.31 1.35 4.73 1.61 5.87 1-3.21 2-6.42 2.76-9.63a102.87 102.87 0 0 0 2.51-13.14c-.31 0-8.7-.38-12.08-2.11-2.94-1.51-6.26-4.25-6.87-7.69a5.86 5.86 0 0 1 5.15-7c4.94-.35 10.55 6.59 12.2 10.69.13.32 1.45 5.09 1.63 6 0-.26.09-.52.12-.78a75.32 75.32 0 0 0 .1-13.41c-.17-2.47-.47-4.82-.82-7.1-1.57.09-8.74.44-12-.79s-6.69-3.53-7.66-6.88a5.85 5.85 0 0 1 4.36-7.63c4.87-.9 11.21 5.39 13.3 9.28.12.21 1 2.49 1.68 4.16-.17-1-.32-2.09-.51-3.07-.68-3.68-1.52-7-2.3-9.95-.45-1.67-.9-3.17-1.33-4.57-1.58-.71-7.94-3.66-10.19-6.19S90 310.4 90.67 307a5.86 5.86 0 0 1 7.33-4.74c4.74 1.45 7.47 9.95 7.53 14.37 0 .38-.59 6.37-.67 6.33h-.1c.45 1.34.9 2.78 1.37 4.36.84 2.93 1.76 6.25 2.53 9.93a104.22 104.22 0 0 1 1.89 12 75.5 75.5 0 0 1 .19 13.58.88.88 0 0 1 0 .16c.55-1.34 2.2-5.05 2.36-5.32 2.25-3.81 8.82-9.84 13.65-8.76a5.85 5.85 0 0 1 4 7.72c-1.1 3.32-4.8 5.53-7.92 6.59-3.53 1.19-11.57.37-12.21.3a102.36 102.36 0 0 1-2.29 13.65c-.6 2.62-1.29 5.24-2 7.86.51-1.15 1-2.17 1.05-2.3 2.25-3.81 8.83-9.85 13.66-8.76a5.85 5.85 0 0 1 4 7.72c-1.1 3.31-4.8 5.53-7.92 6.58s-10 .51-11.86.34c-.28 1-.56 2-.86 3-1.4 4.81-2.83 9.59-4.08 14.33-.44 1.67-.82 3.33-1.2 5 .46-1 .85-1.87.92-2 2.25-3.81 8.82-9.85 13.65-8.76a5.86 5.86 0 0 1 4 7.72c-1.11 3.32-4.8 5.53-7.93 6.59s-9.37.56-11.52.36c-.34 1.71-.68 3.43-.93 5.1-.15 1.15-.37 2.24-.45 3.4s-.21 2.28-.31 3.41c-.12 2.17-.26 4.41-.32 6.53-.06 1.48-.08 2.88-.11 4.3.42-1.67 1.31-4.91 1.42-5.18 1.64-4.1 7.22-11.06 12.16-10.72a5.85 5.85 0 0 1 5.17 7c-.59 3.44-3.9 6.19-6.83 7.7-3.23 1.67-11 2.1-12 2.15.12 2.31.1 4.59.12 6.75Z"
                    style={{
                        fill: borderColor,
                    }}
                />
                <path
                    d="M35.17 355.54c-.07.06-2.59-5.4-2.71-5.76-1.39-4.2-1.6-13.13 2.4-16a5.86 5.86 0 0 1 8.48 2c1.76 3 1 7.25-.27 10.3-1.49 3.58-7.89 9.45-7.9 9.46Z"
                    style={{
                        fill: borderColor,
                    }}
                />
                <ellipse
                    cx={238.43}
                    cy={455.69}
                    rx={236.98}
                    ry={11.95}
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <g data-name="Geometric Shapes 4">
                    <path
                        d="M437.41 257.44a33.59 33.59 0 1 0 .68 6.76"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="M346.82 222.96h115.34v7.69H346.82zM360.16 197.12h-10.98v25.84h25.83v-25.84h-10.27M432.1 210.82h12.14v12.14H432.1zM444.34 210.82h12.14v12.14h-12.14zM438.27 198.6h12.14v12.14h-12.14z"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                </g>
                <g data-name="Geometric Shapes 3">
                    <path
                        d="m393.19 20.08-8.46 14.65h39.53L404.49.5l-9.34 16.18"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <circle
                        cx={404.49}
                        cy={57.68}
                        r={22.45}
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-51.49 404.522 57.67)"
                    />
                    <path
                        d="M351.87 80.51h105.26v6.42H351.87z"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="M422.7 116.53v25.19h-36.41V86.86h36.41v23.96"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                </g>
                <g data-name="Geometric Shapes 2">
                    <path
                        d="m45.48 270.93-12.21 21.15h77.47l-38.73-67.1-24.89 43.12"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <circle
                        cx={118.77}
                        cy={204.86}
                        r={15.2}
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-49.26 118.768 204.858)"
                    />
                    <circle
                        cx={27.42}
                        cy={204.86}
                        r={15.2}
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-22.62 27.41 204.849)"
                    />
                    <path
                        d="M86.05 220.03H7.64v4.41h129.8v-4.41H91.37"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                </g>
                <g data-name="Geometric Shapes 1">
                    <path
                        d="m88.99 111.86 11.8-20.44h-56.5l28.25 48.93 14.71-25.47M58.1 63.24l-6.62 6.62 21.06 21.05L93.6 69.86 72.54 48.8 61.52 59.82M42.78 42.47h59.52v5.95H42.78z"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <circle
                        cx={72.54}
                        cy={25.36}
                        r={16.85}
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-9.22 72.535 25.384)"
                    />
                </g>
                <circle
                    cx={237.02}
                    cy={408.04}
                    r={53.8}
                    style={{
                        fill: lighten(darkColor, isDarkMode ? 0.15 : 0.3),
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M289.61 396.74A53.79 53.79 0 1 0 184.8 421c23.14-13.3 60.87-28.95 104.81-24.26Z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m417.01 376.67-360.84-24.4 14.97-16.97 333.32 22.53 12.55 18.84z"
                    style={{
                        fill: accentColor,
                        stroke: "pink",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M55.68 364.49h361.66v6.21H55.68z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                    transform="rotate(3.87 236.438 367.459)"
                />
                <path
                    d="M155.69 129.51s-9.57 5.61-10.34 5.85-12.29 2.74-15.66 4.95-33.43 22.33-35.49 23.3-3.08.94-3.84.66-11.87-4.12-15.13-6.27-6-4.23-5.81-1.68 3.71 4.17 4.46 4.7l3 2.12s-2.32.13-7.93 0-11.9-1.77-10.43.56 6.36 2.5 7.88 2.54a69.76 69.76 0 0 1 7 1.27l-13.3 3.84a1.07 1.07 0 0 0 .1 2.08 8.24 8.24 0 0 0 2.41.07C67 173.1 79 172.13 79 172.13s-9.37 4.49-10.67 5.48-2.63 3.24 1.22 2.32 16-5.34 16-5.34l3 1.61s-1.71 3.07-3.79 4.12-4.61 2.9-3.81 3.89 5.25-1.11 9-1.29 8.07-9.68 9.6-10.19 62-23.83 62-23.83Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M404.48 150.62s3.27.34 2.31 2-6.13 1.32-6.13 1.32 3.43 1.63 1.58 2.11-6.15-.42-6.68-.43 8.92-5 8.92-5Z"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M309.52 133.84s3.53 1.34 13.94 4.63 35.54 16.92 40.44 19.36 6.71 1.95 7.61 1.79 12.11-7.34 14.82-8.88 6.61-1.25 6.61-1.25l5-.41a10.21 10.21 0 0 0 4.3-1.31c2.71-1.36 3.94-1 3.36 1a9.25 9.25 0 0 1-4.94 5.22 40.78 40.78 0 0 0-7.59 4.61c-2.18 1.72-4.62 6.64-4.62 6.64s9.11-1.19 11.81-2.37 2.06 2.73.24 4.28-7.15 1.42-8.05 1.93a17.16 17.16 0 0 1-7 2.49c-4.11.61-16.12-2.72-17.72-2.76s-29.92-6.46-41.08-8.17-14.87-3.4-19.94-6.91-7.17-5-7.17-5Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M401.27 148s-8.62 5.89-12.73 6.5"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M341.56 343.5s4.76 15.25 7.37 19.55 13.6 12.76 18.81 10.17 1.64-16.91-2.47-21.86-12.75-10.31-12.75-10.31ZM141.71 324.19a136.48 136.48 0 0 0-17.92 14.37c-7.76 7.67-11.07 18.78-2.63 19.91s15-6.58 17.2-9.86 9.31-9.14 9.31-9.14 5.76-.16 7.07-4.36a41.83 41.83 0 0 0 1.46-9.65Z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m187.92 189.38-8.28 21.38s-29.45 39.2-35.77 49.63-6.63 11-7.74 18.87 1 48.44 2.72 50.3c0 0 11.17.89 18.78-.73s8.78-13.59 9.38-19.11c.86-8 .68-21.79 4.48-28.65s8.51-14.61 8.51-14.61 33.55-22.15 38.43-23.84 18.16.16 22.68.88 43.45 40.75 45.18 44.12 48.21 58.12 48.21 58.12a52.85 52.85 0 0 0 12.39.92c5.46-.47 11.24-1.53 11.24-1.53S347.81 332 345 322.27s-21-32.75-25-42.54-19.36-33.5-28.72-46.15-28.62-29.18-29.2-30.1-2.6-5.89-2.6-5.89Z"
                    style={{
                        fill: accentColor,
                    }}
                />
                <path
                    d="M345 322.27c-1.88-6.61-10.85-19.3-17.68-29.84v2.15c.16 8.88-8.06 13.68-22.44 2.9s-27.38-30.79-27.38-30.79l3.94 12.06-26.22-28.05 3.28 7.41.12.38c12.33 12 26.67 27.12 27.71 29.13 1.73 3.38 48.21 58.12 48.21 58.12a52.85 52.85 0 0 0 12.39.92c5.46-.47 11.24-1.53 11.24-1.53S347.81 332 345 322.27Z"
                    style={{
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        opacity: 0.19,
                    }}
                />
                <path
                    d="M302.62 299.34c4.57 4 8.91 7.22 11.86 8.36M281.51 278.75s8.33 9 17.07 17M334.19 324.77a56 56 0 0 0 5.95 2.61M303 303.33s13.12 11.1 26.07 18.66M212.84 232.65c2.53 2.49 4.73 4.6 6 5.74M195.86 215.41s6.84 7.08 13.26 13.53M194.86 207.22s12 13.92 15.89 17.95M253.27 216.2l-8.1 10.13M258.66 209.44l-3.03 3.8M255.98 219.67l-12.79 15.11M214 218a45.16 45.16 0 0 0 34-2.77"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <g
                    style={{
                        opacity: 0.19,
                    }}
                >
                    <path
                        d="m170.85 258.66 25.84-4.49-38 19.61 14.55-1.14s-20.15 18.86-27.87 12.91 1.63-29.62 1.63-29.62l-.08-.23c-1.27 1.88-2.32 3.48-3.06 4.69-6.31 10.43-6.63 11-7.74 18.87s1 48.44 2.72 50.3c0 0 11.17.89 18.78-.73s8.7-13.6 9.38-19.11c.83-6.73.68-21.79 4.48-28.65s8.52-14.61 8.52-14.61 33.55-22.15 38.43-23.84Z"
                        style={{
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                </g>
                <path
                    d="M176.21 268.51s-12.16 10.57-21.14 16.49M152.64 292.29a49 49 0 0 1-6.32 2.64M167.75 280.53a45.37 45.37 0 0 1-12.38 10.28"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m187.92 189.38-8.28 21.38s-29.45 39.2-35.77 49.63-6.63 11-7.74 18.87 1 48.44 2.72 50.3c0 0 11.17.89 18.78-.73s8.71-13.59 9.38-19.11c.86-7.11.68-21.79 4.48-28.65s8.51-14.61 8.51-14.61 33.55-22.15 38.43-23.84 18.16.16 22.68.88 43.45 40.75 45.18 44.12 48.21 58.12 48.21 58.12a52.85 52.85 0 0 0 12.39.92c5.46-.47 11.24-1.53 11.24-1.53S347.81 332 345 322.27s-21-32.75-25-42.54-19.36-33.5-28.72-46.15-28.62-29.18-29.2-30.1-2.6-5.89-2.6-5.89Z"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M223.64 102s-16.92 2.67-24.33 4.81-46 19.35-46 19.35-.69 4.43 1.8 13a46.76 46.76 0 0 0 7.94 15.11l24.48-11 2.52.07 1.34 32.55-3.48 13.47s6.53 17.21 23.81 22.68S246 211 250.17 208.2s8.53-8.11 9.37-10.61c.31-.93-1.2-5.83-.24-13.53 1.59-12.75 5.81-30.47 5.81-30.47l6.83-9.7 22.32 13.35s13-14.77 19.21-24.49c0 0-25-15.16-35.1-20.64a88 88 0 0 0-29.3-10.11c-9.91-1.54-25.43 0-25.43 0Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m281.08 136.11-9.14 7.78 16.5-6.63M190.06 143.36l15.63 1.11M200.61 150.21a28.81 28.81 0 0 0 3 1.27M192.5 145.1a48.63 48.63 0 0 0 4.84 3.32M210.08 180.7c6.49 7.22 17.31 18.33 26.54 23.35M204.3 174s1.17 1.44 3.15 3.73M210.38 187.32a25.07 25.07 0 0 0 10.68 9.58"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m228.21 135.23 5.16 18.14-10.27 68.66 8.95 13.59 8.69-14.49-3.7-67.67 10.08-15.81-9.68-7.61-9.23 5.19z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M223.94 105.11a26.82 26.82 0 0 0-3.36 10.56c-.54 6-.19 15.1-1.22 17.59s-3.45 6.11-2.31 6.91 9-2.48 11.32-3.58a26.52 26.52 0 0 1 6.43-1.59l9.8 3s10.63 8.4 11.45 6.49.45-20.18.45-20.18-2.3-13.75-8.16-19.32-20.21-4.42-24.4.12Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M230 126.75s1.7 9.15 3.54 13.07 4.16 3.59 5.35 2.65 4-6.09 4-6.09Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M222.52 93.61s3.47-11.48 4.94-16 6.95-5.49 6.95-5.49 4-7.16 14.41-4.63 17.69 8.85 18.86 7.52.33-4.08 3.25-2.87 8.15 9.51 6.45 13.77l-1.69 4.27s6.39-1.65 4.91 3.07-10.15 6.78-10.15 6.78l-4.65 4.42a31.93 31.93 0 0 1-16.73-2.45c-8.29-3.84-9.34-7-10.52-5.49s-.29 2.49-4.19 4.21-8.68 2.5-10.43 0-1.41-7.11-1.41-7.11Z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M226 98.24s-.52-6.37-3.51-4.63-2.1 11.29-1.25 13.35 4.26 2.15 4.26 2.15 0 7.94.64 10.45 5.52 14.89 10.42 18.19 10.86 1.41 12.47.54 8.85-9.07 10.5-11.53 5.3-12.34 7-15.7a95.59 95.59 0 0 0 3.91-11 11.54 11.54 0 0 1-7.93-.66 46 46 0 0 1-6.93-3.8s6 4.91-.8 4.74-11.5-11.42-14.63-13.34-4.08.12-3.47 2.86.55 5.23-3.34 6.26-3.19.6-4.37 2.39-2.78 2.23-2.97-.27Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M234.88 105.39a1.64 1.64 0 0 1 0-1.79c.66-.75 3-2.23 7.6-1.35s4.56 2.3 3.77 3.31-4.48-.63-6.4-.55-3.7.67-4.97.38ZM264.2 112.59a2.06 2.06 0 0 0 .95-1.67c-.09-1-1.07-3.44-5.07-4.78s-4.74 0-4.68 1.27 3.76 1.52 5.19 2.49 2.48 2.36 3.61 2.69Z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M242.45 114.79c-.16 1.16-.94 2-1.74 1.9s-1.34-1.14-1.18-2.3.94-2 1.75-1.9 1.33 1.14 1.17 2.3ZM257.74 119.34c-.36 1.12-1.28 1.82-2.05 1.57s-1.12-1.36-.76-2.47 1.28-1.81 2.05-1.56 1.12 1.35.76 2.46Z"
                    style={{
                        fill: darkColor,
                    }}
                />
                <path
                    d="M243.7 126.52s2 2.23 3.93 1.77a4 4 0 0 0 2.89-2.75M237.31 125.85a8.53 8.53 0 0 0 6.8 4.66M246.57 116.08c-1.32 3.12-5.26 4.44-8.82 3s-5.38-5.24-4.07-8.37 5.26-4.44 8.82-2.94 5.38 5.23 4.07 8.31ZM264.72 119.93c-.79 3.29-4.46 5.24-8.22 4.35s-6.16-4.28-5.38-7.58 4.46-5.24 8.21-4.35 6.17 4.28 5.39 7.58Z"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M246.68 115.18a5.07 5.07 0 0 1 4.35.63M233.68 110.66l-7.65-12.42"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
            </svg>
        </Box>
    );
};
export default AchievementIllustration;
