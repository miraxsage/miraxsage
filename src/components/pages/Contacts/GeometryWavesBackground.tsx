import { alpha, useTheme } from "@mui/material";
import { CSSProperties } from "react";

type GeometryWavesBackground = {
    style?: CSSProperties;
};
const GeometryWavesBackground = ({ style }: GeometryWavesBackground) => {
    const theme = useTheme();
    const dividerColor = alpha(theme.palette.divider, 0.35);
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 460 900 743.24" style={style}>
            <path
                d="M.24 515.57c28 9.47 50.2 46.8 79.14 21.55 19-16.6 34.44-53.63 62.39-55.81 38.91-3 77 17.07 115.76 6.47 18.25-5 36.31-14.7 53.77-3.65 22.58 14.3 34.34 52.73 61.63 59.59 16.88 4.24 40.63-8.77 55.42-15 15.69-6.59 32.33-14.28 49.71-12.26 17 2 32.31 12.78 49.83 9.22 21-4.27 39.62-24.32 55.68-36.86 13.2-10.31 28.13-22.67 45.86-21.65 18.43 1.06 35 14.81 51 22.64 16.86 8.26 31.25 8.61 49.42 4.18 14.19-3.47 28.54-9.78 43.46-8.57 21.92 1.76 37.23 21.68 55.71 31.25 20.57 10.66 41.53.57 63.06-1.18M.24 827.35c22.9.27 45.17-4.13 68.25-3 21.26 1 42.18 3.1 63.5 3.11 36.64 0 73.52-1.57 110.16-2.53 17.26-.46 34.62-1.46 51.87-1.09 17.07.36 33.69 3.9 50.81 3.89 34 0 67.85-3.14 101.81-2.36 68 1.57 135.94.37 204 1.89 36.72.81 73.27-2 110-1.91 21.31 0 42.47 2.12 63.75 2.25 22.73.14 45.22-3.39 67.89-2.84M.24 811.77C14.88 810.58 26.76 803.08 41 801c9.16-1.36 19.38-.29 28.41 1.11 21.25 3.3 41 9.76 62.75 9.78 17.73 0 34.85-3.05 52.29-5.8C204 803 223 804 242.61 802.62c17.11-1.25 34.92-4.1 52-2.07 18 2.14 33.41 11.49 51.79 12.13 34 1.17 67.35-10.48 101.37-7.45 16.58 1.47 31.17 7.09 48.07 7 18 0 35.8-2.27 53.73-4 34.56-3.34 67.33.21 101.72 2.48 37 2.45 72.79-5.86 109.63-6 21.73-.1 42 6 63.52 7.13 23.72 1.23 44.63-8.92 68-9.45M.24 796.16c16.16-3.82 26.75-16.32 42.22-20.9 9.21-2.72 19.44-.55 28.32 2.16 20.81 6.34 39.27 18.73 61.74 18.72 18.12 0 35.33-6.37 52.54-11.24 19.77-5.59 38.21-4.82 58.25-7.5 16.95-2.27 35.33-7.36 52.18-3 19.27 5 32.52 21.62 53 23.45 34.25 3 66.78-20.71 101-14.46 17.42 3.18 28.86 13.6 47.37 13.5 18.3-.1 36.27-4.5 54.2-7.6 15.52-2.68 31-4.55 46.8-3.94 18.58.71 36.14 5.92 54.46 8.35 38 5 71.77-11.08 109.12-11.65 22.64-.34 41.2 11.11 63.16 13.88 25.47 3.2 43.78-15.79 68.17-18.62"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 780.55c27.68-11.5 39.43-44.61 72.12-29 19.62 9.35 37.53 28.74 60.58 28.69 18.52-.05 36.22-10.45 52.86-17.44 20-8.4 37.72-8.06 58.4-12.27 17-3.46 35.54-10.86 52.35-3.82 20 8.39 31.45 33.95 54.28 36.59 34.45 4 66.74-32.32 100.74-22.57 18.48 5.3 25.81 21.08 46.59 20.86 18.5-.19 37.1-7.14 54.74-11.82 15.35-4.07 31-7.42 47-6.41 18.73 1.17 35.56 9.1 53.69 12.94 39.49 8.37 70.26-17 108.43-18.07 23.76-.66 40.49 16.92 62.72 21.71 26.79 5.77 43.88-23.4 68.32-29.14"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 764.94C19 754 27.71 731.79 45.93 721.31c10.24-5.89 18.84-1.68 28.13 4.35C92 737.36 110 764.15 133.45 764c18.9-.09 37.32-14.83 53.2-23.66 20.16-11.2 37.22-11.21 58.58-17.09 17.34-4.78 35.5-14.4 52.47-4.65 20.48 11.78 30.29 45.9 55.25 50.3 34.82 6.15 66.87-44.1 101-31 19.26 7.4 22.78 28.75 45.8 28.34 18.7-.33 38.1-10.23 55.29-16.35 15.09-5.36 31-10.51 47.27-9.08 18.84 1.66 35.14 12.2 52.87 17.75 40.87 12.79 68.8-23 107.6-24.6 24.7-1 40.18 23.06 62.22 29.87 27.1 8.38 45.16-31.51 68.43-39.78"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 749.34c19.85-14.06 27.87-40.37 47.41-53.5 10.68-7.17 18.72-2.32 28.06 5.16 16.56 13.26 34.46 46.72 58.31 46.49 19.35-.18 38.35-18.9 53.55-29.18 9.38-6.34 19-12.66 30.13-15.45 9.6-2.41 19.1-2.63 28.64-5.91 17.7-6.09 35.35-17.75 52.48-5.47 20.57 14.77 28.95 57.26 55.67 63.32 16.93 3.84 40.67-15.3 53.59-23.34 13.28-8.27 32.72-22.79 48.41-15.52 19.66 9.11 20.26 35.86 45.1 35.16 18.92-.53 39.14-13.43 55.81-20.82 14.74-6.54 31-13.58 47.48-11.75 19 2.12 34.78 15.35 52.06 22.35 42 17 67.48-28.59 106.67-30.52 25.36-1.25 40.16 29.1 61.66 37.59 12.44 4.91 19.92-2 28.4-11 13.5-14.25 21.71-30 40.08-38.36"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.25 733.76a63 63 0 0 0 23.87-25.9 258.14 258.14 0 0 1 25-34.63c10.88-7.83 18.78-2.8 28 5.54C93 693 110.2 731 134.64 730.55c20-.35 39-21.89 53.88-33.3 9.28-7.13 18.89-14.41 30.31-17.6 9.67-2.7 19.1-3 28.65-6.82 17.88-7.19 35.18-20.62 52.33-6.31 13.56 11.31 21.1 31.6 30.19 46.29 5 8.16 14.17 25.18 25.08 28.08 17.11 4.55 42.6-18.65 54.7-27.23 13-9.21 33.21-26.45 49.24-18.17 19.84 10.24 18.37 41.64 44.58 40.53 19.22-.81 40-16.43 56.25-24.93 14.38-7.53 30.85-16.33 47.63-14.17 19.24 2.48 34.46 18.16 51.35 26.32 42.62 20.61 66.35-33 105.64-35.12 25.91-1.38 40.11 34.39 61.09 44.1 12.84 5.93 20.3-2.75 28.3-12.46 13.33-16.16 20.94-34.2 40.12-44.13"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 718.2a58 58 0 0 0 24.34-26.65 256.9 256.9 0 0 1 25.72-36.7c10.73-7.53 19-3 28.05 5.34 16 14.72 31.54 53.75 56.94 52.93 20.79-.66 39.19-23 54.18-35.28 9.2-7.56 18.77-15.35 30.45-18.54 9.86-2.7 19-2.8 28.67-7.09 17.74-7.87 35-22.67 52-7.2 13.81 12.58 20.71 35.34 29.41 51.39 4.55 8.4 13.24 27.53 24.36 30.81 17.62 5.2 44.51-20.79 56.42-29.79 13-9.84 34.08-28.88 50.64-20 20 10.73 17.13 45.31 44.33 43.67 19.61-1.18 40.59-18.88 56.56-28.32 14.06-8.31 30.65-18.49 47.7-16.14 19.5 2.69 34.16 20.26 50.79 29.27 42.87 23.23 65.37-35.76 104.56-37.72 26.56-1.33 39.62 38.15 60.52 48.62 13 6.52 20.46-2.87 28.15-12.93 13.17-17.24 20.1-37.06 40.07-47.37"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.25 702.61a57.72 57.72 0 0 0 24.37-24.82 264.41 264.41 0 0 1 25.91-34.4c10.49-7.48 18.67-4.12 28.1 3.91 16.65 14.19 31.49 50.57 56.53 50.7 22 .11 41.83-24.1 57.75-36.31 9-6.9 18.43-14.35 29.87-16.6 8.88-1.75 15.48-1.8 24.06-5.38 17.37-7.24 39-25.44 54.93-7.08 10.51 12.08 17.51 29.85 25 43.75 6.09 11.36 13.89 31.76 28 35 18.2 4.16 38.71-14.84 52.33-24.87 12.34-9.09 37.68-31.36 54.82-21.87 21.16 11.73 21.59 48.91 51.5 42.92 16.91-3.38 32.17-15.92 46.3-25.08 15.6-10.11 34.16-23.06 53.78-19.39 19.43 3.63 35.05 20.81 52.24 29.29 44.23 21.82 62.84-41.05 102.91-41 26.57 0 35.54 41.49 56.38 52.18 13.08 6.71 20.5-5.1 27.39-15 12.37-17.67 19-39.48 41.51-44.81"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.25 687c21.1-12.36 29.75-34.89 48.6-49.4 10.64-8.18 17.81-6.75 27.86.45 18.79 13.47 30.52 44.12 54.46 49.72 21.46 5 42.9-18.14 58.29-29.74 9.72-7.32 20-14.94 32.08-17.63 7.58-1.69 15-1.59 22.51-4.16 15-5.15 36.59-21.68 52.23-11.13s24.77 34.46 34.47 49.74c5.69 9 13.57 24.61 24.78 28.61 17.28 6.17 38-12.74 50.29-22.23 14.62-11.31 34-29 53.47-21 21.91 9 32.24 44.69 59.34 39.89 17.42-3.08 32-15.59 46.26-25.11 14.55-9.67 29.72-18.83 47.82-15.8 19.87 3.32 36.91 16.5 55.29 23.95 21.34 8.65 35.12 4 52.45-10.49 14-11.68 32.64-37.21 53.27-35.28 25.16 2.35 26.36 42.5 45.22 54.59 15 9.6 22.08-4.84 30.18-16.93a241.64 241.64 0 0 1 20.6-30q9-13 23.44-7.58"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.25 671.44c19.34-8.58 29.51-25.65 46.11-38 13.19-9.8 22.74-7.34 35 2.5 16 12.82 29.48 38.8 51.34 42.93 22.56 4.25 45.35-19.53 62.47-30.63 17.43-11.29 32-10.65 51-16 20.33-5.78 40.18-19.91 58.18-2 10.22 10.17 18.11 23.84 26.31 35.56 7.71 11 18.05 30.33 33 32.82 36.11 6 54.16-56.8 91.77-43.48 23.53 8.33 40.57 39.69 67.37 37.92 16.91-1.12 30.8-14.58 44-23.69 12.94-9 25.2-15.35 41.28-14.18 22.95 1.68 44.34 14.41 66.06 20.93 20.6 6.19 33.54 2.56 49.33-12.59 11.57-11.1 34.92-46.37 55-39.93 21.82 7 19.08 45.28 35 58.76 15.28 12.92 26-11.21 33-21.64a132.47 132.47 0 0 1 21-27.73q11.81-11.29 25-1.38"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 655.86c25.86-8.34 47.78-46.71 77-30.29 18.54 10.42 31.15 34.6 53.6 37.61 22.13 3 43.85-16.1 61.37-26.73 19.73-12 36.31-12.52 58.08-16.81 17.06-3.36 41.19-15.49 56.43-2.68 13.07 11 21.75 28.18 31.36 42 6.5 9.36 16.31 27.54 29.19 29.51 35.36 5.43 48-57.84 85.5-46.06 25 7.87 46.44 41.48 74.71 36.31 15.11-2.77 26.52-14.51 38.26-23.4C602 627.86 638 650.65 676.64 662c22.88 6.68 34.66 2.39 50.05-15.87 10-11.89 27.1-42.5 46.71-37.8 25.16 6 18.87 52.25 40.56 63.62 15.56 8.15 26.6-20.86 32.51-30A88.7 88.7 0 0 1 867 616.59q13.51-8.94 25.14 3.2"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 640.27c27.38-7.06 48.64-35.76 78.66-24.71 18.83 6.93 31.62 22.78 53.19 21.51 22.68-1.33 41.84-18.15 60.16-29.88 22.52-14.43 38.88-16.64 64.9-14.65 20.12 1.55 47.77-2.33 61.76 14.34 8.54 10.17 15 22.79 21.89 34 5.36 8.77 15.42 31.11 27.53 33.08 17.6 2.86 33.16-22.35 42.35-33.38 11-13.22 23.22-29.88 42-24.18 24.4 7.39 45.12 40.66 72.44 36.32 16.25-2.52 28.88-16.72 41.12-26.3s23.81-17 39.62-14.88c24.37 3.33 47.73 20.84 69.81 30.65 9 4 19.05 9.48 29 6.25 8.73-2.85 15.39-12.81 20.46-19.79 8.21-11.28 20.53-37.29 36.73-38.2C787.39 589 795 641 812 653.8c16.35 12.29 26.47-12.9 33.56-23.81a102.22 102.22 0 0 1 20.29-25.9q12.79-9.93 25.27 1.08"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 624.68c28.13-5.83 50.76-26.63 80.62-19.08 15.94 4 29.61 13 46.63 12.51 27.79-.85 49.26-26.12 70.39-41.16s35.67-16.58 60-8.73c12.73 4.11 25.24 8.95 38.13 12.56 8.13 2.28 15.49 2.37 22.3 7.74 12.6 10 19.92 29.44 28 42.83 5.51 9.16 13.66 27.36 26.61 27.42 15.92.09 30.55-24.7 38.33-35 10.74-14.28 23.54-34.33 43.47-28.43 24.61 7.28 45.51 41.35 73.2 35.34 15.08-3.28 27.6-16.54 39.08-25.83 14.87-12 29.41-23.19 49.15-16.29 22.23 7.77 41 24.32 61.35 35.77 19.27 10.85 30.2 11.05 44.26-5.85 9.44-11.33 23-43.88 41.94-41 22.91 3.47 32.31 44.94 47.95 58 16.4 13.67 25.16-5.27 33.43-17.83a110.21 110.21 0 0 1 19.34-25.37q11.93-10.28 24.58-.32"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.25 609.09c28.41-4.12 52.93-16.84 82.2-12.88 15.87 2.15 32.11 7.46 48.27 5.92 24.4-2.33 43.2-26.6 60.35-41.81 19.92-17.67 34.6-26.11 59.82-14.87 14.31 6.37 27.8 14.44 42.2 20.62 11.28 4.84 22.8 5.18 31.36 14.64s14.49 22 20.91 32.64c5.54 9.21 14.23 28.63 27.1 29.74 16.76 1.45 32.1-23.2 40.67-34.32 11.31-14.67 24.58-35.27 45.31-29.42 24.42 6.89 45.73 40 73.12 32.89 16.28-4.25 29.18-17.76 42-27.75 12.34-9.6 27.45-21.9 44.16-17.67 23.27 5.9 41.94 27.52 61.74 40 20.07 12.62 31.34 10.82 47-6.71 9.68-10.86 21.11-33.22 38.2-32.73 21.89.62 33.75 38.31 48.71 50.48 15.59 12.69 23.36-.82 32-13.76a109 109 0 0 1 17.76-23.53q11-9.81 23.13-.88"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 593.51c27-1.45 53.63-4.83 80.69-5.65 17.13-.52 35-.13 52-2 26.53-3 43.26-28.29 61.95-44.86 7-6.18 14.75-13 23.87-15.65 13.21-3.8 26.21 3.8 37.59 9.61s22.26 12.52 33.89 17.77c11.43 5.15 24.24 5 33.34 14.08 15.5 15.46 26.42 58 50.6 59.88 17.86 1.37 33.9-21.94 43.79-33.09 11.59-13.09 25.56-30.12 45.05-25.22 23.64 5.94 43.86 33.17 69.84 28.95 17-2.75 32.35-17.18 45.66-26.86s29.06-21.31 46.57-18c20.58 3.86 37 23.94 53.9 35.15s30.6 12.16 46.51 0c12.51-9.57 24.2-28 41.67-28.56 22.79-.67 32.56 29 47.9 41.32 14.23 11.41 21.61 3.79 30.64-9.14a111.74 111.74 0 0 1 16.18-21.64q10.13-9.37 21.71-1.28"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 577.92c25.92 1.26 52.59 7.87 78.43 3.08 19.46-3.61 37.48-10.84 57.29-12.75 23.49-2.27 38.17-20.08 55.32-34.34 20.84-17.34 34.4-19.39 59.07-7.73 11.07 5.24 21.67 11.46 32.86 16.46 11.43 5.1 24.78 5.43 34.66 13.23 18.49 14.6 32.17 52.87 57.9 54 37.18 1.66 53.39-55.54 92.93-48 22.47 4.28 41.53 23.9 65.27 21.93 18.93-1.57 36.85-14.79 52.94-23.93 15-8.53 33.52-20.13 51.73-17 17.27 3 29.65 18.23 44.29 26.42 16.59 9.28 30 7.75 46.9-.57 14.1-6.95 31.18-21.67 48.13-18 21.79 4.72 26.43 33.38 45.3 42.75 10.84 5.38 16.64-2.42 22.69-11.1a138.92 138.92 0 0 1 15-21.57q8.87-9.86 20.63-3.38"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 562.34c27.19 4.28 51.93 20.66 79.54 10.88 21.45-7.59 38.93-21.39 62.05-24.1 38.79-4.53 59.28-44.77 101.38-30.88 13.91 4.59 27 11.39 41.13 15.47 8.82 2.56 17.43 2.06 25.58 6.65 21.81 12.27 37.94 49.53 64.48 52.7 36.78 4.39 61.16-42.47 99.23-37.38 21.56 2.87 40.89 16.93 63.16 14.85 20.18-1.9 40.34-14.41 58.22-22.9 16.36-7.77 35.72-17.72 54.44-14.66 13 2.12 22.86 11.06 34.42 16.52 35 16.51 63.48-15.06 97.53-8.82 21.51 3.94 25.5 28.7 43.16 38.62 10.31 5.8 16 .58 22.46-7.85 10.83-14.19 14-26.83 33.8-24.38"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 546.76c28.4 7.79 51.26 32.47 80.81 16.83 22.38-11.86 38.78-32.12 65.15-35.15 16.19-1.87 30.45-6.78 45.87-11.74 19.33-6.23 36.87-7 57.05-4.48 19.11 2.35 44.68 1 61.15 10.21 23 12.89 35.56 47.46 62.47 53.7 18 4.19 39.27-8.51 54.64-15.88 16.07-7.7 31.84-14.35 50.07-12.76 20.4 1.77 39.25 12.39 60.15 9.82s40.09-15.52 58.4-24.91c14.87-7.62 30.32-14.71 47.38-14.67 15.26 0 26.08 7.75 40 12.37 34.22 11.39 64.82-7 98.64-2.92 21.4 2.59 27 22 44.61 31.3 8.82 4.68 14.94 3.16 22.23-3.21 12-10.5 15.73-19.66 33-18.52"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M.24 531.18c28.91 9.93 50.57 41.82 81 20.38 20.33-14.34 35.37-40.66 61.18-45.08 36.48-6.26 75.4-.62 112.25-5 16.24-1.94 39.42-9.77 54.34-.91 23.38 13.91 38 55.21 66.8 59.46 35.58 5.25 66.92-27.53 103.29-25 19 1.34 36.54 10.68 55.92 7.47s36.25-16.48 52.62-26.77 33.54-20.44 53.66-19.08c14 1 26 8.37 38.93 12.91a108.39 108.39 0 0 0 51.34 4.68c16-2.28 31.59-6.78 47.92-5.08 21.38 2.23 30.65 18.48 48.78 27.13 21.14 10.09 36-10.48 57.21-10M.24 842.92c297.31.32 594.61-.29 891.92 0M.24 515.57v327.35"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M879.73 516.71c-14.06 18.18-13.05 37.28-10.31 58.65 2.46 19.18 1.2 39.79 6.25 58.4 7.19 26.55 5.56 52.57 5.23 80-.51 43-1.2 86.08-1.3 129.12"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M867.84 519.26c-9.62 21.76-12.18 43-12.06 66.48.1 20.52-2.9 44 4.39 63.4 9.42 25.16 8.22 48.21 7.92 75-.45 39.6-1 79.19-1.06 118.79"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M856.25 521.54a602.9 602.9 0 0 0-12.14 81.65c-1.78 21.22-7.43 47.65 1.86 67.54 4.95 10.58 9 17.79 9.62 29.88.68 12.79-.2 25.8-.34 38.61-.39 34.57-.8 69.13-.78 103.71"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M844.83 521.93c-2.87 31.94-7.57 63.49-11.81 95.24-2.85 21.36-10.83 50.89-.2 70.82 5.37 10 9.58 15.46 10.14 27.41.56 11.7-.27 23.58-.41 35.29-.37 30.75-.66 61.49-.64 92.24"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M833.5 518.88c-.65 33.75-6.62 66.7-12.16 99.88-3.65 21.85-11.57 51.61-.47 72.15 5.39 10 9.39 15.29 9.82 27.16.43 11.64-.39 23.43-.57 35.08q-.69 44.88-.77 89.77"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M822.22 512.65c2 34.54-5.64 66.27-12.48 99.7-4.76 23.24-7.51 47.3 1.72 69.75s6.82 43.88 6.35 67.76c-.6 31-1 62-1 93.06"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M811 504.77c5.11 34.27-2.85 60.63-11.11 92.92-6.4 25-2.54 45.43 3.45 70s2.76 50.75 2.19 75.86c-.76 33.13-1.32 66.27-1.35 99.41"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M800 496.73c4.65 19.55 7.09 39.23 1.68 58.91-2.86 10.43-9 19.44-12.13 29.83-7.27 24.34 4.32 42.49 6.28 66.17 2.15 26.08-1.65 53.78-2.34 79.92-1 37.11-1.74 74.23-1.81 111.35"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M789.09 490c5.72 18.44 11.18 39.55 4 58.56-3.06 8.14-9.32 14.59-12.75 22.56-10.66 24.71 8.38 42.74 7.43 66.84-.46 11.56-3.92 22.89-4.72 34.47-1.16 16.89-1.25 33.92-1.75 50.84-1.18 39.87-2.13 79.76-2.24 119.65"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M778.38 486c6.31 18.16 13.38 38.68 5.25 57.52-3.41 7.89-10 13.71-14.1 21.15-13.26 24.15 11.6 42.08 9 65.85-1.32 12.15-6.34 23.37-7.33 35.7-1.41 17.41-1.45 35.06-2 52.52-1.37 41.37-2.51 82.76-2.66 124.15"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M767.8 485.4c6 18.27 12.38 38.89 4.87 57.82-3.26 8.19-9.86 14.47-13.71 22.3-12 24.48 10.95 42.42 7.82 66.24-1.59 12.1-6.51 23.07-7.5 35.41-1.41 17.41-1.65 35-2.31 52.45-1.55 41.08-2.81 82.18-3 123.29"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M757.28 486.69c5.57 18.88 10.32 38.94 4.38 58.41-2.78 9.1-8.67 16.87-12 25.72-4.22 11.24-4.35 22.19-1.39 33.75 3 11.79 9 20.88 6.82 33.45-2 11.74-6.73 22.13-7.78 34.2-1.48 17-1.85 34.18-2.6 51.23-1.74 39.79-3.1 79.62-3.3 119.46"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M746.8 489.18c5.13 20 8.05 39.69 3.61 60.14-2.3 10.6-7 20.52-9.66 31a75.52 75.52 0 0 0-1.41 33.76c2.23 11.63 7.1 21.39 4.3 33.34-2.7 11.52-7.3 21.37-8.39 33.38-1.37 15.2-1.91 30.53-2.69 45.76-2 38.75-3.5 77.54-3.71 116.34"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M736.33 492.18c7.33 34.38 2.5 63.86-3.68 97.7-2.2 12.07-3.38 23.8-1.85 36 1.44 11.47 4.88 21.05 1.63 32.46-3.11 11-7.86 19.75-9.19 31.34-1.67 14.4-2.1 29.08-3 43.54-2.18 36.52-3.78 73.08-4 109.67M725.85 495c5.84 35.5 2.84 70.66-1.58 106.15-1.48 11.82-2.75 23.55-2.13 35.49.59 11.45 3.32 21.49-.87 32.55-4.07 10.75-8.76 18.49-10.13 30.33-1.64 14.11-2.33 28.4-3.3 42.57-2.28 33.57-3.91 67.18-4.12 100.83"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M715.34 496.94c4.09 36.75 3.8 75.26.45 112.1-1.13 12.43-2.37 24.85-2.46 37.34-.08 11.2 1.4 21.36-3.47 31.78-4.77 10.19-9.24 17-10.74 28.61-1.73 13.48-2.51 27.16-3.56 40.7-2.47 31.77-4.19 63.59-4.4 95.46"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M704.76 497.32c2 38.52 3.76 77.9 1.74 116.45-1.1 20.91 1.73 51.11-8.4 69.87-5.28 9.8-9.41 16-11 27.54-1.77 13.14-2.7 26.47-3.84 39.68-2.67 30.63-4.48 61.31-4.69 92.06"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M694.1 495.47c.58 39.24 3.1 78.59 1.61 117.84-.81 21.37 1 51.7-9.68 70.8-11.95 21.34-12.65 42.7-14.94 67.06-2.87 30.53-4.84 61.08-5.05 91.75M683.11 491.15c2 38.27 3.18 75.33-.09 113.58-1.26 14.75-3.29 29.43-4.38 44.2-.82 11.06-.56 21.67-5.4 31.82-10.09 21.18-11.51 41.92-13.87 65.4-3.22 32.18-5.66 64.42-5.89 96.77M671.81 485.24c2.25 21.7 7.26 44.26 5.37 66.18-1.26 14.64-5.72 29.2-7.93 43.77-2.37 15.67-5.23 31.23-6.32 47.06-.78 11.2 0 22.4-3.45 33.16-16.72 51.81-18 113.05-18.57 167.51"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M660.32 478.81c3.07 20.27 12.07 45.22 8.75 66-2.06 12.92-10.56 24.53-13.63 37.43-4.2 17.62-8 35.5-9.13 53.61-.72 11.08.71 22.43-1.06 33.42-9.26 57.24-16.18 115.48-16.9 173.63"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M648.74 472.91c2.55 13.42 5.75 26.55 8.93 39.81 1.68 7 5.24 18.81 3.33 26.32-3.3 12.94-16.11 21.4-20.28 34.8-9.34 30-11.27 58.36-9.72 89.45 1.17 23.38-4.7 48.11-7.25 71.31-4 36-7.43 72.09-8 108.31"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M637.21 468.63c3 14.05 6.67 27.66 10.69 41.43 1.85 6.32 6.63 17.65 4.25 24.7-2.49 7.39-9.32 9.82-14.56 14.78-6.38 6-8.17 9.69-11.31 18-11.1 29.25-15.36 61-9 91.47 4.47 21.37-2.65 47.24-5.13 69.08-4.33 38.16-8.35 76.45-8.94 114.87"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M625.84 467c3.26 14.82 7.22 29 11.83 43.45 1.86 5.82 6.76 16.48 4.15 23.09-2.83 7.18-10.43 8.91-16 13.25-6.81 5.35-8.89 8.72-12.45 16.63-12.78 28.39-18 64.07-8.79 93.77 6.11 19.71-2.06 47.79-4.53 69-4.52 38.75-8.86 77.67-9.42 116.72"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M614.21 469.38c3.34 14.38 7.37 28.29 11.68 42.37 1.81 5.9 6.49 16.74 3.87 23.37-2.79 7-10.19 9-15.57 13.43-6.65 5.44-8.8 8.94-12.29 16.81-13 29.25-16.28 62.55-8.87 93.28 5 20.59-2.89 47.34-5.41 68.58-4.57 38.41-8.82 77-9.52 115.69"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M601.73 475.76c3.44 13.81 7.59 27.28 11.52 40.94 1.68 5.81 5.54 16.94 3.1 23.35-4.44 11.69-19.45 16.3-24.84 28.88-13.48 31.45-11.87 61-9.56 93.88 1.59 22.75-4.79 47.41-7.49 70-4.36 36.55-8.22 73.23-8.92 110.06"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M588.65 484.9c4.09 15.17 19.15 45.07 13.43 61.84-3.57 10.48-16.23 16.77-20.78 27.62-7.64 18.22-11.34 38.74-11.92 58.41-.36 12.06 2.88 24.42 1.89 36.34-1.8 21.8-7 44.19-9.67 66.08-4.32 35.77-8 71.67-8.62 107.72"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M575.23 495.49c4.63 15.8 17.58 41.61 12.19 59-3.37 10.84-13.69 18.95-17.61 30.22a177.61 177.61 0 0 0-9.44 54.15c-.26 11.67 3.62 26 .34 37.44-2.07 7.21-5.39 12.57-6.68 20.49-2.26 13.83-3.76 27.84-5.46 41.75-4.22 34.67-7.68 69.46-8.15 104.41"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M561.73 506.24c5 15.6 14.67 35.85 11.56 52.88-2.29 12.52-11.29 23.63-14.84 36.14a188.82 188.82 0 0 0-7.29 49.55c-.15 12.51 4.56 27.18-.92 38.92-3.94 8.42-8.21 12.14-10 22.33C538 719.4 536.59 733 535 746.43c-3.86 32.06-6.81 64.19-7.12 96.49"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M548.39 515.86c5.56 15.75 13.22 33.28 10.57 50.43-1.85 11.92-8 23.1-10.88 34.87a208.88 208.88 0 0 0-6.28 49.08c-.09 12.69 4.8 28.61-2.31 40-5.77 9.23-10.66 12.48-12.85 24.17-2.41 12.87-3.6 26.12-5.15 39.12-3.54 29.7-6 59.48-6.2 89.4"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M535.48 523.05c6.26 16.06 12 31.47 9.74 48.87-1.63 12.57-6.22 24.74-8.79 37.16a219.57 219.57 0 0 0-4.82 44.7c0 13.22 5.55 30-3.09 41.39-6.21 8.19-12 11.12-14.67 22.07-3 12.11-3.63 25.59-5.13 37.94a759.69 759.69 0 0 0-6 87.74"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M523.24 526.51c13.5 31.34 7.73 53.5 1.64 85.51a232.34 232.34 0 0 0-4.3 44.34c.06 13.48 5.43 29.67-3.62 41-6.69 8.41-12.92 11.09-15.81 22.5-3 11.78-3.63 24.94-5.11 37a752.47 752.47 0 0 0-5.87 86"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M511.06 525.47c11.44 31.23 5.47 51.29-1.1 82.34a212.77 212.77 0 0 0-4.54 44c0 13 5 29.46-2.87 41-5.39 7.94-10.74 11.64-13.23 21.75-3 12.17-3.71 25.61-5.24 38a792.18 792.18 0 0 0-6.47 90.38M497.84 521.65c3.68 15.2 6.5 29.11 1.87 44.26-3.07 10-7.8 19.34-10.52 29.5-3.73 13.92-5.1 28.43-5.27 42.81-.15 12.78 3.54 27.51.38 40.09-13.39 53.13-18.55 109.57-19.3 164.61M484.46 517.62c1.87 15 3.37 28.08-3.84 41.57-4.3 8-9.79 14.23-12.78 23.1-8.57 25.4-7.81 55-2.17 80.65 4.55 20.69-1.77 43.55-4.24 64.69-4.47 38.28-8.29 76.72-8.95 115.28"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M471.87 515.91c.9 14.68 2.29 28.18-6.62 40.34-5.08 6.93-10.62 11.33-13.9 19.68-7.81 19.87-13.77 62.13-1.22 80 4.63 6.58 6.44 6.73 5.63 16.58-1.33 16.26-4.27 32.55-6.15 48.77-4.69 40.37-9 81-9.69 121.64"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M459.64 517.55c.67 14.54 1.45 28.26-6.45 40.87C448.43 566 443 571 440 579.82c-7.63 22.59-11.14 56.3-2.11 78.15 2.75 6.67 5.67 8.13 5.23 17.25-.79 16-3.71 32.24-5.55 48.16-4.61 39.71-9.31 79.53-10.2 119.53"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M446.8 521.37c.51 13.86.93 27.91-4.83 40.86-3.75 8.44-9.18 15.4-12.08 24.33-7.21 22.16-11.06 55-3.8 77.21 6.49 19.85 1.69 41-.69 61.89-4.46 39-9.64 78-10.6 117.25"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M433.55 526.54c.49 14.8.35 29.24-4.11 43.49-3.17 10.11-7.67 19.49-10.11 29.86-5.47 23.25-6.84 48.5-4.77 72.25 4.94 56.66-10.93 113.93-12.33 170.77M420.11 532.22c.89 28.27-5.57 52.94-10.62 80.34-4.22 22.85-4 45.88-6.33 68.88-2.05 20.35-1.46 40.89-3.7 61.35-3.66 33.37-9 66.51-9.79 100.13M406.67 537.56c.84 28.88-2.83 56.8-6.84 85.31-3.12 22.16-1.91 46.1-8.14 67.4-5.74 19.63-3 41.41-5.31 62-3.38 30.25-8.6 60.15-9.27 90.64M393.44 541.72c.71 30.36-1 60.79-4.05 91-2 20.32.12 46.52-9.41 64.63-9.34 17.74-4 40.65-6.24 60.68-3.13 28.38-8.56 56.27-9.19 84.9M380.61 543.86c.32 32.32-.21 64.78-2.52 97-1.39 19.45.41 43.74-10.22 60.35-10.86 17-4.25 38.26-6.24 58.22-2.8 28-8.91 55.24-9.65 83.46M367.91 541.8c-.18 31.83-.2 63.72-1.55 95.52-.87 20.29-.05 44.77-11.56 61.95-11.11 16.6-4.05 40.82-6.1 60.71-2.87 27.76-8.45 55-9.28 82.95M353.09 529.3c-.38 32.23 2.19 64.61 1.1 96.75-.72 21.28-4.33 39.67-14.11 58.16-8.78 16.61-3.5 42.41-5 61.5-2.48 32.45-7.46 64.64-8.26 97.22M337 510.84c-.29 18.92-2.29 38.78.15 57.63 1.65 12.85 5.31 24.25 4.78 37.42a116.52 116.52 0 0 1-5.13 30.89c-2.85 9-8.88 16.39-12.18 24.56-2.51 6.19-2.14 11.44-2 18.69.28 15.81-.48 31.62-1.42 47.39-2.27 38.5-6.23 76.92-6.83 115.5M320.79 492.45c-.33 18.82-3 39 .17 57.69 2.19 12.94 9.14 22.14 8.67 35.8a82.36 82.36 0 0 1-7.34 30.66c-3.32 7.53-10.53 14.66-13.24 21.93-1.83 4.91-.06 12.62-.09 18-.07 17.59-1 35.21-1.84 52.78-2 44.51-5 89-5.39 133.6"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M305.93 480.22c-.42 19.16-4.86 42.83.47 61.61 3 10.62 10.55 16.12 11.13 27.76.6 12.07-3.45 23.41-9.15 33.82-3.43 6.27-12.17 13.73-14.05 20.19-.63 2.17 1.48 10.81 1.44 13.85-.28 19.87-1.64 39.77-2.42 59.62-1.9 48.59-3.94 97.21-4.18 145.83"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M293.16 478.55c-1 18.73-5.47 42.38.09 60.77 3.09 10.24 10.52 15.5 11.33 26.78.88 12.23-3.12 24-8.72 34.64-3.49 6.63-12.49 14.38-14.28 21.29-.39 1.5 1.69 10.65 1.6 13.43-.68 20-2 40.08-2.79 60.12-1.9 49.09-3.52 98.21-3.78 147.33"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
            <path
                d="M280.39 481c-2.21 15.94-7.34 37.38-2.4 53.38 2.86 9.26 8.86 14.71 10 24.84 1.62 13.84-1.16 28.64-6.07 41.55-3 8-10.75 16.33-12.52 24.45-.64 2.94 1.38 10.65 1.25 14.27-.74 19.67-2 39.34-2.79 59-1.92 48.12-3.58 96.28-3.85 144.43M267.39 484.81c-3.29 12.21-9.89 30-6 42.95 2.55 8.45 7 14.2 8.3 23.46a137.71 137.71 0 0 1-2.15 48.78c-2.17 9.63-9.28 20.26-10.36 29.87-.51 4.57 1.16 11.64.95 16.49-.76 17.76-1.85 35.51-2.6 53.27-2 47.73-3.76 95.51-4 143.29M254.38 488.63c-3.65 8.56-11.62 21.69-9.71 31.79 1.36 7.17 5.38 13.85 6.71 21.38a192.52 192.52 0 0 1 1.52 58.34c-1.49 11.29-7.54 23.26-8.07 34.45-3.27 68.85-5.48 139.11-5.91 208.33M241.57 491.05c-3.25 6-12.22 16.77-12.13 24.5.07 5.94 4.38 13.77 5.58 19.7A233 233 0 0 1 239 600c-1 12.67-5.61 25.13-6.3 37.68-3.73 67.93-5.88 137-6.31 205.24M229 491c-3 6-11.83 16.91-12.22 24.39-.31 5.85 3.83 14 4.88 19.78a274.94 274.94 0 0 1 4 65.12c-.79 13-4.29 25.6-5 38.46-3.88 67.74-6.32 136.22-6.83 204.13M216 489.84c-3.14 8.57-10.14 20.07-10.82 29.58-.51 7.1 2.36 15.41 3.25 22.42 4.38 34.59 1.83 67.08-.22 101.58-3.92 66.29-6.4 133.07-6.93 199.49M202.48 488.06c-4.91 22.89-9.29 41.08-7.62 64.46a789.91 789.91 0 0 1 .59 98.64c-3.36 63.84-6.33 127.84-6.77 191.75M188.77 486c-2.15 26.42-8 52.71-7.57 79.29.52 31.8 3 63.37 1.38 95.21-3 60.77-6.17 121.55-6.47 182.42M175 484c.75 32.18-6.25 62.41-7.51 94.2-1.22 30.57 3.55 61.19 2.17 91.75-2.59 57.66-6 115.22-6.15 173M161.5 482.35c2.28 21.87 3.19 43.9-.26 65.71-2.09 13.19-5.72 26.09-7.1 39.4-3.15 30.33 4.26 60.38 2.83 90.59-2.59 55-5.92 109.79-6 164.88M148.36 481.41c4 23.77 5.28 47.21 1.28 71.07-2.38 14.2-6.62 28-8.74 42.29-4.47 30 5 58.68 3.58 88.4-2.51 53.24-6 106.33-6 159.75M135.77 482c7.91 41.17-.83 74.53-7.5 114.63-5 29.89 5.27 57.59 3.89 87-2.49 53.07-6.26 106-6.3 159.28M123.42 488.74c3.89 23.11 5.16 45.69 1.36 68.89-2.23 13.57-6.13 26.83-8 40.45-3.76 27.21 4.69 53 3.41 79.83-2.61 55-6.89 109.85-6.87 165M111.17 500.75c5.1 34.24-.43 62.82-4.76 96.42-3.11 24.11 3.53 47 2.46 70.82-2.62 58.29-7.91 116.48-8.13 174.93M99 515.29c3.72 28.71.37 53.78-2.73 82.09-2.17 19.86 2.54 39 1.67 58.64-2.75 62.3-9.12 124.45-9.73 186.9M86.75 529.68c2.35 22.52 1.47 43.84-.51 66.25-1.44 16.25 1.35 32 .66 48.16-2.82 66.3-10.25 132.38-11.28 198.82M74.46 541.21c7 100.53-9.51 201.2-11.4 301.7M62 547.2c.68 27.55 2.67 54.3 1.46 81.9-3.12 71.34-11.73 142.36-13 213.81M48.32 544.34c.38 30.06 2.43 59.48 1.26 89.6-2.71 69.72-10.22 139.18-11.65 209M31.8 533.37c.24 39.31 1.42 78.44.78 117.76-1 64-6.53 127.8-7.21 191.78M14.89 521.36c0 107.18-2.47 214.42-2.09 321.57M892 515.5c-14.65 19.15-11.48 39.61-6.39 61.46 4.55 19.51 5.39 38.06 7.13 57.87 6 68.59-.42 139.25-.62 208.09"
                style={{
                    fill: "none",
                    stroke: dividerColor,
                    strokeMiterlimit: 10,
                    strokeWidth: ".44743499999999997px",
                }}
            />
        </svg>
    );
};
export default GeometryWavesBackground;
