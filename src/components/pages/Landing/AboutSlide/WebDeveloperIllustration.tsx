import { useColorMode } from "@/store/appearanceSlice";
import { Box, SxProps, alpha, lighten } from "@mui/material";
import { useLandingColor } from "..";
import { darken } from "@mui/material";

const WebDeveloperIllustration = ({ sx }: { sx?: SxProps }) => {
    const isDarkMode = useColorMode().dark;
    const borderColor = isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(156, 159, 171, 0.5)";
    const accentColor = lighten(useLandingColor(isDarkMode ? "accentB" : "accentA"), isDarkMode ? 0.1 : 0.5);
    const maxPaleBackgroundColor = alpha(useLandingColor("contrast"), isDarkMode ? 0.03 : 0.13);
    const darkColor = darken(useLandingColor(isDarkMode ? "noteless" : "contrast"), isDarkMode ? 0 : 0.5);
    return (
        <Box sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 419.32 442.98">
                <defs>
                    <clipPath id="a">
                        <path
                            d="M359.92 393.25c-6.77 11-41.12 16.21-59.87 15.72s-72.7-26-76.36-31.44c-3.39-5-11.72-21.57 1.12-31.58a24.88 24.88 0 0 1 3.46-2.24C237.06 339 295.52 354 295.52 354s3.62-2.29 5-2.12c4.08.52 7 3.82 15.24 6.17 5.77 1.65 21.52-4.69 31.58.76a13.88 13.88 0 0 1 3.06 2.22c9.35 8.97 16.28 21.19 9.52 32.22Z"
                            style={{
                                fill: accentColor,
                                stroke: darkColor,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                            }}
                        />
                    </clipPath>
                    <clipPath id="b">
                        <path
                            d="m290.67 402.8 17.52 13.75a199.42 199.42 0 0 0 25.11-3.75h0c8.3-1.92 15.54-4.68 15.94-8.45.61-5.75-5.53-7.32-12.82-7.1-1.36 0-2.76.14-4.17.29-11.68 1.25-26.51-5.2-26.51-5.2Z"
                            style={{
                                fill: darkColor,
                                stroke: darkColor,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                            }}
                        />
                    </clipPath>
                    <clipPath id="c">
                        <path
                            d="M307 408.22c-3.16.52.31 7 4.59 5s-1.43-5.51-4.59-5Z"
                            style={{
                                fill: "#fff",
                                stroke: darkColor,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                            }}
                        />
                    </clipPath>
                    <clipPath id="d">
                        <path
                            d="M333.31 412.79c8.3-1.92 15.54-4.68 15.94-8.45.61-5.75-5.53-7.32-12.82-7.1-.32.31-7.43 7.15-3.12 15.55Z"
                            style={{
                                fill: "#fff",
                                stroke: darkColor,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                            }}
                        />
                    </clipPath>
                    <clipPath id="e">
                        <path
                            d="M279.9 403.33 261 415.17a200.13 200.13 0 0 1-24.59-6.38h0c-8-2.79-15-6.29-15-10.09 0-5.77 6.27-6.69 13.5-5.7 1.35.17 2.73.42 4.12.72 11.47 2.47 26.9-2.39 26.9-2.39Z"
                            style={{
                                fill: darkColor,
                                stroke: darkColor,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                            }}
                        />
                    </clipPath>
                </defs>
                <g data-name="Background Simple">
                    <path
                        d="M26.44 138s-27.88 72 11.3 144.5S157.61 393.28 222.21 426s131.66 16.8 163.53-36.84-11.85-91.92-11.9-168.41 11.45-96.74-30-161.37S200.82-19.52 124 28.41 26.44 138 26.44 138Z"
                        style={{
                            fill: maxPaleBackgroundColor,
                        }}
                    />
                </g>
                <path
                    d="M.5 402.55h418.32M237.47 84.27V68.58l-11.76-1a32.5 32.5 0 0 0-2.9-7l7.59-9-11.1-11.1-9 7.59a32.5 32.5 0 0 0-7-2.9l-1-11.76h-15.7l-1 11.76a32.78 32.78 0 0 0-7.05 2.9l-9-7.59-11.1 11.1 7.59 9a32.52 32.52 0 0 0-2.91 7l-11.75 1v15.69l11.75 1a32.52 32.52 0 0 0 2.91 7l-7.59 9 11.1 11.1 9-7.59a32.78 32.78 0 0 0 7.05 2.9l1 11.76h15.7l1-11.76a32.5 32.5 0 0 0 7-2.9l9 7.59 11.1-11.1-7.59-9a32.5 32.5 0 0 0 2.9-7Zm-43.11 10.4a18.25 18.25 0 1 1 18.25-18.25 18.25 18.25 0 0 1-18.25 18.25ZM406.2 237.73v-7.53l-5.64-.48a15.24 15.24 0 0 0-1.4-3.38l3.64-4.34-5.32-5.32-4.33 3.64a15.24 15.24 0 0 0-3.38-1.4l-.48-5.64h-7.53l-.49 5.64a15.44 15.44 0 0 0-3.38 1.4l-4.32-3.64-5.33 5.32 3.64 4.33a15.7 15.7 0 0 0-1.39 3.38l-5.64.48v7.53l5.64.49a15.92 15.92 0 0 0 1.39 3.38l-3.64 4.32 5.33 5.33 4.32-3.64a15.92 15.92 0 0 0 3.38 1.39l.49 5.64h7.53l.48-5.64a15.7 15.7 0 0 0 3.38-1.39l4.33 3.64 5.32-5.33-3.64-4.32a15.44 15.44 0 0 0 1.4-3.38Zm-20.68 5a8.75 8.75 0 1 1 8.75-8.74 8.74 8.74 0 0 1-8.75 8.72ZM400.54 100.68a20.54 20.54 0 0 0-25.37-24.44 19.69 19.69 0 0 0-36.81 8.44 16.27 16.27 0 0 0-3-.29 16.09 16.09 0 0 0-16 14.29 9 9 0 0 0 .2 17.92h75.28a9 9 0 0 0 5.67-15.92ZM359.14 109.72v20.75M359.14 97.27v8.3M359.14 89.52v4.43M355.22 128.04l3.92 4.85 3.92-4.85M171.14 344a20.2 20.2 0 0 0 .53-4.62 20.54 20.54 0 0 0-20.53-20.54 20.21 20.21 0 0 0-5.36.72A19.69 19.69 0 0 0 109 328a16.27 16.27 0 0 0-3-.29A16.09 16.09 0 0 0 90 342a9 9 0 0 0 .19 18h75.29a9 9 0 0 0 5.66-16ZM129.75 356.04v-20.75M129.75 368.49v-8.3M129.75 376.24v-4.44"
                    style={{
                        fill: "none",
                        stroke: borderColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m133.66 337.72-3.91-4.85-3.92 4.85"
                    style={{
                        fill: "none",
                        stroke: borderColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M12 80.78h251.44a4.24 4.24 0 0 1 4.24 4.22v11.87h0H7.75h0V85A4.24 4.24 0 0 1 12 80.78Z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M19.12 99.85h262.71v184.87H19.12zM285.86 88.83a4 4 0 1 1-4-4 4 4 0 0 1 4 4ZM271.7 88.83a4 4 0 1 1-4-4 4 4 0 0 1 4 4ZM257.54 88.83a4 4 0 1 1-4-4 4 4 0 0 1 4 4Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M273.88 107.78h-10.41M273.88 112h-10.41M273.88 116.22h-10.41M37.32 216.86h78.73M37.32 223.07h78.73M37.32 229.4h62.07"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                    }}
                />
                <path
                    d="M204.27 101.94v.5"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M204.27 105.43v174.23"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeDasharray: ".998449981212616,2.995349884033203",
                    }}
                />
                <path
                    d="M204.27 281.16v.5M22.29 243.26h.5"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M25.78 243.26h250.04"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeDasharray: ".9981380105018616,2.9944100379943848",
                    }}
                />
                <path
                    d="M277.31 243.26h.5"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M202.54 241.54h3.45v3.45h-3.45z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M125.48 28.9h-49.3A2.18 2.18 0 0 0 74 31.08V54a2.19 2.19 0 0 0 2.18 2.18H98.3l2.53 9 2.53-9h22.12a2.19 2.19 0 0 0 2.18-2.18V31.08a2.18 2.18 0 0 0-2.18-2.18Z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M82.2 35.47h37.25M82.2 40.19h37.25M82.2 44.91h37.25M82.2 49.63h28.08"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                    }}
                />
                <path
                    d="M51.71 272.48h53.66v33.63H51.71z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M51.71 272.48h53.66v5.11H51.71z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M57.19 281.9H70.9M64.04 285.73h23.74M61.01 289.29H68M64.04 293.51h15.99M57.19 297.33H70.9"
                    style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M190.5 210.12h-46.07M191.39 231.42s0-21.4-23.92-21.4-23.92 21.4-23.92 21.4"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <circle
                    cx={191.39}
                    cy={231.42}
                    r={2.02}
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M141.53 231.42a2 2 0 1 1 2 2 2 2 0 0 1-2-2Z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M189.61 208.25h3.54v3.54h-3.54z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                    transform="rotate(180 191.385 210.015)"
                />
                <path
                    d="M165.7 208.25h3.54v3.54h-3.54z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                    transform="rotate(180 167.465 210.015)"
                />
                <path
                    d="M141.78 208.25h3.54v3.54h-3.54z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                    transform="rotate(180 143.55 210.015)"
                />
                <path
                    d="M65.94 145.75v-7.07l-5.3-.46a14 14 0 0 0-1.31-3.17l3.42-4.05-5-5-4.06 3.42a15.09 15.09 0 0 0-3.18-1.31l-.45-5.3H43l-.46 5.3a15.31 15.31 0 0 0-3.18 1.31L35.29 126l-5 5 3.42 4.07a14 14 0 0 0-1.31 3.17l-5.3.46v7.07l5.3.46a14.22 14.22 0 0 0 1.31 3.17l-3.42 4.07 5 5 4.06-3.47a15.31 15.31 0 0 0 3.18 1.31l.46 5.29h7.07l.45-5.29a15.09 15.09 0 0 0 3.18-1.31l4.06 3.42 5-5-3.42-4.07a14.22 14.22 0 0 0 1.31-3.17Zm-19.42 4.68a8.22 8.22 0 1 1 8.22-8.22 8.22 8.22 0 0 1-8.22 8.22ZM90 161.61v-4.84l-3.63-.31a9.2 9.2 0 0 0-.9-2.17l2.35-2.79-3.43-3.42-2.78 2.34a9.81 9.81 0 0 0-2.17-.89l-.32-3.63h-4.86l-.26 3.63a9.81 9.81 0 0 0-2.17.89L69 148.08l-3.43 3.42 2.34 2.79a9.61 9.61 0 0 0-.89 2.17l-3.63.31v4.84l3.63.32a9.81 9.81 0 0 0 .89 2.17l-2.34 2.78L69 170.3l2.78-2.3a10.34 10.34 0 0 0 2.17.9l.31 3.63h4.84l.32-3.63a10.34 10.34 0 0 0 2.17-.9l2.78 2.34 3.43-3.42-2.35-2.78a9.38 9.38 0 0 0 .9-2.17Zm-13.3 3.21a5.63 5.63 0 1 1 5.63-5.63 5.63 5.63 0 0 1-5.65 5.63Z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M214.15 255.02h38.73M214.15 261.23h38.73M214.15 267.56h22.08"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                    }}
                />
                <path
                    d="M163.12 270.13h-20.39a5 5 0 0 1-5-5h0a5 5 0 0 1 5-5h20.39a5 5 0 0 1 5 5h0a5 5 0 0 1-5 5ZM201.11 270.13h-20.38a5 5 0 0 1-5-5h0a5 5 0 0 1 5-5h20.38a5 5 0 0 1 5 5h0a5 5 0 0 1-5 5Z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M216.98 162.85h43.24v43.24h-43.24zM216.98 162.85l43.24 43.24M260.22 162.85l-43.24 43.24"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M253.52 137.17h53.66v33.63h-53.66z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M253.52 137.17h53.66v5.11h-53.66z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M258.99 146.59h13.72M265.85 150.41h23.74M262.82 153.98h6.98M265.85 158.19h15.99M258.99 162.02h13.72"
                    style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M233.94 113.77v10.09l-4.45 4.45H219.4v-14.54h14.54z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m233.94 123.86-4.45 4.45v-4.45h4.45zM79.31 191.8v10.09l-4.45 4.45H64.77V191.8h14.54z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m79.31 201.89-4.45 4.45v-4.45h4.45zM24.36 253.96v10.09l-4.45 4.45H9.82v-14.54h14.54z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m24.36 264.05-4.45 4.45v-4.45h4.45zM206.38 192.46c-5.29.45-12-5.87-12-5.87a1.17 1.17 0 0 1-1.88-.24c-.86-1.24-4.59-4.1-4.8-6.58s4.19-6.51 4.19-6.51c-3.4.93-3.75-1.06-3.75-1.06s5.71-4.72 7.7-4.84c.79-.05 4.19 1.9 7.48 4.55s9.9 12.52 9.9 12.52 21.85 15.87 27.37 19.93c7.29 5.36 15.93 14.87 15.93 14.87s29 13.07 37 20.26l-10.82 25.63s-26.37-17.67-29-22.16-5.27-1.78-7.91-4.72-5.17-6.27-5.17-6.27a44.76 44.76 0 0 1-12.62-9.13c-6.17-6.33-11.59-16-15-21.81a36.23 36.23 0 0 0-6.62-8.57Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M208 188.72s-7.87-1.9-8.55-7.1a9.64 9.64 0 0 0-1.69-3.63s-7.35-.36-6.88-3.35l9.8-.86a17 17 0 0 1 8.52 7.22"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M194.36 186.59a3.17 3.17 0 0 0 .34-2.12s2.16-.39 1.91-2.3c0 0 3.21-.4 1.14-4.18"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M196.61 182.17s-4.3-3.2-4.79-4.65M194.7 184.47s-4.59-2.79-4.67-4.43M195.74 170.09s-1.45 2.62-3.87 3.17"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M195 171.12a12.55 12.55 0 0 1 2.16 1.43"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M362.62 259.69a234.5 234.5 0 0 0-34.9-11.69c-17.56-4.12-46-7.79-46-7.79s7.82 79.8 5.76 84.61-14.42 20.92-14.42 20.92 66.89 26.08 78.55 28.3 5.58-38.25 5.58-38.25 12.29-51.41 5.43-76.1Z"
                    style={{
                        fill: darkColor,
                    }}
                />
                <path
                    d="M338.62 251.12s1.59 3-2.59 4.57c-10.83 4-22.37.47-21.14-3.77.47-1.62 3.15 0 3-6a7.37 7.37 0 0 0-.73-2.66 27.47 27.47 0 0 0-2.75-4.61 57.26 57.26 0 0 0-3.71-4.63s17.19-11 29.94 0c-.02-.02-4.76 2.35-2.02 17.1Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M359.92 393.25c-6.77 11-41.12 16.21-59.87 15.72s-72.7-26-76.36-31.44c-3.39-5-11.72-21.57 1.12-31.58a24.88 24.88 0 0 1 3.46-2.24C237.06 339 295.52 354 295.52 354s3.62-2.29 5-2.12c4.08.52 7 3.82 15.24 6.17 5.77 1.65 21.52-4.69 31.58.76a13.88 13.88 0 0 1 3.06 2.22c9.35 8.97 16.28 21.19 9.52 32.22Z"
                    style={{
                        fill: accentColor,
                    }}
                />
                <g
                    style={{
                        clipPath: "url(#a)",
                    }}
                >
                    <path
                        d="M347.29 358.77c-10.31-.69-19.5 1.47-25.92 5.26-7.61 4.5-43.55 21.81-43.55 21.81.08-1.86 2.08-5.61 2.08-5.61-3.38-3-12.22-5.35-12.22-5.35-6.85-5.85-34-23.3-42.87-28.93a24.88 24.88 0 0 1 3.46-2.24C237.06 339 295.52 354 295.52 354s3.62-2.29 5-2.12c4.08.52 7 3.82 15.24 6.17 5.72 1.61 21.47-4.73 31.53.72Z"
                        style={{
                            fillOpacity: 0.7000000000000001,
                            opacity: 0.30000000000000004,
                        }}
                    />
                </g>
                <path
                    d="M359.92 393.25c-6.77 11-41.12 16.21-59.87 15.72s-72.7-26-76.36-31.44c-3.39-5-11.72-21.57 1.12-31.58a24.88 24.88 0 0 1 3.46-2.24C237.06 339 295.52 354 295.52 354s3.62-2.29 5-2.12c4.08.52 7 3.82 15.24 6.17 5.77 1.65 21.52-4.69 31.58.76a13.88 13.88 0 0 1 3.06 2.22c9.35 8.97 16.28 21.19 9.52 32.22Z"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m349.37 403.2.87 3.77s-2.3 6.53-12.41 7.59-16.1 3.31-21 3.6a41.93 41.93 0 0 1-7.69-.12l-1-1.49Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m290.67 402.8 17.52 13.75a199.42 199.42 0 0 0 25.11-3.75c8.3-1.92 15.54-4.68 15.94-8.45.61-5.75-5.53-7.32-12.82-7.1-1.36 0-2.76.14-4.17.29-11.68 1.25-26.51-5.2-26.51-5.2Z"
                    style={{
                        fill: darkColor,
                    }}
                />
                <g
                    style={{
                        clipPath: "url(#b)",
                    }}
                >
                    <path
                        d="M349.26 404.21a53.84 53.84 0 0 0-9.75 4.79s-16.27 8.38-41.27-.25l-7.57-5.95 15.08-10.47s14.83 6.45 26.51 5.19c1.41-.14 2.81-.25 4.17-.27 7.24-.25 13.33 1.31 12.83 6.96Z"
                        style={{
                            fillOpacity: 0.7000000000000001,
                            opacity: 0.30000000000000004,
                        }}
                    />
                </g>
                <path
                    d="m290.67 402.8 17.52 13.75a199.42 199.42 0 0 0 25.11-3.75h0c8.3-1.92 15.54-4.68 15.94-8.45.61-5.75-5.53-7.32-12.82-7.1-1.36 0-2.76.14-4.17.29-11.68 1.25-26.51-5.2-26.51-5.2Z"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M307 408.22c-3.16.52.31 7 4.59 5s-1.43-5.51-4.59-5Z"
                    style={{
                        fill: "#fff",
                    }}
                />
                <g
                    style={{
                        clipPath: "url(#c)",
                    }}
                >
                    <path
                        d="M312.93 412.19a66.94 66.94 0 0 1-6.81-1.19c-.6-1.26-.47-2.56.88-2.78 2.65-.43 7.11 2.01 5.93 3.97Z"
                        style={{
                            fillOpacity: 0.7000000000000001,
                            opacity: 0.2,
                        }}
                    />
                </g>
                <path
                    d="M307 408.22c-3.16.52.31 7 4.59 5s-1.43-5.51-4.59-5Z"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M333.31 412.79c8.3-1.92 15.54-4.68 15.94-8.45.61-5.75-5.53-7.32-12.82-7.1-.32.31-7.43 7.15-3.12 15.55Z"
                    style={{
                        fill: "#fff",
                    }}
                />
                <g
                    style={{
                        clipPath: "url(#d)",
                    }}
                >
                    <path
                        d="M349.26 404.21a53.84 53.84 0 0 0-9.75 4.79 32.52 32.52 0 0 1-6.84 2.29c-2.8-7.7 3.46-13.76 3.76-14 7.24-.29 13.33 1.27 12.83 6.92Z"
                        style={{
                            fillOpacity: 0.7000000000000001,
                            opacity: 0.30000000000000004,
                        }}
                    />
                </g>
                <path
                    d="M333.31 412.79c8.3-1.92 15.54-4.68 15.94-8.45.61-5.75-5.53-7.32-12.82-7.1-.32.31-7.43 7.15-3.12 15.55Z"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M327.38 405.66h.05a.86.86 0 0 0 .91-.82 11.74 11.74 0 0 1 3-6.59.87.87 0 0 0-1.25-1.21 13.4 13.4 0 0 0-3.47 7.71.87.87 0 0 0 .76.91ZM323.91 405.87h.09a.86.86 0 0 0 .88-.85 12.83 12.83 0 0 1 2.66-6.85.88.88 0 0 0-.12-1.22.87.87 0 0 0-1.22.12 14.32 14.32 0 0 0-3.05 7.92.87.87 0 0 0 .76.88ZM319.76 405.43h0a.87.87 0 0 0 .94-.79c.27-3 2.85-6.92 2.88-7a.87.87 0 0 0-1.44-1c-.12.18-2.86 4.29-3.17 7.78a.88.88 0 0 0 .79 1.01ZM315.84 405h.24a.87.87 0 0 0 .71-1c-.62-3.68 2.8-6.84 2.84-6.87a.87.87 0 0 0-1.16-1.29c-.17.16-4.16 3.82-3.39 8.44a.87.87 0 0 0 .76.72ZM311.58 404a1 1 0 0 0 .29 0 .86.86 0 0 0 .65-1c-.75-3.28 2.48-7 2.51-7a.86.86 0 1 0-1.29-1.15c-.16.18-3.87 4.41-2.91 8.57a.88.88 0 0 0 .75.58ZM221.48 397.56l-1.26 3.66s1.6 6.73 11.55 8.85 15.66 5 20.46 5.78a41.9 41.9 0 0 0 7.66.69l1.14-1.37Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M279.9 403.33 261 415.17a200.13 200.13 0 0 1-24.59-6.38c-8-2.79-15-6.29-15-10.09 0-5.77 6.27-6.69 13.5-5.7 1.35.17 2.73.42 4.12.72 11.47 2.47 26.9-2.39 26.9-2.39Z"
                    style={{
                        fill: darkColor,
                    }}
                />
                <g
                    style={{
                        clipPath: "url(#e)",
                    }}
                >
                    <path
                        d="m279.9 403.33-11.1 7a44.71 44.71 0 0 1-22.53-15.87 74.62 74.62 0 0 0 19.73-3.13Z"
                        style={{
                            fillOpacity: 0.7000000000000001,
                            opacity: 0.30000000000000004,
                        }}
                    />
                </g>
                <path
                    d="M279.9 403.33 261 415.17a200.13 200.13 0 0 1-24.59-6.38h0c-8-2.79-15-6.29-15-10.09 0-5.77 6.27-6.69 13.5-5.7 1.35.17 2.73.42 4.12.72 11.47 2.47 26.9-2.39 26.9-2.39Z"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M236.45 408.79c-8-2.79-15-6.29-15-10.09 0-5.77 6.27-6.69 13.5-5.7.31.34 6.62 7.88 1.5 15.79ZM243.09 402.32H243a.86.86 0 0 1-.82-.91 11.68 11.68 0 0 0-2.28-6.87.86.86 0 0 1 .16-1.21.85.85 0 0 1 1.21.15 13.24 13.24 0 0 1 2.64 8 .87.87 0 0 1-.82.84ZM246.52 402.89h-.08a.86.86 0 0 1-.79-.93 12.83 12.83 0 0 0-1.92-7.1.87.87 0 1 1 1.45-1 14.37 14.37 0 0 1 2.2 8.19.87.87 0 0 1-.86.84ZM250.69 402.89h0a.88.88 0 0 1-.85-.88c.06-3.05-2.11-7.19-2.13-7.23a.87.87 0 0 1 1.54-.81c.09.19 2.39 4.57 2.33 8.07a.87.87 0 0 1-.89.85ZM254.63 402.89h-.23a.87.87 0 0 1-.6-1.07c1-3.6-2.07-7.09-2.11-7.13a.87.87 0 0 1 1.3-1.16c.15.17 3.73 4.23 2.48 8.75a.87.87 0 0 1-.84.61ZM259 402.32a1 1 0 0 1-.29-.05.86.86 0 0 1-.53-1.1c1.09-3.19-1.74-7.22-1.77-7.26a.88.88 0 0 1 .21-1.21.86.86 0 0 1 1.2.21c.14.19 3.38 4.79 2 8.82a.88.88 0 0 1-.82.59ZM263.09 407c3.09.84-1 6.9-5.09 4.5s2-5.34 5.09-4.5Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M227.43 374.87c4.63 6.49 18.36 13.66 32 19.58a64.24 64.24 0 0 0 8.58 11.2c8.42 8.67 11.85 3.81 11.85 3.81s5.32-.59 13.17-1.67a3.72 3.72 0 0 0 4 2.23c1-.16 3-1.62 5.21-3.55 19.83-3 46.74-8 54-13.81"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M348.48 362.53c-3.43-3.78-6.85-3.95-14.06-3.43 0 0-18.79 5.95-31.89 13.88s-32.24 16.27-32.24 16.27-5.83-1.69-9.88 0c0 0-2.85.22-.94 5.2M357.23 385.05s.1 5.81-8.14 9.84"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M266.35 360.81s13 9.4 15.6 15.6a53.44 53.44 0 0 1 7.39 3.81"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M282.9 368.63a14.88 14.88 0 0 1 .45 8.41M279.9 362.53a23.16 23.16 0 0 1 1.86 3.25M298.41 361.67s4.36 5.81 5.44 10.54M322.64 396.82a37.25 37.25 0 0 0 4.83-.59M281.84 392.66a232.8 232.8 0 0 0 37.39 4.34"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M369.83 304.47s-2.35 40.95-5.12 43.35-7.14 3.09-15.42 3.78-44.84 2.93-44.84 2.93l-3.92-11.75s19.45-2 28.09-5.16a145.64 145.64 0 0 1 19.86-5.25s-1.63-10.32-1.63-14.75v-20.88"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M362.62 259.69c8.92 5.48 11.55 18.17 8.46 45.26 0 0 2.64 3.21-1.25 4.81 0 0-14.57-5.45-21.35-1.7s-5-5.19-5-5.19-2.79-24.92 3.38-29.42"
                    style={{
                        fill: darkColor,
                    }}
                />
                <path
                    d="M346.05 269.63s-8.57 8.92-1 31.44a36.48 36.48 0 0 0-1 5.6c0 1.5 2.07 2.29 2.07 2.29"
                    style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M336 284.72s.62 11 7.44 15.78M338.23 259.18s-13.29 5.09-23.86-.54c-6.27-3.35-3.69-8.72-3.69-8.72"
                    style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M242.66 362.54H315a19.29 19.29 0 0 0 4.84-.62l14.27-3.74a.94.94 0 0 0 .69-.9h0a.93.93 0 0 0-.93-.92h-94.2a.92.92 0 0 0-.92.92v1.35a3.91 3.91 0 0 0 3.91 3.91Z"
                    style={{
                        fill: "#757575",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M235.49 359H308a1.73 1.73 0 0 0 1.69-2.33l-13.46-52.33a3.19 3.19 0 0 0-2.89-2.33h-72.51a1.74 1.74 0 0 0-1.69 2.33l13.46 52.33a3.18 3.18 0 0 0 2.89 2.33Z"
                    style={{
                        fill: "#999",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M223.39 303.82h-1.37M234.02 303.82h-7.09M306.28 352.33l-11.87-46.18a3.2 3.2 0 0 0-2.89-2.33h-55.9M307.32 356.36l-.3-1.15"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M257.32 331.77a8 8 0 0 0 .25 1.26c.93 3.15 3.88 5.06 6.59 4.26s4.16-4 3.24-7.15-3.89-5.06-6.6-4.26a3.91 3.91 0 0 0-.92.39 5.56 5.56 0 0 1-2.56 5.5Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M289.34 233.71c-6.28-.69-9.71-6.65-13.48-7.58a43.15 43.15 0 0 1-6.18-2s-1.31-4.55-3.25-3-4.51 35.49-2 34.43 2.51 2.93 2.51 2.93l23.32 20.55 19.54-34.6s-14.18-10.04-20.46-10.73Z"
                    style={{
                        fill: darkColor,
                    }}
                />
                <path
                    d="M99.39 112.78v-.5h.5"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M102.83 112.28h84.6"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeDasharray: ".9780219793319702,2.934070110321045",
                    }}
                />
                <path
                    d="M188.89 112.28h.5v.5"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M189.39 115.78v54.5"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeDasharray: "1,3",
                    }}
                />
                <path
                    d="M189.39 171.78v.5h-.5"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M185.96 172.28h-84.6"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeDasharray: ".9780219793319702,2.934070110321045",
                    }}
                />
                <path
                    d="M99.89 172.28h-.5v-.5"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M99.39 168.78v-54.5"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeDasharray: "1,3",
                    }}
                />
                <circle
                    cx={144.39}
                    cy={112.28}
                    r={1.48}
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <circle
                    cx={99.39}
                    cy={142.28}
                    r={1.48}
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <circle
                    cx={144.39}
                    cy={172.28}
                    r={1.48}
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <circle
                    cx={189.39}
                    cy={142.28}
                    r={1.48}
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M187.67 170.56h3.45v3.45h-3.45zM187.67 110.56h3.45v3.45h-3.45zM97.67 170.56h3.45v3.45h-3.45zM97.67 110.56h3.45v3.45h-3.45z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M105.37 117.58h78.33v49.77h-78.33z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m183.69 152.65-8.7 8.71-23.56-23.55-9.91 9.91-15.81-15.81-20.35 20.35v15.09h78.33v-14.7z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <circle
                    cx={167.47}
                    cy={131.71}
                    r={5.53}
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M293.48 242.88s-6 11.17-6.71 28.26M275.87 250.62s1.79 9.49 7 16.38M300.53 289.81s9 29.56 28.56 38.27"
                    style={{
                        fill: "none",
                        stroke: "#fff",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M324.19 236.31s-.85 6.45-7.05 6.9a27.47 27.47 0 0 0-2.75-4.61 86.58 86.58 0 0 1 9.8-2.29Z"
                    style={{
                        fill: darkColor,
                    }}
                />
                <path
                    d="M337.4 236.76s10.37 1.27 14.71-12.65.93-24.41-16.23-29.46c-9.52-2.81-19-.55-22.47 6.65-2.94 6.18-1.55 11.31-2.23 13.38-.75 2.31-7.77 4.28-7.77 5.87 0 1.32 3.89 3.56 3.89 3.56l-1.15 3.45 1.08.58s-2 7.79-1.08 10.53c.67 2 18.24 2.84 19.61-2.13"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M313.5 206.36s3.43.86 4.37 2.66"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M314.11 214.26c-.15 1 .08 1.88.51 1.94s.91-.7 1.06-1.71-.09-1.88-.52-1.94-.91.7-1.05 1.71Z"
                    style={{
                        fill: darkColor,
                    }}
                />
                <path
                    d="M307.23 228.14s5.58 2.14 7.66.84M309.19 213.47c-.41 2.23.09 4.2 1.12 4.39s2.21-1.46 2.62-3.7-.08-4.2-1.12-4.39-2.2 1.46-2.62 3.7Z"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M352.57 202.07a16.5 16.5 0 0 0-6.52-10.07 30.47 30.47 0 0 0-12.57-5.14s3.31 1.44 4.57 3.35c0 0-8.58-6.44-18.75-2.21s-8.92 15.22-8.92 15.22l1.49-2.87s-.17 3.43 1.63 4.68a22.21 22.21 0 0 1 2.19-4.8s2.7 8.12 10.13 10.86a5.9 5.9 0 0 1-.12-4s4.11 8.92 2.92 13.26l1.31 2.29s4.73-4.79 8.58-.8c2.2 2.29-4.23 11-5.15 11l3.89 5.72s9.71 1.38 15.32-9.14 4.23-15 4.23-15a13.86 13.86 0 0 1 2.05 4s1.6-11.32-6.28-16.35Z"
                    style={{
                        fill: darkColor,
                    }}
                />
                <path
                    d="M329.7 223.68s3-10.09 9.38-6.53 1.83 8.93-.46 11-4 5.83-5.49 5.83-1.83-1.83-1.83-1.83"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m312.93 214.16 17.8 3.7"
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
export default WebDeveloperIllustration;
