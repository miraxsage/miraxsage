import { useColorMode } from "@/store/appearanceSlice";
import { lighten } from "@mui/material";
import { darken, useTheme } from "@mui/material";
import { CSSProperties } from "react";

type LeftFloralBackgroundProps = {
    style?: CSSProperties;
};
const LeftFloralBackground = ({ style }: LeftFloralBackgroundProps) => {
    const theme = useTheme();
    const isDarkMode = useColorMode().dark;
    const dividerColor = theme.palette.divider;
    const dividerColor1 = isDarkMode ? darken(dividerColor, 0.25) : lighten(dividerColor, 0.3);
    const dividerColor2 = isDarkMode ? darken(dividerColor, 0.3) : lighten(dividerColor, 0.5);
    const dividerColor3 = isDarkMode ? lighten(dividerColor, 0.1) : darken(dividerColor, 0.1);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="15 89 405 500"
            style={style}
        >
            <defs>
                <linearGradient
                    id="leftFloralBg_a"
                    x1={154.52}
                    x2={98.69}
                    y1={144.53}
                    y2={52.4}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={0} stopColor={dividerColor} />
                    <stop offset={1} stopColor={dividerColor2} />
                </linearGradient>
                <linearGradient
                    id="leftFloralBg_b"
                    x1={119.31}
                    x2={80.65}
                    y1={203}
                    y2={103}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={0} stopColor={dividerColor} />
                    <stop offset={0.96} stopColor={dividerColor} />
                </linearGradient>
                <linearGradient
                    id="leftFloralBg_e"
                    x1={115.74}
                    x2={6.48}
                    y1={358.51}
                    y2={390.61}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={0} stopColor={dividerColor} />
                    <stop offset={1} stopColor={dividerColor1} />
                </linearGradient>
                <linearGradient
                    xlinkHref="#leftFloralBg_a"
                    id="leftFloralBg_f"
                    x1={203.71}
                    x2={188.21}
                    y1={548.46}
                    y2={622.97}
                />
                <linearGradient
                    xlinkHref="#leftFloralBg_b"
                    id="leftFloralBg_h"
                    x1={306.03}
                    x2={286.69}
                    y1={484.54}
                    y2={565.87}
                    gradientTransform="rotate(-21.83 301.52 549.844)"
                />

                <clipPath id="leftFloralBg_c">
                    <path
                        d="M14.62 88.93h750v500h-750z"
                        style={{
                            fill: "none",
                        }}
                    />
                </clipPath>
            </defs>
            <g
                style={{
                    isolation: "isolate",
                }}
            >
                <g
                    style={{
                        clipPath: "url(#leftFloralBg_c)",
                    }}
                >
                    <path
                        d="m13.63 87.55-3 117.38c10.11 4.48 34.78 6.2 45.58 3.31 19.62-5.25 35.23-19.59 49.54-33.84s28.81-29.33 47.67-36.81c20.24-8 42.85-6.28 64.66-6.11s45.27-2 62-15.81c5.82-4.82 17.32-19.63 18.74-30.95Z"
                        style={{
                            mixBlendMode: "multiply",
                            opacity: 0.64,
                            fill: "url(#leftFloralBg_a)",
                        }}
                    />
                    <path
                        d="M307.44 84.83c-.68 20.38-16.46 37.86-35 46.85s-39.61 11.11-60.16 13.19-41.62 4.41-60 13.73c-36.08 18.3-53.51 58.47-75.06 92.4-7.7 12.12-16.74 24.18-29.72 30.55s-30.81 5.16-39.57-6.24"
                        style={{
                            fill: "none",
                            stroke: dividerColor3,
                            strokeMiterlimit: 10,
                            strokeWidth: "1.54499px",
                            opacity: 0.62,
                        }}
                    />
                    <path
                        d="M121.34 101.44c-14-3.91-25.33-3.39-39.47 2A35.2 35.2 0 0 0 72 109a147 147 0 0 0-20.3-19.56c-9.62-7.6-20.17-14-30.82-20l-4.44 1C28 76.81 39.53 83.64 49.88 91.82a148.89 148.89 0 0 1 33.27 37.25 35 35 0 0 0-9.61 6.65c-10.93 10.46-16.26 20.46-18.74 34.79-2 11.92 4.18 25.53 10.52 32.16 0-5.17 3.12-11.67 5.47-16.16 5.89-11.23 11.42-20.87 15-32.87a39.19 39.19 0 0 0 .5-19.36A154.24 154.24 0 0 1 98.21 160l.49-.17a59.81 59.81 0 0 0-3.74 9 83.33 83.33 0 0 0 19.23 78.08c4.41-15.3 8.87-31.11 7-46.93a65 65 0 0 0-6.53-21.24 78.26 78.26 0 0 0-10.77-16.33 19.24 19.24 0 0 0-3.43-3.19l.6-.21a158 158 0 0 0-22.96-42.52 39 39 0 0 0 14.7 5.71c12.38 1.91 23.47 1 36.13.54 5.07-.2 12.3-.27 16.95 2-3.27-8.58-12.88-20.05-24.54-23.3Z"
                        style={{
                            fill: "url(#leftFloralBg_b)",
                        }}
                    />
                    <g
                        style={{
                            mixBlendMode: "multiply",
                            opacity: 0.64,
                        }}
                    >
                        <path
                            d="M230.61 223.63a1 1 0 0 0-1.23 1 1 1 0 0 0-.37.95 10.66 10.66 0 0 0 4.74 6.08l.21.13c.15.12.29.24.45.35 1.23.86 3 2.22 4.6 1.09a1.21 1.21 0 0 0 .56-1.09.78.78 0 0 0 .09-.4 6.68 6.68 0 0 0-4.91-6.28 14.71 14.71 0 0 0-4.14-1.83ZM251.64 230.31a1 1 0 0 0-1.23 1 1 1 0 0 0-.37 1 10.67 10.67 0 0 0 4.74 6.07l.21.13c.15.12.29.25.45.36 1.24.85 3 2.21 4.6 1.08a1.17 1.17 0 0 0 .56-1.09.91.91 0 0 0 .1-.4 6.68 6.68 0 0 0-4.92-6.28 14.59 14.59 0 0 0-4.14-1.87ZM253.85 199.5a1 1 0 0 0-1.23 1 1 1 0 0 0-.37 1 10.71 10.71 0 0 0 4.74 6.07l.21.13c.15.12.29.25.45.36 1.24.85 3 2.21 4.6 1.08a1.17 1.17 0 0 0 .56-1.09.88.88 0 0 0 .1-.4 6.68 6.68 0 0 0-4.92-6.28 14.59 14.59 0 0 0-4.14-1.87ZM278.77 223.42a1 1 0 0 0-1.23 1 1 1 0 0 0-.37 1 10.66 10.66 0 0 0 4.74 6.08l.21.13c.15.12.29.24.45.35 1.24.86 3 2.22 4.6 1.09a1.2 1.2 0 0 0 .56-1.09.81.81 0 0 0 .09-.4 6.67 6.67 0 0 0-4.91-6.28 14.71 14.71 0 0 0-4.14-1.88ZM235.71 182.42c-1.53-1.32-3.32-2.44-5.5-2.2a1.14 1.14 0 0 0-1 1.56 12.59 12.59 0 0 0 6.36 6.93 5.09 5.09 0 0 0 1.68.75 2.28 2.28 0 0 0 .45 0c.28.08.54.17.82.24a1.24 1.24 0 0 0 1.4-1.67 11.27 11.27 0 0 0-.76-1.65 14.06 14.06 0 0 0-3.45-3.96ZM217.84 168.71c-1.53-1.31-3.32-2.43-5.5-2.19a1.14 1.14 0 0 0-1 1.55 12.57 12.57 0 0 0 6.36 6.94 5.06 5.06 0 0 0 1.68.74 2.31 2.31 0 0 0 .46.05c.27.08.53.17.82.23a1.24 1.24 0 0 0 1.39-1.67 11.27 11.27 0 0 0-.76-1.65 14 14 0 0 0-3.45-4ZM214.47 220.11a1.68 1.68 0 0 0-.27.26c-2.58.52-.71 3.47.1 4.49 1 1.26 3.54 3.69 5.7 3.82a2 2 0 0 0 1.5.23c2.07-.56 1.17-2.56.32-3.85a12.21 12.21 0 0 0-1.38-2.15c-1.01-1.27-4.02-4.3-5.97-2.8ZM223.2 209.94a3.38 3.38 0 0 0-.27.26c-2.57.53-.71 3.48.11 4.5 1 1.25 3.53 3.68 5.69 3.81a2 2 0 0 0 1.51.24c2.07-.56 1.17-2.57.31-3.86a12 12 0 0 0-1.38-2.15c-1.01-1.26-4.02-4.29-5.97-2.8ZM216.4 235.44a6.72 6.72 0 0 0-4-2.33 20.06 20.06 0 0 0-2.61-.9 1.13 1.13 0 0 0-1.28 1.53 15 15 0 0 0 .86 1.45c-.3 2.07 2.17 4.25 3.54 5.25a4.86 4.86 0 0 0 1.33.66 2.3 2.3 0 0 0 2 .7 2.14 2.14 0 0 0 .55-.25 2.09 2.09 0 0 0 2.4-1.52c.62-1.95-1.48-3.57-2.79-4.59ZM225.65 195.49a6.75 6.75 0 0 0-4-2.33 19 19 0 0 0-2.6-.9 1.13 1.13 0 0 0-1.28 1.53 16.26 16.26 0 0 0 .86 1.45c-.31 2.07 2.17 4.25 3.54 5.25a4.94 4.94 0 0 0 1.32.66 2.31 2.31 0 0 0 2 .69 1.77 1.77 0 0 0 .54-.24 2.08 2.08 0 0 0 2.4-1.52c.63-1.95-1.43-3.57-2.78-4.59ZM207 209.69a9.4 9.4 0 0 0-4.16-3.47c-1.53-.62-4.37-.8-3.91 1.8.5 2.8 3.89 5.52 6.39 6.44a3 3 0 0 0 1.37.22 1.5 1.5 0 0 0 1.6.07c2.13-1.18-.16-3.91-1.29-5.06ZM213 200a9.38 9.38 0 0 0-4.16-3.46c-1.53-.63-4.37-.81-3.91 1.79.49 2.8 3.88 5.52 6.39 6.45a3.12 3.12 0 0 0 1.36.21 1.48 1.48 0 0 0 1.6.08c2.13-1.24-.16-3.96-1.28-5.07ZM234.52 239.76a9.35 9.35 0 0 0-4.17-3.46c-1.52-.63-4.36-.81-3.9 1.79.49 2.8 3.88 5.52 6.39 6.44a3 3 0 0 0 1.36.22 1.52 1.52 0 0 0 1.6.08c2.2-1.19-.11-3.92-1.28-5.07ZM201.48 238.52a9.54 9.54 0 0 0-4.13-2.54 2.18 2.18 0 0 0-2 .32c-1.1.51-1 1.56-.3 2.75a8.53 8.53 0 0 0 4.3 4.56 5.5 5.5 0 0 0 1.17.31 4.06 4.06 0 0 0 2.06.61 2.44 2.44 0 0 0 .26-.06 2.53 2.53 0 0 0 1.31 0 1.18 1.18 0 0 0 .8-.75c.55-2.11-1.8-3.9-3.21-5ZM246.93 214.9a9.54 9.54 0 0 0-4.13-2.54 2.18 2.18 0 0 0-2 .32c-1.1.51-1 1.56-.3 2.75a8.53 8.53 0 0 0 4.3 4.56 5.5 5.5 0 0 0 1.17.31 4.09 4.09 0 0 0 2.06.61l.26-.06a2.53 2.53 0 0 0 1.31 0 1.14 1.14 0 0 0 .8-.75c.55-2.11-1.79-3.9-3.21-5ZM194.16 219.21c-.17 0-.35-.09-.53-.12-.79-.17-1.69.72-1.25 1.5a18.41 18.41 0 0 0 1.11 1.7c1 2.5 3.73 6.45 6.64 5.24a17.76 17.76 0 0 0 1.86.67 1.21 1.21 0 0 0 1.43-1.35c-.42-3.85-3.75-6.92-7.42-7.85a2.26 2.26 0 0 0-1.84.21Zm5.24 5.16c.06.11.09.19.12.25-.34-.23-.75-.54-1-.76a20.45 20.45 0 0 1-1.51-1.44 11.1 11.1 0 0 1 2.39 1.71 1.94 1.94 0 0 1 0 .24ZM164.27 222.71l-.53-.13c-.8-.16-1.7.73-1.26 1.5a16.78 16.78 0 0 0 1.12 1.71c1 2.5 3.73 6.45 6.64 5.24a15.56 15.56 0 0 0 1.85.66 1.2 1.2 0 0 0 1.44-1.34c-.41-3.89-3.75-6.92-7.44-7.88a2.24 2.24 0 0 0-1.82.24Zm5.24 5.16a1.47 1.47 0 0 1 .11.25c-.34-.23-.75-.54-1-.76a18.76 18.76 0 0 1-1.52-1.44 10.6 10.6 0 0 1 2.4 1.71 1.79 1.79 0 0 1 .01.24ZM250.4 182.68l-.53-.12c-.8-.16-1.7.72-1.26 1.5a16.64 16.64 0 0 0 1.12 1.7c1 2.51 3.73 6.45 6.64 5.24a18.44 18.44 0 0 0 1.85.67 1.21 1.21 0 0 0 1.44-1.35c-.41-3.89-3.75-6.92-7.44-7.88a2.24 2.24 0 0 0-1.82.24Zm5.24 5.16a1.23 1.23 0 0 1 .11.26c-.34-.23-.75-.55-1-.76-.54-.45-1-1-1.52-1.44a10.88 10.88 0 0 1 2.4 1.7 1.94 1.94 0 0 1 .01.24ZM189.43 233.47c.93-1.85.15-3.59-1.27-5a10.29 10.29 0 0 0-2.48-2.46c-1.06-.75-3.24-2.06-4.69-1.29a1.58 1.58 0 0 0-.82 1.85 4.22 4.22 0 0 0 1.16 2.5c1.16 1.51 2.78 3.37 4.8 3.83a11.21 11.21 0 0 0 1.79 1 1.15 1.15 0 0 0 1.51-.43Zm-4.33-4.85a11 11 0 0 1 1.57 1.46 1.32 1.32 0 0 1 0 .41 6.94 6.94 0 0 0-.83-.48 10.55 10.55 0 0 1-1.63-2 7.5 7.5 0 0 1 .89.61ZM184.59 208.87a8.38 8.38 0 0 0 5.34 5.13l.37.09.47.17c1.82.58 3.19-.33 2.64-2.3-.63-2.28-2.67-3.76-4.62-4.88-1.08-.61-3.42-2.15-4.39-.28a1.59 1.59 0 0 0-.14.4.87.87 0 0 0 0 .5 2.76 2.76 0 0 0 .33 1.17Zm4.77 1.39a6 6 0 0 1 .59.74l-.2-.07a3 3 0 0 1-.4-.11c-.4-.35-.77-.73-1-.91a2 2 0 0 0-.2-.19 6.45 6.45 0 0 1 .84.31l.27.16ZM235 199.36a8.38 8.38 0 0 0 5.34 5.13l.37.09.47.17c1.82.58 3.19-.33 2.64-2.3-.63-2.28-2.68-3.77-4.62-4.88-1.08-.61-3.43-2.15-4.39-.28a1.59 1.59 0 0 0-.14.4.8.8 0 0 0 0 .5 2.94 2.94 0 0 0 .33 1.17Zm4.77 1.39a6 6 0 0 1 .59.74l-.21-.07-.39-.11c-.41-.36-.77-.73-1-.91l-.2-.2a7.82 7.82 0 0 1 .84.32l.27.16ZM185.6 193a8.39 8.39 0 0 0 5.33 5.13l.37.09c.16.06.31.12.48.17 1.81.58 3.19-.33 2.64-2.3-.64-2.28-2.68-3.77-4.63-4.88-1.08-.62-3.42-2.15-4.39-.28a1.47 1.47 0 0 0-.14.4.79.79 0 0 0 0 .5 2.83 2.83 0 0 0 .34 1.17Zm4.76 1.39a6 6 0 0 1 .59.74l-.2-.07-.4-.11c-.4-.36-.77-.73-1-.92l-.21-.19c.38.13.71.25.85.32l.26.16ZM170.81 181.93a8.39 8.39 0 0 0 5.34 5.12l.37.09c.16.06.31.13.47.18 1.82.57 3.19-.33 2.64-2.31-.63-2.28-2.68-3.76-4.62-4.87-1.09-.62-3.43-2.16-4.39-.29a2 2 0 0 0-.15.41.83.83 0 0 0 0 .49 3 3 0 0 0 .34 1.18Zm4.76 1.39a3.84 3.84 0 0 1 .59.74.59.59 0 0 0-.2-.07l-.4-.12c-.4-.35-.76-.73-1-.91l-.2-.19c.37.12.71.25.84.31l.27.17a.46.46 0 0 1 .1.07ZM170.11 212c-.56 2.05 3.67 6.62 6.57 6.93a3.27 3.27 0 0 0 .33.14.88.88 0 0 0 .81-.12c1.76-.06 1.74-1.88 1.2-3.08a9 9 0 0 0-4.67-4.5c-1.14-.49-3.7-1.37-4.24.63Zm5.86 4.18a.86.86 0 0 0-.22-.2 5.83 5.83 0 0 1-2.44-2.32 4.26 4.26 0 0 1 2.69 2.52ZM168.93 193.43c-.53-.22-1.09.28-1.3.74-.82 1.77.92 3.7 2.13 4.83a7.78 7.78 0 0 0 .59.68c1.37 1.69 3.12 3.18 5.41 2.76a1.08 1.08 0 0 0 .8-1 7.25 7.25 0 0 0-.14-1.26 4.62 4.62 0 0 0-1.23-3.1 1.5 1.5 0 0 0-.11-.13 7.07 7.07 0 0 0-5.23-3.17Zm4.26 4.87c-.71 0-1.38-.71-1.92-1.53a8.33 8.33 0 0 1 2 1.52ZM160.44 213.38c1.14-1.45-.42-3.47-1.25-4.49a9.79 9.79 0 0 0-1.63-1.59 7.21 7.21 0 0 0-3.78-1.9.86.86 0 0 0-.39 0 3.27 3.27 0 0 0-2.09.68 1.06 1.06 0 0 0-.26 1.24 18.68 18.68 0 0 0 5 5.33c.96.71 3.12 2.35 4.4.73Zm-3.64-3.22a.77.77 0 0 0-.21-.55c.35.39 1.03 1.01.21.55Zm-.39-.73a2.83 2.83 0 0 1-.35-.34 3.9 3.9 0 0 1 .35.34ZM241.43 166.36a1 1 0 0 0-1.23 1 .93.93 0 0 0-.37 1 10.6 10.6 0 0 0 4.74 6.07l.2.14c.16.12.3.24.46.35 1.23.86 3 2.21 4.6 1.09a1.22 1.22 0 0 0 .56-1.09.81.81 0 0 0 .09-.4 6.67 6.67 0 0 0-4.92-6.28 14.65 14.65 0 0 0-4.13-1.88ZM279.34 208.72a1.76 1.76 0 0 0-.28.26c-2.57.52-.71 3.48.11 4.49 1 1.26 3.53 3.69 5.7 3.82a2 2 0 0 0 1.5.24c2.07-.57 1.17-2.57.32-3.86a11.63 11.63 0 0 0-1.39-2.15c-1.01-1.27-4.02-4.29-5.96-2.8ZM212.33 183.62a6.75 6.75 0 0 0-4-2.33 19 19 0 0 0-2.6-.9 1.12 1.12 0 0 0-1.28 1.52 15.11 15.11 0 0 0 .86 1.46c-.31 2.07 2.17 4.25 3.54 5.25a4.94 4.94 0 0 0 1.32.66 2.31 2.31 0 0 0 2 .69 1.58 1.58 0 0 0 .54-.25 2.07 2.07 0 0 0 2.4-1.51c.63-1.95-1.48-3.57-2.78-4.59ZM194.46 176.29a6.75 6.75 0 0 0-4-2.33 20.06 20.06 0 0 0-2.61-.9 1.13 1.13 0 0 0-1.28 1.53 15 15 0 0 0 .86 1.45c-.3 2.07 2.17 4.25 3.54 5.25a4.86 4.86 0 0 0 1.33.66 2.33 2.33 0 0 0 2 .7 2.14 2.14 0 0 0 .55-.25 2.09 2.09 0 0 0 2.4-1.52c.62-1.95-1.49-3.57-2.79-4.59ZM268.44 219.73a9.41 9.41 0 0 0-4.17-3.46c-1.52-.63-4.36-.8-3.9 1.79.49 2.8 3.88 5.53 6.39 6.45a3 3 0 0 0 1.36.21 1.48 1.48 0 0 0 1.6.08c2.18-1.18-.11-3.91-1.28-5.07ZM306.76 194.14a2.57 2.57 0 0 1 .12.26c-.34-.23-.75-.54-1-.76-.53-.45-1-.94-1.51-1.44a10.77 10.77 0 0 1 2.39 1.71 1.79 1.79 0 0 1 0 .23ZM271.63 192.48l-.53-.12c-.8-.16-1.7.72-1.26 1.5a16.64 16.64 0 0 0 1.12 1.7c1 2.51 3.73 6.45 6.64 5.24a18.44 18.44 0 0 0 1.85.67 1.21 1.21 0 0 0 1.44-1.35c-.41-3.89-3.75-6.92-7.44-7.88a2.24 2.24 0 0 0-1.82.24Zm5.24 5.16a1.23 1.23 0 0 1 .11.26c-.34-.23-.75-.54-1-.76-.54-.45-1-.95-1.52-1.44a10.6 10.6 0 0 1 2.4 1.71 1.64 1.64 0 0 1 .01.23ZM296.79 203.25c.93-1.85.15-3.59-1.27-5a10.67 10.67 0 0 0-2.48-2.46c-1.06-.75-3.24-2.05-4.69-1.29a1.59 1.59 0 0 0-.82 1.86 4.28 4.28 0 0 0 1.16 2.5c1.16 1.5 2.78 3.36 4.8 3.83a13.1 13.1 0 0 0 1.8 1 1.15 1.15 0 0 0 1.5-.44Zm-4.33-4.85a10.87 10.87 0 0 1 1.57 1.45 1.29 1.29 0 0 1 0 .41c-.16-.11-.48-.29-.83-.48a10.25 10.25 0 0 1-1.63-2 9 9 0 0 1 .89.62ZM277.47 181.77c-.56 2.06 3.67 6.63 6.57 6.94.11 0 .21.1.33.14a.94.94 0 0 0 .81-.12c1.77-.07 1.74-1.89 1.2-3.08a9 9 0 0 0-4.67-4.51c-1.14-.49-3.71-1.33-4.24.63Zm5.86 4.18a.69.69 0 0 0-.22-.19 5.85 5.85 0 0 1-2.44-2.33 4.24 4.24 0 0 1 2.66 2.57ZM267.8 183.16c1.14-1.45-.42-3.47-1.25-4.5a10.2 10.2 0 0 0-1.63-1.59 7.21 7.21 0 0 0-3.78-1.9 1 1 0 0 0-.39 0 3.33 3.33 0 0 0-2.09.68 1.07 1.07 0 0 0-.26 1.25 18.81 18.81 0 0 0 5 5.33c.95.71 3.12 2.35 4.4.73Zm-3.64-3.23a.77.77 0 0 0-.21-.55c.35.35 1.05 1.01.21.55Zm-.39-.73a1.88 1.88 0 0 1-.35-.34Z"
                            style={{
                                fill: dividerColor3,
                            }}
                        />
                    </g>
                    <path
                        d="M128.16 352.73a53.4 53.4 0 0 0-18.23 0 64 64 0 0 0-15.4 4.51 17.64 17.64 0 0 0-2.45 1.3c-3.45.15-6.91.46-10.38.9a30.77 30.77 0 0 0 10.92-7.79c6.44-7.42 10.4-15.12 15.25-23.73 1.94-3.44 4.87-8.25 8.37-10.42-7.39-1.34-19.46.34-26.55 6.72-8.52 7.69-12.81 15.41-14.82 27a25.87 25.87 0 0 0 0 9.27 136.31 136.31 0 0 0-27.91 8.15 32.32 32.32 0 0 0 9.63-11.44C61 348 63 339.05 65.69 329c1.06-4 2.74-9.7 5.63-12.81-7.5.5-18.82 5.29-24.17 13.64-6.44 10.05-8.75 19.05-7.92 31.44a28.48 28.48 0 0 0 2.3 9.77 116.52 116.52 0 0 0-16.75 9.55c-2.18 1.5-5 3.7-8 6.15A32 32 0 0 0 22.39 374c1.84-10.11 1.38-19.22 1.25-29.62-.06-4.16.05-10.09 2-13.85C18.54 333 8.92 340.63 6 350.11c-3.52 11.4-3.34 20.7.77 32.41a28.77 28.77 0 0 0 4.73 8.67c-3.31 2.83-6.54 5.68-9.14 8l-.44.14v.24L0 401.36l1.68 1.8.78-.71a28.34 28.34 0 0 0 2.48 6.81c5.57 11.09 12.13 17.68 22.78 23.07 8.85 4.48 21 2.87 27.74-.5-4.06-1.22-8.39-5.26-11.35-8.19-7.39-7.32-13.62-14-22.17-19.68a32.17 32.17 0 0 0-15.51-5.08c6.27-5.57 14.74-12.82 19.75-16.27 1.15-.8 2.33-1.58 3.53-2.34a28.5 28.5 0 0 0 2.87 8.89c5.57 11.09 12.13 17.68 22.78 23.07 8.85 4.48 21 2.87 27.75-.51-4.07-1.21-8.4-5.25-11.36-8.18-7.39-7.32-13.62-14-22.17-19.68a31.26 31.26 0 0 0-17.42-5.08 127 127 0 0 1 31.25-13.18 28.73 28.73 0 0 0 2.9 9c5.57 11.09 12.13 17.68 22.77 23.07 8.85 4.48 21 2.86 27.75-.51-4.06-1.21-8.4-5.26-11.35-8.18-7.39-7.32-13.62-14-22.17-19.69a32.34 32.34 0 0 0-14.7-5 130.38 130.38 0 0 1 23-3.25 49.68 49.68 0 0 0 5.8 4.75 68.36 68.36 0 0 0 65.86 3.71c-10.93-7.15-22.27-14.45-35.11-16.77Z"
                        style={{
                            fill: "url(#leftFloralBg_e)",
                        }}
                    />
                    <path
                        d="M12.1 447.07 10 589.29l396.94 5c-17.23-36.79-54-69.38-89.62-76.63-29.71-6.06-60.32 1.21-90.18 6.56s-62.16 8.5-89.27-4.81c-15.41-7.56-27.75-19.83-39.79-31.89s-24.36-24.33-39.76-31.92c-10.42-5.15-34.84-9.91-46.22-8.53Z"
                        style={{
                            mixBlendMode: "multiply",
                            opacity: 0.64,
                            fill: "url(#leftFloralBg_f)",
                        }}
                    />
                    <path
                        d="M322.29 603.88c-19-22.84-44.64-40.5-69.69-45.61-29.71-6-60.32 1.22-90.17 6.57s-62.17 8.49-89.27-4.81c-15.42-7.57-27.76-19.84-39.79-31.89-9.2-9.22-18.58-18.55-29.37-25.84v101.58Z"
                        style={{
                            mixBlendMode: "multiply",
                            opacity: 0.73,
                            fill: "url(#leftFloralBg_g)",
                        }}
                    />
                    <path
                        d="M423.5 605.93c-7-25.59-19.44-49.95-38-68.27s-43.5-30.18-69.11-29.81c-28.51.41-54.64 15.3-81.35 25.67-40.59 15.75-85.71 21.29-127.57 9.64s-79.83-41.83-96.55-83.42"
                        style={{
                            fill: "none",
                            stroke: dividerColor3,
                            strokeMiterlimit: 10,
                            strokeWidth: "1.35573px",
                        }}
                    />
                    <g
                        style={{
                            mixBlendMode: "multiply",
                            opacity: 0.64,
                        }}
                    >
                        <path
                            d="M170.85 503.42c0 5.13-5.29 8.24-10.42 8.24s-9.91-3.11-9.91-8.24 4.78-9.39 9.91-9.39 10.42 4.26 10.42 9.39Z"
                            style={{
                                fill: dividerColor,
                            }}
                        />
                    </g>
                    <g
                        style={{
                            mixBlendMode: "multiply",
                            opacity: 0.64,
                        }}
                    >
                        <path
                            d="M178.82 485.68c-1 3.67-5.39 4.86-9 3.86s-6.46-4.15-5.46-7.81 5.23-5.77 8.89-4.77 6.57 5.04 5.57 8.72Z"
                            style={{
                                fill: dividerColor,
                            }}
                        />
                    </g>
                    <g
                        style={{
                            mixBlendMode: "multiply",
                            opacity: 0.64,
                        }}
                    >
                        <path
                            d="M191.22 502.45c-.57 3.47-4.49 5-8 4.42s-6.35-3.2-5.78-6.67 4.26-5.81 7.73-5.25 6.61 4.05 6.05 7.5Z"
                            style={{
                                fill: dividerColor,
                            }}
                        />
                    </g>
                    <path
                        d="M293.77 588.61A147.71 147.71 0 0 0 303.6 615a201.77 201.77 0 0 0 12.89 22.24c.9-.45 1.79-.92 2.68-1.39a199.47 199.47 0 0 1-12.87-22.16 148.87 148.87 0 0 1-13.85-48 35.16 35.16 0 0 0 11.55-1.8c14.38-4.69 23.52-11.4 31.95-23.24 7-9.85 7.29-24.82 4.45-33.53-2.2 4.67-7.87 9.16-11.93 12.19-10.17 7.57-19.34 13.86-27.77 23.13a39.23 39.23 0 0 0-8.83 17.23 154.22 154.22 0 0 1 .4-28.34l-.52-.06a59 59 0 0 0 7.28-6.49 83.33 83.33 0 0 0 16.48-78.7c-10.62 11.92-21.51 24.2-26.63 39.28a65 65 0 0 0-3.31 22 78.31 78.31 0 0 0 2.63 19.39 19.4 19.4 0 0 0 1.72 4.36l-.64-.07a157.94 157.94 0 0 0 2.27 48.24 38.92 38.92 0 0 0-10.78-11.51c-10.33-7.08-20.7-11.1-32.33-16.13-4.66-2-11.2-5.08-14.42-9.13-.76 9.13 2.95 23.65 12 31.62 10.93 9.59 21.36 14 36.44 15.28a34.53 34.53 0 0 0 11.31-.8Z"
                        style={{
                            fill: "url(#leftFloralBg_h)",
                        }}
                    />
                </g>
            </g>
        </svg>
    );
};
export default LeftFloralBackground;