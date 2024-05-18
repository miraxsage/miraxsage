import { useColorMode } from "@/store/appearanceSlice";
import { Box, SxProps, alpha, lighten } from "@mui/material";
import { useLandingColor } from "..";
import { darken } from "@mui/material";

const SkillsIllustration = ({ sx }: { sx?: SxProps }) => {
    const isDarkMode = useColorMode().dark;
    const borderColor = isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(156, 159, 171, 0.5)";
    const accentColor = lighten(useLandingColor(isDarkMode ? "accentB" : "accentA"), isDarkMode ? 0.1 : 0.5);
    const maxPaleBackgroundColor = alpha(useLandingColor("contrast"), isDarkMode ? 0.03 : 0.13);
    const darkColor = darken(useLandingColor(isDarkMode ? "noteless" : "contrast"), isDarkMode ? 0 : 0.5);
    return (
        <Box sx={sx}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 461 438.12">
                <g data-name="Background Simple">
                    <path
                        d="M438.28 365.49c7.33-15.77 10.58-33.32 12.83-50.37 6.2-47 3.73-95.36-9.85-141.1C410.31 69.75 350.79 7.48 275.39.73S127.77 34.49 100 111-6.36 251.3 7.13 313.56s72.23 105 188.1 119.29c50.48 6.2 103.91 9 153.62-3.48 28.37-7.13 56.26-20.92 75.43-42.35a87.54 87.54 0 0 0 14-21.53Z"
                        style={{
                            fill: maxPaleBackgroundColor,
                        }}
                    />
                </g>
                <path
                    d="M447.73 388.98h12.77M74.51 388.98h365.52M.5 388.98h62.88"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <g data-name="Geometric Shapes">
                    <path
                        d="M227.6 84.23h14.81v14.81H227.6z"
                        style={{
                            fill: accentColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="M260.94 108.9h14.81v14.81h-14.81z"
                        style={{
                            fill: accentColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-41.11 268.372 116.3)"
                    />
                    <path
                        d="M177.6 42.9h14.81v14.81H177.6z"
                        style={{
                            fill: darkColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-41.11 185.027 50.31)"
                    />
                    <path
                        d="M177.6 102.9h14.81v14.81H177.6z"
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-41.11 185.023 110.307)"
                    />
                    <path
                        d="M243.6 42.23h14.81v14.81H243.6z"
                        style={{
                            fill: accentColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-41.11 251.03 49.63)"
                    />
                    <path
                        d="m240.9 109.11 3.13 6.36 7.03 1.02-5.09 4.95 1.21 7-6.28-3.31-6.28 3.31 1.19-7-5.07-4.95 7.01-1.02 3.15-6.36z"
                        style={{
                            fill: darkColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="m187.42 63.98 3.14 6.36 7.02 1.02-5.08 4.96 1.2 6.99-6.28-3.3-6.28 3.3 1.2-6.99-5.08-4.96 7.02-1.02 3.14-6.36z"
                        style={{
                            fill: accentColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="m280.13 28.7-2.16 6.75 4.34 5.62-7.09.03-4 5.86-2.22-6.74-6.81-1.99 5.72-4.19-.21-7.09 5.76 4.14 6.67-2.39z"
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="m232.82 140.79 7.04.88 4.71-5.31 1.35 6.97 6.5 2.84-6.21 3.43-.69 7.06-5.19-4.84-6.92 1.52 3-6.43-3.59-6.12z"
                        style={{
                            fill: accentColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <circle
                        cx={262.25}
                        cy={89.4}
                        r={10.41}
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-76.66 262.239 89.405)"
                    />
                    <circle
                        cx={221.83}
                        cy={155.65}
                        r={10.41}
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-45 221.834 155.653)"
                    />
                    <circle
                        cx={294.5}
                        cy={57.24}
                        r={10.41}
                        style={{
                            fill: darkColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-20.51 294.491 57.246)"
                    />
                    <circle
                        cx={216.92}
                        cy={70.73}
                        r={10.41}
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-76.66 216.91 70.732)"
                    />
                    <path
                        d="m217.45 102.5-16.64-10.45-.73 19.64 17.37-9.19zM295.37 95.47l-3.18-19.4-15.2 12.46 18.38 6.94z"
                        style={{
                            fill: darkColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="m223.77 139.09.79-19.64-17.4 9.13 16.61 10.51zM274.53 73.05l.79-19.63-17.4 9.13 16.61 10.5zM206.59 35.46l10.25 16.77 9.4-17.26-19.65.49z"
                        style={{
                            fill: accentColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                </g>
                <g
                    style={{
                        fill: borderColor,
                    }}
                >
                    <path d="M370.06 121.09a.52.52 0 0 1-.35-.14.55.55 0 0 1-.15-.36v-6.5c0-3.32-.31-15-.32-15.13a.51.51 0 0 1 .47-.52c.08 0 8.05-.48 14.67-.24s10.07 0 10.11 0a.56.56 0 0 1 .37.13.48.48 0 0 1 .16.35l1 21.65a.54.54 0 0 1-.14.36.52.52 0 0 1-.36.16H384c-4.39 0-13.87.24-14 .24Zm.2-21.67c.06 2.25.3 11.73.3 14.67v6c2 0 9.67-.23 13.48-.23H395l-.91-20.62c-1.21.06-4.52.16-9.71 0-5.68-.24-12.3.08-14.12.18Z" />
                    <path d="M386.25 100.52a1.66 1.66 0 1 0-1.66 1.66 1.66 1.66 0 0 0 1.66-1.66Z" />
                    <circle cx={386.53} cy={99.38} r={1.66} />
                    <path d="M382.54 102.6a.5.5 0 0 1-.34-.87l1.14-1a.5.5 0 0 1 .71 0 .48.48 0 0 1 0 .7l-1.14 1a.46.46 0 0 1-.37.17ZM388.25 107.11h-12.89a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5h12.89a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5ZM389 111.41h-13.64a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5H389a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5ZM389.27 115.46h-13.91a.5.5 0 0 1 0-1h13.91a.5.5 0 0 1 0 1Z" />
                </g>
                <g
                    style={{
                        fill: borderColor,
                    }}
                >
                    <path d="M433.55 194.37a.5.5 0 0 1-.35-.14.48.48 0 0 1-.15-.36v-6.49c0-3.32-.31-15-.32-15.14a.5.5 0 0 1 .47-.51c.08 0 8.05-.48 14.66-.24s10.08 0 10.12 0a.5.5 0 0 1 .37.12.48.48 0 0 1 .16.36l1 21.64a.55.55 0 0 1-.14.37.51.51 0 0 1-.36.15h-11.48c-4.39 0-13.87.24-14 .24Zm.2-21.67c.06 2.26.3 11.73.3 14.68v6c2-.05 9.67-.23 13.48-.23h10.91l-.9-20.62c-1.21.06-4.52.17-9.71 0-5.64-.25-12.27.07-14.08.17Z" />
                    <path d="M449.74 173.8a1.66 1.66 0 1 0-1.66 1.66 1.66 1.66 0 0 0 1.66-1.66Z" />
                    <path d="M451.68 172.66a1.66 1.66 0 1 0-1.66 1.66 1.66 1.66 0 0 0 1.66-1.66ZM446 175.88a.49.49 0 0 1-.37-.16.5.5 0 0 1 0-.71l1.14-1a.51.51 0 0 1 .71 0 .5.5 0 0 1 0 .71l-1.14 1a.46.46 0 0 1-.34.16ZM451.74 180.4h-12.9a.51.51 0 0 1-.5-.5.5.5 0 0 1 .5-.5h12.9a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5ZM452.5 184.7h-13.66a.51.51 0 0 1-.5-.5.5.5 0 0 1 .5-.5h13.66a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5ZM452.75 188.74h-13.91a.5.5 0 0 1-.5-.5.51.51 0 0 1 .5-.5h13.91a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5Z" />
                </g>
                <g
                    style={{
                        fill: borderColor,
                    }}
                >
                    <path d="M138.51 158.34a.51.51 0 0 1-.5-.5v-6.5c0-3.32-.31-15-.32-15.14a.5.5 0 0 1 .47-.51c.08 0 8.05-.48 14.66-.24s10.08 0 10.12 0a.56.56 0 0 1 .37.13.46.46 0 0 1 .16.35l1 21.64a.55.55 0 0 1-.14.37.51.51 0 0 1-.36.15h-11.48c-4.39 0-13.87.24-14 .25Zm.2-21.68c.06 2.26.3 11.74.3 14.68v6c2 0 9.67-.23 13.48-.23h10.91l-.9-20.61c-1.21.05-4.52.16-9.71 0-5.64-.25-12.26.06-14.08.16Z" />
                    <path d="M154.7 137.76a1.66 1.66 0 1 0-1.66 1.67 1.66 1.66 0 0 0 1.66-1.67Z" />
                    <path d="M156.64 136.62a1.66 1.66 0 1 0-1.66 1.67 1.66 1.66 0 0 0 1.66-1.67ZM151 139.85a.5.5 0 0 1-.37-.17.5.5 0 0 1 0-.71l1.14-1a.5.5 0 0 1 .71 0 .5.5 0 0 1 0 .71l-1.14 1a.51.51 0 0 1-.34.17ZM156.7 144.36h-12.9a.5.5 0 0 1 0-1h12.9a.5.5 0 0 1 0 1ZM157.46 148.66H143.8a.5.5 0 0 1 0-1h13.66a.5.5 0 0 1 0 1ZM157.71 152.71H143.8a.51.51 0 0 1-.5-.5.5.5 0 0 1 .5-.5h13.91a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5Z" />
                </g>
                <g
                    style={{
                        fill: borderColor,
                    }}
                >
                    <path d="M335.36 154a.49.49 0 0 1-.34-.14.52.52 0 0 1-.16-.36V147c0-3.33-.31-15-.31-15.14a.49.49 0 0 1 .47-.51c.08 0 8-.49 14.66-.25s10.08 0 10.11 0a.5.5 0 0 1 .37.12.53.53 0 0 1 .17.35l.95 21.65a.45.45 0 0 1-.14.36.48.48 0 0 1-.36.16h-11.44c-4.39 0-13.87.24-14 .24Zm.2-21.67c.06 2.25.3 11.73.3 14.68v6c2.05-.05 9.67-.23 13.48-.23h10.92l-.91-20.62c-1.2.06-4.52.16-9.71 0-5.64-.22-12.26.1-14.08.2Z" />
                    <path d="M351.56 133.46a1.67 1.67 0 1 0-1.67 1.66 1.66 1.66 0 0 0 1.67-1.66Z" />
                    <path d="M353.5 132.32a1.67 1.67 0 1 0-1.67 1.66 1.67 1.67 0 0 0 1.67-1.66ZM347.84 135.54a.51.51 0 0 1-.37-.17.49.49 0 0 1 0-.7l1.14-1a.5.5 0 0 1 .67.74l-1.14 1a.5.5 0 0 1-.3.13ZM353.56 140.05h-12.9a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5h12.9a.51.51 0 0 1 .5.5.5.5 0 0 1-.5.5ZM354.32 144.35h-13.66a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5h13.66a.51.51 0 0 1 .5.5.5.5 0 0 1-.5.5ZM354.57 148.4h-13.91a.5.5 0 0 1 0-1h13.91a.5.5 0 0 1 0 1Z" />
                </g>
                <g
                    style={{
                        fill: borderColor,
                    }}
                >
                    <path d="M396.7 154a.5.5 0 0 1-.35-.14.51.51 0 0 1-.15-.36V147c0-3.33-.32-15-.32-15.14a.49.49 0 0 1 .47-.51c.08 0 8-.49 14.66-.25s10.08 0 10.12 0a.48.48 0 0 1 .36.12.53.53 0 0 1 .17.35l.95 21.65a.47.47 0 0 1-.13.36.52.52 0 0 1-.37.16h-11.43c-4.39 0-13.87.24-14 .24Zm.19-21.67c.06 2.25.31 11.73.31 14.68v6c2-.05 9.67-.23 13.48-.23h10.91l-.91-20.62c-1.2.06-4.51.16-9.7 0-5.64-.22-12.27.1-14.09.2Z" />
                    <path d="M412.89 133.46a1.67 1.67 0 1 0-1.66 1.66 1.66 1.66 0 0 0 1.66-1.66Z" />
                    <path d="M414.83 132.32a1.67 1.67 0 1 0-1.66 1.66 1.67 1.67 0 0 0 1.66-1.66ZM409.18 135.54a.52.52 0 0 1-.38-.17.5.5 0 0 1 0-.7l1.14-1a.5.5 0 0 1 .71 0 .49.49 0 0 1 0 .7l-1.14 1a.48.48 0 0 1-.33.17ZM414.89 140.05H402a.5.5 0 0 1-.5-.5.51.51 0 0 1 .5-.5h12.9a.5.5 0 0 1 .5.5.5.5 0 0 1-.51.5ZM415.65 144.35H402a.5.5 0 0 1-.5-.5.51.51 0 0 1 .5-.5h13.66a.5.5 0 0 1 .5.5.5.5 0 0 1-.51.5ZM415.9 148.4H402a.5.5 0 0 1 0-1h13.9a.5.5 0 0 1 0 1Z" />
                </g>
                <g
                    style={{
                        fill: borderColor,
                    }}
                >
                    <path d="M407.88 102.63a.5.5 0 0 1-.35-.14.51.51 0 0 1-.15-.36v-6.49c0-3.33-.31-15-.32-15.14a.5.5 0 0 1 .47-.51c.08 0 8.05-.49 14.66-.25s10.08 0 10.12 0a.5.5 0 0 1 .37.12.48.48 0 0 1 .16.35l1 21.65a.52.52 0 0 1-.14.36.52.52 0 0 1-.36.16h-11.48c-4.39 0-13.87.24-14 .24Zm.2-21.67c.06 2.26.3 11.73.3 14.68v6c2-.05 9.67-.23 13.48-.23h10.91l-.9-20.62c-1.21.06-4.52.16-9.71 0-5.64-.25-12.27.07-14.08.21Z" />
                    <path d="M424.07 82.06a1.66 1.66 0 1 0-1.66 1.66 1.66 1.66 0 0 0 1.66-1.66Z" />
                    <circle cx={424.35} cy={80.92} r={1.66} />
                    <path d="M420.36 84.14a.5.5 0 0 1-.34-.87l1.14-1a.5.5 0 0 1 .71 0 .48.48 0 0 1 0 .7l-1.14 1a.46.46 0 0 1-.37.17ZM426.07 88.65h-12.9a.5.5 0 0 1-.5-.5.51.51 0 0 1 .5-.5h12.9a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5ZM426.83 93h-13.66a.5.5 0 0 1-.5-.5.51.51 0 0 1 .5-.5h13.66a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5ZM427.08 97h-13.91a.5.5 0 0 1 0-1h13.91a.5.5 0 0 1 0 1Z" />
                </g>
                <g
                    style={{
                        fill: borderColor,
                    }}
                >
                    <path d="M331.21 97.3a.49.49 0 0 1-.35-.15.51.51 0 0 1-.15-.35v-6.5c0-3.32-.31-15-.31-15.14a.5.5 0 0 1 .47-.51c.07 0 8-.48 14.66-.24s10.08 0 10.11 0a.56.56 0 0 1 .37.13.51.51 0 0 1 .17.35l.95 21.64a.47.47 0 0 1-.14.37.48.48 0 0 1-.36.16h-11.44c-4.39 0-13.87.23-14 .24Zm.2-21.68c.06 2.26.3 11.74.3 14.68v6c2.05 0 9.67-.22 13.48-.22h10.92l-.91-20.62c-1.21 0-4.52.16-9.71 0-5.64-.25-12.26.07-14.08.16Z" />
                    <circle cx={345.74} cy={76.73} r={1.66} />
                    <path d="M349.34 75.58a1.66 1.66 0 1 0-1.66 1.67 1.66 1.66 0 0 0 1.66-1.67ZM343.69 78.81a.5.5 0 0 1-.33-.88l1.14-1a.49.49 0 0 1 .7 0 .5.5 0 0 1 0 .71l-1.14 1a.55.55 0 0 1-.37.17ZM349.41 83.32h-12.9a.5.5 0 0 1 0-1h12.9a.5.5 0 0 1 0 1ZM350.16 87.62h-13.65a.5.5 0 0 1 0-1h13.65a.5.5 0 0 1 0 1ZM350.42 91.67h-13.91a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5h13.91a.5.5 0 0 1 .5.5.51.51 0 0 1-.5.5Z" />
                </g>
                <g
                    style={{
                        fill: borderColor,
                    }}
                >
                    <path
                        d="M37.83 97.32h13.1v13.1h-13.1zM56.94 103.87h38.23M37.83 117.32h13.1v13.1h-13.1zM56.94 123.87h38.23M37.83 137.32h13.1v13.1h-13.1zM56.94 143.87h38.23M37.83 157.32h13.1v13.1h-13.1zM56.94 163.87h38.23"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="m41.17 141.32 2 5.33 14-9.33M41.17 100.65l2 5.33 14-9.33"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                </g>
                <g
                    style={{
                        fill: borderColor,
                    }}
                >
                    <path
                        d="M103.17 194.44h8.96v8.96h-8.96zM116.23 198.92h26.14M103.17 208.11h8.96v8.96h-8.96zM116.23 212.59h26.14M103.17 221.79h8.96v8.96h-8.96zM116.23 226.27h26.14M103.17 235.46h8.96v8.96h-8.96zM116.23 239.94h26.14"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="m105.45 224.52 1.36 3.65 9.58-6.38M105.45 196.72l1.36 3.65 9.58-6.39"
                        style={{
                            fill: "none",
                            stroke: borderColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                </g>
                <path
                    d="M151.61 62.71v-5.06l-5.61-.87a13.17 13.17 0 0 0-1.16-2.78l3.35-4.58-3.58-3.58-4.61 3.31a13.17 13.17 0 0 0-2.79-1.15l-.87-5.61h-5.06l-.87 5.61a13 13 0 0 0-2.82 1.16L123 45.8l-3.58 3.58 3.36 4.62a12.22 12.22 0 0 0-1.16 2.82l-5.61.87v5.06l5.61.87a12 12 0 0 0 1.16 2.82L119.43 71l3.57 3.56 4.58-3.35a12.49 12.49 0 0 0 2.82 1.16l.87 5.61h5.06l.87-5.61a12.68 12.68 0 0 0 2.8-1.16l4.58 3.35 3.61-3.56-3.35-4.58a13 13 0 0 0 1.16-2.84Zm-17.8 5.47a8 8 0 1 1 8-8 8 8 0 0 1-8 8ZM118.5 78.18v-3.39l-3.76-.58a8.17 8.17 0 0 0-.77-1.88l2.24-3.07-2.4-2.39-3.06 2.24a8.27 8.27 0 0 0-1.89-.78l-.58-3.76h-3.39l-.58 3.76a8.19 8.19 0 0 0-1.88.78l-3.07-2.24L97 69.26l2.24 3.07a7.77 7.77 0 0 0-.78 1.88l-3.76.58v3.39l3.76.58a7.84 7.84 0 0 0 .78 1.89L97 83.71l2.39 2.4 3.07-2.24a8.66 8.66 0 0 0 1.88.78l.58 3.75h3.39l.58-3.75a8.74 8.74 0 0 0 1.89-.78l3.06 2.24 2.4-2.4-2.24-3.06a8.24 8.24 0 0 0 .77-1.89Zm-11.91 3.66a5.36 5.36 0 1 1 5.35-5.35 5.36 5.36 0 0 1-5.35 5.35ZM296.82 289.53l-2.69 4.29 4.29 3.72a13 13 0 0 0-.51 3l-5.27 2.11 1.13 4.93 5.66-.4a13.22 13.22 0 0 0 1.77 2.48l-2.2 5.21 4.28 2.69 3.72-4.29a12 12 0 0 0 3 .51l2.1 5.27 4.93-1.13-.4-5.66a12.55 12.55 0 0 0 2.48-1.76l5.22 2.24 2.69-4.29-4.3-3.72a12.42 12.42 0 0 0 .52-3l5.27-2.1-1.13-4.94-5.66.41a12.6 12.6 0 0 0-1.77-2.48l2.24-5.22-4.29-2.69-3.75 4.29a12.82 12.82 0 0 0-3-.51l-2.1-5.27-4.93 1.13.4 5.66a12.2 12.2 0 0 0-2.48 1.77Zm18 4.83a8 8 0 1 1-11 2.53 8 8 0 0 1 10.99-2.53ZM333.09 294l-1.8 2.87 2.87 2.49a8.63 8.63 0 0 0-.34 2l-3.53 1.41.76 3.3 3.79-.27a8.65 8.65 0 0 0 1.18 1.66l-1.5 3.49 2.87 1.8 2.49-2.87a8.63 8.63 0 0 0 2 .34l1.41 3.53 3.3-.76-.27-3.79a8.65 8.65 0 0 0 1.66-1.18l3.49 1.5 1.8-2.87-2.87-2.49a8.63 8.63 0 0 0 .34-2l3.53-1.41-.76-3.3-3.79.27a8.65 8.65 0 0 0-1.18-1.66l1.5-3.49-2.87-1.8-2.49 2.87a8.63 8.63 0 0 0-2-.34l-1.41-3.53-3.3.76.27 3.79a8.65 8.65 0 0 0-1.66 1.18Zm12 3.23a5.35 5.35 0 1 1-7.38 1.69 5.36 5.36 0 0 1 7.42-1.67Z"
                    style={{
                        fill: "none",
                        stroke: borderColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <g data-name="Drawers 2">
                    <path
                        d="M2.73 225.86h84.38v46.75H2.73z"
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(180 44.92 249.23)"
                    />
                    <path
                        d="M5.29 225.86h84.38v46.75H5.29z"
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(180 47.485 249.23)"
                    />
                    <path
                        d="m47.83 233.08-14 24.25h28l-14-24.25z"
                        style={{
                            fill: accentColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="M375.24 309.86h84.38v46.75h-84.38z"
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="M372.67 309.86h84.38v46.75h-84.38z"
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="m413.36 318.74 4.47 9.06 10 1.46-7.24 7.05 1.71 9.97-8.94-4.71-8.95 4.71 1.71-9.97-7.24-7.05 10-1.46 4.48-9.06z"
                        style={{
                            fill: accentColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                </g>
                <path
                    d="M214.14 226.75s-32.62 9.08-34 12.2-19.86 36.59-19.86 36.59l16.45 23.83 14.19-18.44 5.1 43.69s-6.24 10.21-4 14.75a13.88 13.88 0 0 0 6.24 6.24h74.33s4.54-5.39 3.4-12.48-3.12-15.88-3.12-15.88l-.28-25 8.51-26.1 41.7-.28-7.09-29.22s-28.94-6.24-30.92-7.38-11.92-3.12-16.74-3.12h-13.63l-37.73-.28Z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m184.82 257.52 6.06 23.41-11.35-20.42M182.65 249.16l1 3.84M173.83 271.41l-4.79-2.67M190.88 280.93l-14.49-8.09M287.33 242.92l-6.24 23.26 12.48-23.26M304.21 252.07l3.83-2.34M281.09 266.18l18.96-11.57M250.08 302.67l3.49-2.73M211.02 333.13l36.35-28.35M231.44 313.56l-20.42 14.47"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m220.95 206.33-1.7 22.41 16.73 18.72 14.47-17.87-4.54-22.13-24.96-1.13z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m245.91 207.46-25-1.13-.43 5.65c3.73 4.32 11.2 13.8 14.22 14.55 2.53.64 9-6.63 12.65-11.87Z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m216.41 215.12 15.6 19.86-10.78 20.71-9.93-28.66 5.11-11.91zM253 215.12l-15.6 19.86 10.78 20.71 9.93-28.66-5.11-11.91zM211 177.11s-3.12-6.53-5.95-1.42 6.27 15.31 7.4 15.31-1.45-13.89-1.45-13.89ZM256.14 177.11s3.12-6.53 6-1.42-6.28 15.31-7.42 15.31 1.42-13.89 1.42-13.89Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M209.08 155.55c.22 4.64 1.87 37.4 4.51 44.25 2.83 7.38 15.88 19.29 22.12 18.72S253 204.06 254.44 199c1.27-4.59 2.32-36.92 2.52-43.4Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M216.42 181.65s4 4.25 11.35-.29M251.6 181.65s-4 4.25-11.35-.29M230.61 192.71s2.83 5.39 9.08 0M232.31 202.36h5.11"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M214.72 174s2-2 12.2-.29M251.88 174s-2-2-12.19-.29"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                    }}
                />
                <path
                    d="M322.51 235.83s30.63-64.4 33.75-64.68 6.81 4 5.68 9.65-16.74 60.14-20.14 71.48-7.95 15.89-11.63 14.47-7.66-30.92-7.66-30.92ZM148.72 275.48s15.66 35.58 19.3 34.95S182.45 299 183 296.9s-6.72-13.81-14-19.17-9.61-7.26-10.73-7.07-7.74 3.64-9.55 4.82Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M313.14 233.84s-2.83 19-.28 26.67 5.11 8.79 9.36 9.08 10.5-.85 11.63-3.69-9.07-30.64-10.21-32.62-6.81-1.71-10.5.56ZM95.12 266.92a66.9 66.9 0 0 0-7.07-4.24s-4.53-1.23-5.54-5.38 4.82-5.44 4.82-5.44c3.73-.07 67.19 27.22 67.19 27.22 10.76 12.25 12.67 26.6 13 28.55a2.57 2.57 0 0 1-2.36 3c-1.12.2-20.17-8.27-25.86-11.35-12.08-6.54-40.63-30.1-40.63-30.1ZM66.37 276.11s-2.72 4.17-5.57 6-6.61 3-5.41 3.84 2.62 1.4 5.56.1 6.4-2.7 6.4-2.7 3.08-8.21-.98-7.24Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M65.82 277.52s-2.56 8.11-5.82 10.78-7.89 4.8-4.89 5.34 4.87-.85 8.92-3.4 5.28-4.61 4.69-9.53-1.2-5.59-2.9-3.19Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M66.1 274.57s-.24 9.29-.86 13.35-8.26 11.74-5 12 8.89-8.15 10.19-11.28 2.25-3.82 1.25-6.56-4.79-10.55-5.58-7.51Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <circle
                    cx={82.64}
                    cy={299}
                    r={13.69}
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                    transform="rotate(-47.38 82.624 298.978)"
                />
                <path
                    d="M93.23 254.28s-8.46-4.61-12.42-1.54S68 270 65 272.91s2.55 10.12 4.43 16.4.37 11.29 3.61 10.2 1.9-4.29 2.12-10.66S72.83 276.84 73 276s6.51-5.09 10.67-4 6.23 3.94 6 7.15S87 291.55 88.22 294s3.44 3.1 4.78-1.36 4.93-12.74 5.68-16-6.58-18.14-6.58-18.14"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M75.49 310.68a13.69 13.69 0 0 1 6.67-25.36"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M387.09 181.37s4.35 2.39 7.73 2.65 7.24-.48 6.58.83-1.65 2.47-4.86 2.71-6.92.65-6.92.65-6.57-5.78-2.53-6.84Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M388.24 182.36s6.08 5.94 10.19 6.77 9.22.51 6.83 2.4-4.7 1.55-9.47 1.21-6.83-1.57-8.63-6.19-1.56-5.55 1.08-4.19Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M386.59 179.89s4.6 8.07 7.06 11.37 12.83 6.44 10.11 8.17-11.68-3-14.31-5.13-3.78-2.32-4.19-5.2-.8-11.52 1.33-9.21Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M370.43 199.89h21.11V221h-21.11z"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M353.1 174.8s5.29-8.05 10.22-7.22 19.49 9.17 23.44 10.33 2.54 10.13 3.84 16.55 5 10.14 1.63 10.71-3.7-2.89-6.9-8.41-3.6-11.7-4.09-12.36-8.15-1.4-11.24 1.6-3.64 6.41-1.91 9.13 8.13 9.65 8.2 12.36-1.57 4.36-4.85 1.06S361 199.59 358.82 197s-2.76-19.1-2.76-19.1"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M381.03 199.89h10.51v10.66"
                    style={{
                        fill: accentColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="m198.25 345.61-5 18.76-53.66-2.32s32.43 26.64 48.25 32 37.45 11.2 55.59 9.66 35.9-5 54-13.9 29-26.25 29-26.25h-51.37l-2.48-18Z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M274.73 388.8s12.34.9 21.23-1.39 15.3 2.09 16.11 10.39-3.34 15.9-14.37 16.74-26.79-6.39-26.79-6.39-4.32-11.15 3.82-19.35Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M287.22 413.18s10.21 2.45 15.12-2.57 5.9-12.28 4.36-18a8.16 8.16 0 0 0-6.06-5.83c6.39.08 10.77 4.24 11.43 11 .81 8.29-3.34 15.9-14.37 16.74a41.52 41.52 0 0 1-12.59-1.48ZM271.31 392.23s6.17 2.74 11.25 2.59 7.21 4.36 4 7.52-16.38-.55-17.54-1.35-.77-6.43 2.29-8.76Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M213.69 359.9a389.82 389.82 0 0 1-55.93-30c-9.19-6.06-18.39-8.36-26.33-1.88s-7.52 20.69-1.05 28 26.55 14.63 45.57 22.57 57.47 17.14 68.55 20.06 14.21 4.81 16.93 7.32 9.48 2.2 9.48 2.2-.07-8.47 1.81-12.44 3.13-6.69 3.13-6.69-3.34-2.51-6.48-4.81-4-.62-10.45-4.8c-7.16-4.62-15.94-7.4-23.81-10.52-7.11-2.84-14.28-5.83-21.42-9.01Z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M179.72 391s-12.36-.78-20.85-4.25-15.44 0-17.37 8.11 1.16 16.21 12 18.53 27.4-2.71 27.4-2.71 5.76-10.41-1.18-19.68Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M164 413.47s-10.45 1-14.63-4.59-4.18-13-1.88-18.4a8.15 8.15 0 0 1 6.79-5c-6.34-.79-11.24 2.74-12.81 9.34-1.93 8.1 1.16 16.21 12 18.53a41.44 41.44 0 0 0 12.67.24Z"
                    style={{
                        fill: "#fff",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M182.64 394.87s-6.48 1.88-11.5 1.05-7.73 3.34-5 6.89 16.31 1.68 17.56 1.05 1.65-6.27-1.06-8.99Z"
                    style={{
                        fill: "none",
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <path
                    d="M194.77 387.92s71.42-29.34 96.89-43.24 44-9.65 44 5.41-20.85 25.09-37.44 32.42-81.07 22.39-88.4 23.55a82.87 82.87 0 0 0-8.5 1.55s-3.86 4.24-5 4.63-17-2.32-17-2.32 3.86-8.1 2.7-11.58-2.31-7.33-2.31-7.33 8.88-6.57 15.06-3.09Z"
                    style={{
                        fill: darkColor,
                        stroke: darkColor,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                    }}
                />
                <g data-name="Drawers 1">
                    <path
                        d="M417.15 230.7h42.48v36.49h-42.48z"
                        style={{
                            fill: darkColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="M417.15 238.05h42.48v29.14h-42.48z"
                        style={{
                            fill: "#b0b0b0",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="M341.03 225.86h84.38v46.75h-84.38z"
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="M338.46 225.86h84.38v46.75h-84.38z"
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="M366.76 237.12h21.11v21.11h-21.11z"
                        style={{
                            fill: accentColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                    />
                    <path
                        d="M2.73 314.7h42.48v36.49H2.73z"
                        style={{
                            fill: darkColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(180 23.965 332.945)"
                    />
                    <path
                        d="M2.73 322.05h42.48v29.14H2.73z"
                        style={{
                            fill: "#b0b0b0",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(180 23.965 336.62)"
                    />
                    <path
                        d="M36.94 309.86h84.38v46.75H36.94z"
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(180 79.13 333.23)"
                    />
                    <path
                        d="M39.5 309.86h84.38v46.75H39.5z"
                        style={{
                            fill: "#fff",
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(180 81.695 333.23)"
                    />
                    <circle
                        cx={83.78}
                        cy={333.65}
                        r={13.49}
                        style={{
                            fill: accentColor,
                            stroke: darkColor,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                        }}
                        transform="rotate(-42.6 83.78 333.65)"
                    />
                </g>
            </svg>
        </Box>
    );
};
export default SkillsIllustration;
