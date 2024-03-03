import { alpha, darken, lighten, useTheme } from "@mui/material";
const MiraxsageIcon = () => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode == "dark";
    let baseColor = lighten(theme.palette.divider, 0.65);
    let c1 = baseColor;
    let c2 = alpha(baseColor, 0.8);
    let c3 = alpha(baseColor, 0.7);
    let c4 = alpha(baseColor, 0.5);
    let c5 = alpha(baseColor, 0.3);
    let c6 = alpha(baseColor, 0.01);
    let c7 = alpha(baseColor, 0.0);
    let c8 = c1;
    let c9 = c7;
    if (!isDarkMode) {
        baseColor = darken(theme.palette.divider, 0.5);
        c1 = alpha(lighten(theme.palette.divider, 0.5), 0.5);
        c2 = alpha(baseColor, 0.3);
        c3 = alpha(baseColor, 0.4);
        c4 = alpha(baseColor, 0.5);
        c5 = alpha(baseColor, 0.6);
        c6 = alpha(baseColor, 0.7);
        c7 = alpha(baseColor, 0.07);
        c8 = alpha(baseColor, 0.1);
        c9 = alpha(baseColor, 0.6);
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -20 500 670">
            <defs>
                <style>
                    {`.cls-1{fill:${c1}}.cls-2{fill:${c2}}.cls-3{fill:${c3}}.cls-4{fill:${c4}}.cls-5{fill:${c5}}.cls-6{fill:${c6}}.cls-7{fill:${c7}}.cls-8{fill:${c8}}.cls-9{fill:${c9}}`}
                </style>
            </defs>
            <g
                id="\u0421\u043B\u043E\u0439_2"
                data-name="\u0421\u043B\u043E\u0439 2"
            >
                <g
                    id="\u0421\u043B\u043E\u0439_1-2"
                    data-name="\u0421\u043B\u043E\u0439 1"
                >
                    <path
                        d="M115.66 78a7.89 7.89 0 0 1 .91-1.73c8-8.67 16-17.36 24.14-25.91 1.73-1.82 4.07-3 6-4.64 1.37-1.09 2.52-2.45 3.9-3.52 4.59-3.56 9.12-7.22 13.92-10.48A25 25 0 0 1 177.82 27c3.35-.13 6.69-.62 10-.95v-1.18l-5.68-.42a10.87 10.87 0 0 1 1.51-.9c7.68-3 15.36-6 23.1-8.89a16.68 16.68 0 0 1 5-.47c1.85-.07 3.7 0 6 0L215.69 11c1.39-.22 2.61-.51 3.83-.6 3.71-.25 7.51 0 11.11-.73 8.6-1.8 17.35-1.46 26-2.39 10-1.08 20 0 29.86.88 7.22.6 14.31 2.58 21.46 4 1.61 2.43 3.08 5 4.86 7.26 3.11 4 6.32 8 9.67 11.83 2.22 2.55 4.21 5.44 7.61 6.77-.83-3.05-3.84-4.4-5.42-6.93v-2.86l3.69-3.23c-.85-1-1.59-1.89-2.36-2.76l-7.15-7.92c7.38 1.84 14.83 3.47 22.12 5.63 3.69 1.08 7.09 3.12 10.63 4.72 15.55 7 28.7 17 38 31.53 1.68 2.61 4 5.32 4.32 8.16a22.89 22.89 0 0 0 5.11 12.62 8 8 0 0 1 1.1 5.72 42 42 0 0 1-3.09 11.16c-2.78 5.83-5.6 11.48-4.42 18.22a3.74 3.74 0 0 1-.14 1.69c-2 6.34-1.72 12.74-1 19.24.65 5.77.7 11.59 1.21 17.38a60.68 60.68 0 0 1-1.93 21.44c-.95 3.47-.26 7.38-.35 11.08 0 1.85.22 3.81-.33 5.51a41.8 41.8 0 0 0-2 10.57 96.25 96.25 0 0 1-1.52 12.44c-1 5.6-1.89 11.32-3.76 16.66a46 46 0 0 0-2 20.81c.81 7.37 1.15 14.81 1.39 22.23.09 2.59-.73 5.2-1.14 7.8-.49-1.41-1.07-2.8-1.45-4.25-2.16-8.21-4.5-9.27-12.49-6.25a17.09 17.09 0 0 1-7.76 1.11c-6-.73-12-2-18-3.16a17.36 17.36 0 0 1-2.46-.83l.16-1c4.19.75 8.38 2.49 12.59.69a16.35 16.35 0 0 0 8.93-9.31l-4.29-1.15c1.62-1.69 4.29-2.47 4.77-5.5-1.29-1.22-2.62-2.46-3.81-3.57-.6.25-.82.28-.93.41a9.93 9.93 0 0 0-.61.93c-4.18-2.73-8.53-.32-12.67-.12l-2-2.22v-3l5-1.24c-.34-1.06-.58-1.78-.84-2.59l-4.29.6-.68 2.1-2.1 2.92c-2.16.3-1.7 2.38-2.45 3.63l-1.49-2.32c-3.73-.61-8.21 2.49-8.82 6.79l2.58 1.75c-.49.46-.75.72-1 1-1.59-.19-3.2-.32-4.78-.58-6.17-1-6.7-.68-8.29 5.38a3.16 3.16 0 0 1-.35.59l-2.86 1.77c-1-2.42-2.27-4.57-2.74-6.89-2.53-12.46 1.74-22.9 10.79-31.17 11.49-10.5 25.24-14 40.57-11.08 5.73 1.08 11.48 2 17.16-.17 1.27-.48 2.46-1.18 3.46-1.67-.88-2.31-1.74-4.12-2.24-6-2.06-7.93-.66-15.86.12-23.79a100 100 0 0 0 .79-11.19 114 114 0 0 0-1-15.57c-.8-5.29-2.35-10.47-3.62-15.68-.8-3.3-1.92-6.53-2.48-9.86s-.25-6.83-1-10.11c-1.49-6.76-6.14-10.56-12.69-12.25-2.52-.65-5.31-.87-7.49-2.12A35.18 35.18 0 0 0 335 99.09c-4.4-.3-8.82-.44-13.23-.58a50.7 50.7 0 0 0-5.08.15c-1.75.12-3.49.35-5.24.54l-16.14 1.65v.15l-6.87.43v.12l-6.89.45c-1.75.17-3.49 0-5.16.22-3.79.56-7.54 1.41-11.32 2-5.12.83-10.37 1.11-15.38 2.37-10.43 2.62-20.95 5.13-31 8.83-7.21 2.65-14.36 6-20.53 10.92-4.88 3.92-10.16 7.37-14.85 11.52A65.89 65.89 0 0 0 169 156.07c-2.61 4.8-2.15 9.88-1.49 14.89a14.38 14.38 0 0 1-3.51 12.16c-3.11 3.41-7.4 6-9.78 9.76-3.88 6.15-8.16 12.08-10.18 19.46-2.58 9.45-4.56 18.84-4.42 28.65 0 1.68-.26 3.36-.44 5.45a22.44 22.44 0 0 1 .92 3.07c1 6 2 12 2.83 18 .47 3.32 1.09 6.76-1.74 9.94l-3.31-3.06-1.19-3.39v-5.31c-4.92.72-7.92-.93-9.17-5.57l4-4.72-3.52-6.89c-.62-1.71-1.26-3.42-1.87-5.14a34.7 34.7 0 0 0-11.92-15.88 11.6 11.6 0 0 0-3.44-1.28c-1.2.88-1.93 1.41-2.65 1.95l-1.56-.74c-.77-6.36-1.44-12.79-2.36-19.19a27.94 27.94 0 0 0-1.89-6.25 25.26 25.26 0 0 1-.66-18.4c2.39-6.79 2-13.92 2.52-20.92a66 66 0 0 0-.3-8.76 13.65 13.65 0 0 0-.54-2.19l-5.78 1.63c.12-.86.17-1.67.35-2.44 2-8.23 3.93-16.45 6-24.65a8.26 8.26 0 0 1 1.74-3.16c2.79-3.34 5.69-6.58 8.54-9.86l-.21-.81-11-.74c4.53-7.79 6.58-16.85 14.54-22.18a25.31 25.31 0 0 0 4.81-4.5c-3.59-.73-6.72 1.22-10.4 1.45.55-2 .68-4 2.73-5.18 1.69-1 3.26-2.17 4.88-3.28l-.27-.64-3.65.56Zm111.13-4.16c-1.8 4.69-5.33 5.74-8.54 5.16-3.9-.72-7.74-1.79-11.65-2.45-2.47-.42-5.16-1-7.5-.4-4.89 1.17-7.76 5.38-11.47 8.54l1.82 2.4 5.41-1.74c.45 3 1.06 2.24-3.68 5.72-3.15 0-6.32.34-9.29 2.77.3 1.32.63 2.72 1 4.36l11.76-.75c4.67-4.49 10.34-5.44 15.76-7.3a4.77 4.77 0 0 1-.59 2.46 20.84 20.84 0 0 1-1.74 2.15l6.88.54-2 4.4 20.06-7.72v-.33L221 93.47c.44-3.74-4.09-5.4-2.41-9.57l13.93-6 6.43 4.39.57-.64c-6.42-5.9-10.28-13.89-16.52-20.12-2.86 2.35-2.5 4.91-1.77 7.91Zm72.36-18.74c5.08-4.66 3.65-9 2.32-15s-6.92-6-12-7.29c.69 2.34 1.27 4.34 1.85 6.33l-.66.22-5.94-7.85-.73.29a7.26 7.26 0 0 0 0 2.64c2.1 5 4.05 10 6.6 14.79a30.33 30.33 0 0 1 3 8.14c.35 1.65.91 3.27 1.38 4.9l.71-.14c.09-1.23.18-2.47.31-4.16l3.76 8.85.78-.21c-.4-3.9-.89-7.77-1.38-11.56Zm-61.39-15.89a8.11 8.11 0 0 0-.07 2.62c1.13 3.29 2.28 6.58 3.68 9.76.71 1.61 2.24 2.87 2.9 4.49A30.09 30.09 0 0 0 252 66.7c1.1 1 2.21 2.84 4.58 2.21-2.35-4.33-4.57-8.5-2.35-12.77.82-4-1.4-6.11-3.53-8.27-1.12-1.14-2.28-2.24-3.31-3.46s-.94-2.38.6-3.15c5 2.35 5 2.35 6.87 1.34l-13.6-7.35c.11 1.53.17 2.43.25 3.46Zm21.51-10.14-.66.73a18.19 18.19 0 0 0 1.18 2.07c1.58 2.12 3.29 4.15 4.8 6.32 3.67 5.23 7.11 10.63 10.94 15.74 1.56 2.09 3 4 3.29 6.69.05.56.67 1.08 1 1.62l.84-.27a15.83 15.83 0 0 0-.31-4c-1.18-3.56-2.65-7-3.91-10.55a20.11 20.11 0 0 1-.57-3.3c2.44.15 3.91 2.76 6.39 1.06-1.52-4.38-4.76-7.26-8.51-9.48-3.22-1.9-6.73-3.31-10.14-4.89-1.4-.63-2.88-1.15-4.34-1.74Zm58.05 37.74.68-.07a9.91 9.91 0 0 0 .24-2.08c-.64-6.48-.51-13.17-2.2-19.38-2.06-7.61-5.53-14.87-8.66-22.16-.72-1.67-2.56-2.87-3.88-4.28l-.71.57ZM179.8 56.17l-.54-.58c-2.74 1.65-5.73 3-8.17 5-2.68 2.23-4.66 5.28-7.29 7.59-3.93 3.45-7.07 7.3-8.73 12.34-1.19 3.65-2.6 7.22-1.73 11.39 6.98-13.27 16.27-24.83 26.46-35.74Zm-9.69 21.12a82.27 82.27 0 0 0-6 6.4 21.91 21.91 0 0 0-2.91 5.7c-.29.77.3 1.86.47 2.72h3.21c2.67-4 7-7.16 7.53-12.64Zm-36.25 1.58.37 2.6c3.52 1.49 4.91-2.1 7.61-2.72 1.34-4.52 2.69-9.1 4.22-14.24-6.14 3.49-7.39 10.23-12.2 14.36Zm-1.57 1.29c-5.94 4.23-8.77 12.75-5.64 16.55 3.78-2.12 7.02-11.38 5.64-16.55Zm48.34-25.06 9.1-4.19c-4.03-1.28-7.18.19-9.1 4.19Zm59.74 28-.44.78 3.82 2.28.51-.9Z"
                        className="cls-6"
                    />
                    <path
                        d="m356.42 254.75 4.29 1.15a16.35 16.35 0 0 1-8.93 9.31c-4.21 1.8-8.4.06-12.59-.69l-.16 1a17.36 17.36 0 0 0 2.46.83c6 1.12 11.94 2.43 18 3.16a17.09 17.09 0 0 0 7.76-1.11c8-3 10.33-2 12.49 6.25.38 1.45 1 2.84 1.45 4.25q-.82 6.62-1.66 13.22l-3 6.85c-1.82 0-2.31 1.45-2.76 2.77-3.56 10.48-9 20-14.52 29.52-5.84 10.08-12.32 19.79-18.74 29.52a10.58 10.58 0 0 1-4.85 3.58c-2.5 1-5.26 1.31-8.19 2-.61.43-1.46 1-2.3 1.64s-1.68 1.27-2.22 1.68c1 5.36-1.35 12.25-4.67 14.18a25.75 25.75 0 0 0-2-1.77c-1.5-1.09-3.08-1.94-4.88-.54-3.66-1.76-7.13-4.17-11.52-3.65a70.59 70.59 0 0 0 .62-7.66c-.1-4.11-2.4-7.19-5.24-10.17a7.07 7.07 0 0 0-.86 1.14c-.94 2.24-1.85 4.49-2.76 6.74-1.19 2.94-2.44 5.89.08 8.81 0 0-.14.3-.46 1a27.3 27.3 0 0 1-3.74-2.82 9.06 9.06 0 0 1-2.53-6.73c.06-3 .81-6.06-.93-8.95a17.52 17.52 0 0 0-7.06-6.86q-6.72-3.45-13.27-7.23a11.22 11.22 0 0 1-3.12-2.91c-2.58-3.35-2.06-9.27.94-11.4a12.85 12.85 0 0 1 9.46-2.44 131.56 131.56 0 0 1 16.56 4.06c2.5.76 4.69 2.52 7.1 3.64 6.93 3.23 14.54 0 17.39-7.1 2-4.88.74-9.55-.24-14.29-1-5.11-2.42-10.17-3.15-15.33-1.22-8.56-1.9-17.19-3.07-25.76a197.65 197.65 0 0 1-1.46-35.06c.2-4.79.25-9.74 2.51-14.23 3.48-6.94 9.5-11 16.23-14.21 7.37-3.52 15.22-5.35 23.2-6.78s13.3-6.06 14.36-13.08a37.7 37.7 0 0 0-.14-9.95c-.87-7.26-1.95-14.49-3.11-21.7-1.06-6.56-2.19-13.11-3.56-19.61-1-4.92-2.82-9.7-3.72-14.64-.95-5.22-3.59-9-7.63-12.26-6.27-5.05-13.81-6.67-21.32-7.09-9.95-.55-20 .22-30 .43a11.38 11.38 0 0 0-1.4.24l-17.19 2.53c-8.35 1.23-16.82 2-25 3.84a295.15 295.15 0 0 0-29.37 8.41c-10.26 3.5-19.66 8.71-26.86 17.18-4.24 5-7.88 10.25-8.77 17-.53 4-1.45 8-2.13 12.07-1 6.06-3.61 11.19-8.56 15-6.69 5.13-12.64 10.88-16.81 18.4a82.14 82.14 0 0 0-7.82 18c-3.78 13.74-2.27 27.57-.81 41.41.56 5.39 1.21 10.78 1.42 16.19.36 9.33 0 18.7.7 28a136.52 136.52 0 0 0 3.52 22.27c2.85 11.63 6.52 23.06 9.69 34.62 3.11 11.35 7.69 21.87 16.33 30.17 6.45 6.19 12.92 12.35 19.58 18.32 11.42 10.23 23.18 20.09 33.9 31.09a64.19 64.19 0 0 0 7.36 6.3c3.9 2.94 8.62 3.79 13.24 5 7.72 2 15.56 2.2 23.41 2 4.41-.11 8.92-.29 13.13-2-.11.26-.16.65-.35.74-3.17 1.58-6.36 3.11-9.7 4.73l-.87 2.76 7.14-.41c-.42.76-.64 1.16-.85 1.56l-2.83.25a17.68 17.68 0 0 1-2.33.2c-5.88-.25-11.79-.18-17.63-.81a67 67 0 0 1-29.21-10c-8.65-5.55-16.91-11.7-25.28-17.68-7.37-5.25-14.73-10.51-21.91-16-3.62-2.77-6.69-6.24-10.26-9.07-10.59-8.4-18.82-18.5-23.42-31.35a9 9 0 0 0-1.2-1.79c-1.92-5.82-4.23-11.55-5.66-17.49-1.54-6.39-2.38-13-3.31-19.48-.61-4.29-.83-8.64-1.24-13-.39-4.11-2.89-6.45-7.31-6.16-7 .47-11.52-2.83-14.4-8.9-1-2.05-2-4.09-3-6.14 1.73 1.54 3.49 3.05 5.18 4.63 2.36 2.2 4.42 4.8 7.05 6.59 3.32 2.27 8.19.53 8.81-3 .47-2.72.09-5.59.09-8.72-3.84 1.92-7 5-11.8 4.34l-4.9-8.93c8.83 4.62 14.82 3.21 16-3.26-5-3.39-5-3.39-4.55-6.2 5.06-.91 5.57-1.55 5.51-6.72v-5.49l1.61-2.28 3.31 3.06c2.83-3.18 2.21-6.62 1.74-9.94-.85-6-1.83-12-2.83-18a22.44 22.44 0 0 0-.92-3.07c.18-2.09.46-3.77.44-5.45-.14-9.81 1.84-19.2 4.42-28.65 2-7.38 6.3-13.31 10.18-19.46 2.38-3.8 6.67-6.35 9.78-9.76a14.38 14.38 0 0 0 3.53-12.15c-.66-5-1.12-10.09 1.49-14.89a65.89 65.89 0 0 1 14.22-18.15c4.69-4.15 10-7.6 14.85-11.52 6.17-5 13.32-8.27 20.53-10.92 10.07-3.7 20.59-6.21 31-8.83 5-1.26 10.26-1.54 15.38-2.37 3.78-.61 7.53-1.46 11.32-2 1.67-.25 3.41-.05 5.16-.22l6.89-.45v-.12l6.87-.43v-.16l16.14-1.65c1.75-.19 3.49-.42 5.24-.54a50.7 50.7 0 0 1 5.08-.15c4.41.14 8.83.28 13.23.58a35.18 35.18 0 0 1 15.47 4.8c2.18 1.25 5 1.47 7.49 2.12 6.55 1.69 11.2 5.49 12.69 12.25.72 3.28.41 6.78 1 10.11s1.68 6.56 2.48 9.86c1.27 5.21 2.82 10.39 3.62 15.68a114 114 0 0 1 1 15.57 100 100 0 0 1-.79 11.19c-.78 7.93-2.18 15.86-.12 23.79.5 1.9 1.36 3.71 2.24 6-1 .49-2.19 1.19-3.46 1.67-5.68 2.12-11.43 1.25-17.16.17-15.33-2.91-29.08.58-40.57 11.08-9.05 8.27-13.32 18.71-10.79 31.17.47 2.32 1.75 4.47 2.74 6.89l2.86-1.77a3.16 3.16 0 0 0 .35-.59c1.59-6.06 2.12-6.38 8.29-5.38 1.58.26 3.19.39 4.78.58 2.64.09 5.27.26 7.91.23a8.34 8.34 0 0 0 2.47-.85 40.45 40.45 0 0 1 4.67 1.2c3.2 1.23 6.25 1.28 9.19-.67.32 1.38 1.3 1.37 2.39 1.13Zm-28.28 84.31c1.43 1 2.93 2 4.29 3.1 2.59 2.14 5.27 2.24 7.68-.09a27 27 0 0 0 3.81-4.59c2.13-3.25 3.86-6.77 6.1-9.92 4.69-6.59 9.62-13 14.42-19.52s8.27-13.46 7.71-21.86c-.26-3.93-2-5.59-5.67-4.83a21.9 21.9 0 0 1-12.35-.87c-6.24-2.33-12.74-3-19.31-3.18-4.5-.11-6 1.45-6.19 5.9-.08 2-.05 4-.22 6-.89 10.23-2.13 20.43-2.57 30.68-.14 3.3 1.94 6.66 2.65 10.07.38 1.81 0 3.78-.05 5.67-3.49-3.62-8.39-4-13.27-1-3.32 2.07-6.61 4.17-9.81 6.4-5.06 3.53-10 3.46-15.18.16-4.08-2.6-8.38-4.87-12.6-7.25-3.25-1.83-6.53-1-9.57.4-.9.42-1.66 2.17-1.65 3.31 0 2.78 4.4 6.62 7.12 6.42 2.37-.17 4.72-.57 7.06-.94a8.69 8.69 0 0 1 6.83 1.29c1.92 1.41 4.05 2.68 5.53 4.47 3 3.65 5.68 7.62 8.53 11.43 2 2.63 3.24 6.18 6.7 7.13 4.5 1.24 12.42-.13 14-6.94 1.47-6.3 3.07-12.57 4.68-18.84a13.49 13.49 0 0 1 1.33-2.6Z"
                        className="cls-2"
                    />
                    <path
                        d="M304.09 533.72c2 3.88 1.17 7.94 1.15 12a63.67 63.67 0 0 1-2.71 17.34c-2.14 7.4-4.44 14.77-6.67 22.15-.77-4.36-1.45-8.74-2.36-13.07a12.87 12.87 0 0 1 1.3-8.54c.49-1 1.16-2 1.7-3 2.53-4.8 1.19-7.34-4.21-8-1.79-.22-3.59-.37-5.38-.58-3.4-.4-6.13-1.51-7.42-5.19a6.67 6.67 0 0 0-6.35-4.53c-1.67-.07-3.61-.12-5 .62-6.21 3.3-12.63 6.5-17.11 12.12-2.38 3-4.87 6.44-5.69 10-2.33 10.23-8.26 18.47-13.53 27.12l-7-8.63c2.52-3.43 4.92-6.95 7.6-10.25 3.88-4.77 4.93-9.83 2.72-15.67-3-7.89-8-14.94-18.68-13.59a26.46 26.46 0 0 0-6.62 1.53c-5 2.06-9.85 4.43-14.76 6.67-7.46-10.09-15.11-20-21.41-31-1.88-3.26-4.66-6-6.52-9.28a74.74 74.74 0 0 1-6.06-12.83c-2-5.93-3.3-12.09-4.81-18.18-1.74-7-3.65-14-5-21.08a142.55 142.55 0 0 1-1.92-17c-.43-6.73-.45-13.49-.65-20.23.4-5.83.87-11.65 1.14-17.49.1-2.05-.51-4.14-.41-6.2.3-5.93.79-11.85 1.2-17.78 4.07 7.74 8 15.58 12.26 23.18a111 111 0 0 0 20.72 25.76c12.82 12.11 26.83 22.81 40.71 33.68 7.26 5.68 14.68 11.24 20.53 18.49 4.55 5.65 7.16 11.92 5.25 19.35-1.13 4.37-3.91 7.76-6.48 11.34a22.26 22.26 0 0 0-3.49 7.36c-1.22 4.93 3 10.4 8.07 10.95 6.74.74 13.07-.27 18.79-4.25a24.41 24.41 0 0 1 5.79-3c4-1.41 6.36-.15 7.73 3.85.68 2 1.13 4 1.71 6 .7 2.43 1.44 4.86 2.38 8a56.68 56.68 0 0 0 5.17-4.31 10.32 10.32 0 0 1 8.13-3.47c1.52 0 3 .35 4.54.34.56.21 1.11-.42 1.65-.7Z"
                        className="cls-2"
                    />
                    <path
                        d="M304.09 533.72c-.54.32-1.07.91-1.61.92-1.51 0-3-.3-4.54-.34a10.32 10.32 0 0 0-8.13 3.47 56.68 56.68 0 0 1-5.17 4.31c-.94-3.18-1.68-5.61-2.38-8-.58-2-1-4.07-1.71-6-1.37-4-3.75-5.26-7.73-3.85a24.41 24.41 0 0 0-5.79 3c-5.72 4-12 5-18.79 4.25-5.08-.55-9.29-6-8.07-10.95a22.26 22.26 0 0 1 3.49-7.36c2.57-3.58 5.35-7 6.48-11.34 1.91-7.43-.7-13.7-5.25-19.35-5.85-7.25-13.27-12.81-20.53-18.49-13.88-10.87-27.89-21.57-40.71-33.68a111 111 0 0 1-20.72-25.76c-4.3-7.6-8.19-15.44-12.26-23.18l-.54-3.32-.31-3.4a9 9 0 0 1 1.2 1.79c4.6 12.85 12.83 22.95 23.42 31.35 3.57 2.83 6.64 6.3 10.26 9.07 7.18 5.5 14.54 10.76 21.91 16 8.37 6 16.63 12.13 25.28 17.68a67 67 0 0 0 29.21 10c5.84.63 11.75.56 17.63.81l2.33-.2 2.83-.25c5.62-.48 11.23-1 16.32-3.78a11.23 11.23 0 0 1 3-.71c2.51.43 4.37-.83 5.92-2.52 2.41-2.62 5.59-3.88 8.69-5.32-1.1 1.52-2 3.3-3.34 4.5-4.91 4.28-7.78 9.85-9.9 15.76-3.07 8.57-3.94 17.56-4.81 26.61-.68 7.18 1.67 13.95 1.48 21-.15 5.88 1.83 11.5 2.84 17.28Z"
                        className="cls-9"
                    />
                    <path
                        d="M231.81 592.28c5.27-8.65 11.2-16.89 13.53-27.12.82-3.61 3.31-7.06 5.69-10 4.48-5.62 10.9-8.82 17.11-12.12 1.39-.74 3.33-.69 5-.62a6.67 6.67 0 0 1 6.35 4.53c1.29 3.68 4 4.79 7.42 5.19 1.79.21 3.59.36 5.38.58 5.4.66 6.74 3.2 4.21 8-.54 1-1.21 2-1.7 3a12.87 12.87 0 0 0-1.3 8.54c.91 4.33 1.59 8.71 2.36 13.07 1.08 6-.77 11.34-3.9 16.13-1.46 2.24-4.23 3.74-6.62 5.24-5.61 3.52-12.08 4.82-18.45 4.87-7.81.06-15.77-.59-22.72-5a8 8 0 0 1-1.9-1.24c-3.52-4.41-6.98-8.74-10.46-13.05Z"
                        className="cls-8"
                    />
                    <path
                        d="M317.83 448.51c-3.1 1.44-6.28 2.7-8.69 5.32-1.55 1.69-3.41 2.95-5.92 2.52a24.07 24.07 0 0 0 10.58-12.3c1.5-4 2.6-8.12 3.88-12.2l1.89-.15c2.61-7 .34-12-4.33-16.8-.87-.88-1.62-1.88-2.82-3.29l6.21-2.72c3.79-1.65 7.59-3.26 11.37-4.94a51.28 51.28 0 0 0 7.11-3.45c1.55-1 3.25-2.48 3.81-4.12 1.06-3.08 1.34-6.43 1.95-9.67.88-4.64 1.45-9.36 2.72-13.89a129.79 129.79 0 0 1 5.33-15c2.74-6.53 5.9-12.89 8.79-19.36 1-2.23 1.73-4.57 2.59-6.86 1.6-3.34 3.33-6.63 4.8-10 3.21-7.49 6.29-15 9.43-22.57l3-6.85c.51 6.74-1.64 13.07-3 19.51-1.34 6.12-2.83 12.21-4.34 18.29-.87 3.52-2 7-2.84 10.49-1.4 5.69-2.32 11.52-4.07 17.09-2.67 8.48-6.24 16.7-8.76 25.22-2.67 9.06-7.63 17-11.45 25.49-1.77 3.93-5.15 7.11-7.66 10.73s-4.72 7.12-7 10.74a30.87 30.87 0 0 0-1.73 3.89l-4.76 7.82c-1 1.38-2 2.81-3.14 4.14-.92.98-1.97 1.92-2.95 2.92Z"
                        className="cls-5"
                    />
                    <path
                        d="m137.9 274.42-1.61 2.28v5.49c.06 5.17-.45 5.81-5.51 6.72-.4 2.81-.4 2.81 4.55 6.2-1.13 6.47-7.12 7.88-16 3.26l4.9 8.93c4.84.61 8-2.42 11.8-4.34 0 3.13.38 6-.09 8.72-.62 3.53-5.49 5.27-8.81 3-2.63-1.79-4.69-4.39-7.05-6.59-1.69-1.58-3.45-3.09-5.18-4.63-2.58-4.14-1.94-9.07-3.33-13.5s-1.56-8.86-2.5-13.19c-1.37-6.28-1.74-12.64-2.78-18.93a99.54 99.54 0 0 1-.69-11.22c0-.1.27-.22.42-.33l5.48 3.71 5-3.38c2.87 2.23 5.68 4.41 8.82 6.83a45.9 45.9 0 0 1-3.64 4 6.45 6.45 0 0 0-1.41 7.94c1.29 2.76 3.43 3.73 6.61 2.87 1.63-.45 3.23-1.05 4.92-1.61l4.84 4.3Z"
                        className="cls-8"
                    />
                    <path
                        d="m150.13 378 .54 3.32c-.41 5.93-.9 11.85-1.2 17.78-.1 2.06.51 4.15.41 6.2-.27 5.84-.74 11.66-1.14 17.49l-3.59-3c-9.7 1.84-19.05 3.43-28.32 5.41-7 1.52-14 3.78-21 5.28A388.38 388.38 0 0 1 53 437.11c-11.94 1.18-23.72.24-35.55-.71a8.08 8.08 0 0 1-1.41-.41c.54-1.76 1.78-1.71 3-1.59 11.18 1.16 22.22 0 33.27-1.66a295 295 0 0 0 41.9-9.74c9.73-3 19.61-5.45 29.51-7.8 11.39-2.72 19-9.31 23.35-20.26 2.23-5.55 2.58-11.2 3.06-16.94Z"
                        className="cls-7"
                    />
                    <path
                        d="M195.1 552.34c4.91-2.24 9.77-4.61 14.76-6.67a26.46 26.46 0 0 1 6.62-1.53c10.64-1.35 15.7 5.7 18.68 13.59 2.21 5.84 1.16 10.9-2.72 15.67-2.68 3.3-5.08 6.82-7.6 10.25a12.73 12.73 0 0 1-2.38-1.4c-3.33-3.09-7-6-9.79-9.44-4.85-6-11.18-10.64-15.11-17.4a27.56 27.56 0 0 0-2.46-3.07Z"
                        className="cls-8"
                    />
                    <path
                        d="m323.89 441.37 4.76-7.82c7.62 1.94 15.19 4.11 22.87 5.78 16 3.47 31.15 9.71 46.67 14.73 4.42 1.44 9 2.38 13.5 3.6 1.34.36 2.63.89 3.94 1.35l-.13.81a23.68 23.68 0 0 1-2.41-.27c-10-2.19-20.06-4.38-30.07-6.64-4-.9-7.88-2.13-11.88-2.92-6.14-1.22-12.42-1.86-18.49-3.36-6.79-1.67-13.69-2.09-20.57-2.9-2.78-.33-5.46-1.55-8.19-2.36Z"
                        className="cls-7"
                    />
                    <path
                        d="m136.69 271-4.84-4.3c-1.69.56-3.29 1.16-4.92 1.61-3.18.86-5.32-.11-6.61-2.87a6.45 6.45 0 0 1 1.41-7.94 45.9 45.9 0 0 0 3.64-4c-3.14-2.42-6-4.6-8.82-6.83l-5 3.38-5.43-3.74a32.82 32.82 0 0 1 1.53-14.91c4.4 2.93 8.72 5.93 11.06 11a4.08 4.08 0 0 0 1.27 1.5c2.34 1.7 4.71 3.34 7.11 5 .19.12.65-.18 1-.28l3.51 6.89-4 4.72c1.25 4.64 4.25 6.29 9.17 5.57Z"
                        className="cls-2"
                    />
                    <path
                        d="m318.85 14.27 7.15 7.92c.77.87 1.51 1.76 2.36 2.76l-3.69 3.28v2.83c1.58 2.53 4.59 3.88 5.42 6.93-3.4-1.33-5.39-4.22-7.61-6.77-3.35-3.84-6.56-7.8-9.67-11.83-1.78-2.3-3.25-4.83-4.86-7.26Z"
                        className="cls-5"
                    />
                    <path
                        d="M128 248.51c-.33.1-.79.4-1 .28-2.4-1.62-4.77-3.26-7.11-5a4.08 4.08 0 0 1-1.27-1.5c-2.34-5-6.66-8-11.06-11l.54-3.22c.72-.54 1.45-1.07 2.65-1.95a11.6 11.6 0 0 1 3.44 1.28 34.7 34.7 0 0 1 11.92 15.88c.65 1.81 1.29 3.52 1.89 5.23Z"
                        className="cls-1"
                    />
                    <path
                        d="m115.61 77.88-.23.35-.11-.34.39.06Z"
                        className="cls-6"
                    />
                    <path
                        d="m226.79 73.79-5.53-4.35c-.73-3-1.09-5.56 1.77-7.91 6.21 6.23 10.07 14.22 16.44 20.16l-.57.64-6.43-4.39-13.93 6c-1.68 4.17 2.85 5.83 2.41 9.57L233 91.6v.33l-20 7.72 2-4.4-6.88-.54a20.84 20.84 0 0 0 1.74-2.15 4.77 4.77 0 0 0 .59-2.46c-5.45 1.9-11.12 2.81-15.79 7.3l-11.76.75c-.38-1.64-.71-3-1-4.36 3-2.43 6.14-2.78 9.29-2.77 4.74-3.48 4.13-2.72 3.68-5.72l-5.42 1.7-1.82-2.4c3.71-3.16 6.58-7.37 11.47-8.54 2.34-.56 5 0 7.5.4 3.91.66 7.75 1.73 11.65 2.45 3.21.62 6.75-.43 8.54-5.12ZM299.15 55.05c.49 3.79 1 7.66 1.48 11.54l-.78.21-3.76-8.8c-.13 1.69-.22 2.93-.31 4.16l-.71.14c-.47-1.63-1-3.25-1.38-4.9a30.33 30.33 0 0 0-3-8.14c-2.55-4.75-4.5-9.81-6.6-14.79a7.26 7.26 0 0 1 0-2.64l.73-.29 5.94 7.85.66-.22c-.58-2-1.16-4-1.85-6.33 5.05 1.31 10.65 1.33 12 7.29s2.66 10.26-2.42 14.92ZM237.76 39.21l3.72-.5c-.08-1-.14-1.93-.25-3.46l13.6 7.35c-1.82 1-1.82 1-6.87-1.34-1.54.77-1.66 1.9-.6 3.15s2.19 2.32 3.31 3.46c2.13 2.16 4.35 4.28 3.53 8.27-2.22 4.27 0 8.44 2.35 12.77-2.37.63-3.48-1.19-4.58-2.21a30.09 30.09 0 0 1-7.7-10.62c-.66-1.62-2.19-2.88-2.9-4.49-1.4-3.18-2.55-6.47-3.68-9.76a8.11 8.11 0 0 1 .07-2.62ZM259.27 29.07c1.46.59 2.94 1.11 4.36 1.76 3.41 1.58 6.92 3 10.14 4.89 3.75 2.22 7 5.1 8.51 9.48-2.48 1.7-3.95-.91-6.39-1.06a20.11 20.11 0 0 0 .57 3.3c1.26 3.53 2.73 7 3.91 10.55a15.83 15.83 0 0 1 .31 4l-.84.27c-.35-.54-1-1.06-1-1.62-.25-2.68-1.73-4.6-3.29-6.69-3.83-5.11-7.27-10.51-10.94-15.74-1.51-2.17-3.22-4.2-4.8-6.32a18.19 18.19 0 0 1-1.18-2.07ZM317.32 66.81l-14.53-47.4.71-.57c1.32 1.41 3.16 2.61 3.88 4.28 3.13 7.29 6.6 14.55 8.66 22.16 1.69 6.21 1.56 12.9 2.2 19.38a9.91 9.91 0 0 1-.24 2.08ZM179.8 56.17C169.61 67.08 160.32 78.64 153.34 92c-.87-4.17.54-7.74 1.73-11.39 1.66-5 4.8-8.89 8.73-12.34 2.63-2.31 4.61-5.36 7.29-7.59 2.44-2 5.43-3.39 8.17-5ZM351.33 254.21c-2.94 2-6 1.9-9.19.67a40.45 40.45 0 0 0-4.67-1.2c-.57-2.21-1.13-4.41-1.7-6.61l8.51 7.1c4.64.47 5.62-.11 5-3.49a24 24 0 0 0-3.62-1.21 8.74 8.74 0 0 1-7.33-6l2.1-2.92c.25.38.51.75.77 1.13v3l2 2.22c4.14-.2 8.49-2.61 12.67.12-.02 3.35-2.48 5.15-4.54 7.19Z"
                        className="cls-5"
                    />
                    <path
                        d="M335.77 247.07c.57 2.2 1.13 4.4 1.7 6.61a8.34 8.34 0 0 1-2.47.85c-2.64 0-5.27-.14-7.91-.23.27-.26.53-.52 1-1l-2.58-1.75c.61-4.3 5.09-7.4 8.82-6.79l1.49 2.32Z"
                        className="cls-1"
                    />
                    <path
                        d="m170.11 77.29 2.32 2.18c-.52 5.48-4.86 8.6-7.53 12.64h-3.21c-.17-.86-.76-2-.47-2.72a21.91 21.91 0 0 1 2.91-5.7 82.27 82.27 0 0 1 5.98-6.4ZM133.86 78.87c4.81-4.13 6.06-10.84 12.2-14.36-1.53 5.14-2.88 9.72-4.22 14.24-2.7.62-4.09 4.21-7.61 2.72ZM132.29 80.16c1.38 5.17-1.86 14.43-5.64 16.55-3.13-3.8-.3-12.32 5.64-16.55Z"
                        className="cls-5"
                    />
                    <path
                        d="M335.77 247.07h.07c.75-1.25.29-3.33 2.45-3.63a8.74 8.74 0 0 0 7.33 6 24 24 0 0 1 3.62 1.21c.66 3.38-.32 4-5 3.49Z"
                        className="cls-3"
                    />
                    <path
                        d="M351.33 254.21c2.06-2 4.52-3.84 4.51-7.19a9.93 9.93 0 0 1 .61-.93c.11-.13.33-.16.93-.41 1.19 1.11 2.52 2.35 3.81 3.57-.48 3-3.15 3.81-4.77 5.5l-2.7.59c-1.09.24-2.07.25-2.39-1.13ZM341.16 241.68c-.26-.38-.52-.75-.77-1.13l.68-2.1 4.29-.6c.26.81.5 1.53.84 2.59Z"
                        className="cls-1"
                    />
                    <path
                        d="M180.63 55.1c1.92-4 5.07-5.47 9.1-4.19ZM240.37 83.06l3.89 2.16-.51.9-3.82-2.28Z"
                        className="cls-5"
                    />
                    <path
                        d="M288.52 451.46c-4.21 1.73-8.72 1.91-13.13 2-7.85.2-15.69 0-23.41-2-4.62-1.22-9.34-2.07-13.24-5a64.19 64.19 0 0 1-7.36-6.3c-10.72-11-22.48-20.86-33.9-31.09-6.66-6-13.13-12.13-19.58-18.32-8.64-8.3-13.22-18.82-16.33-30.17-3.17-11.56-6.84-23-9.69-34.62a136.52 136.52 0 0 1-3.49-22.21c-.69-9.29-.34-18.66-.7-28-.21-5.41-.86-10.8-1.42-16.19-1.46-13.84-3-27.67.81-41.41a82.14 82.14 0 0 1 7.82-18c4.17-7.52 10.12-13.27 16.81-18.4 4.95-3.81 7.55-8.94 8.56-15 .68-4 1.6-8 2.13-12.07.89-6.76 4.53-12 8.77-17 7.2-8.47 16.6-13.68 26.86-17.18a295.15 295.15 0 0 1 29.31-8.41c8.21-1.88 16.68-2.61 25-3.84l17.19-2.53a11.38 11.38 0 0 1 1.4-.24c10-.21 20-1 30-.43 7.51.42 15.05 2 21.32 7.09 4 3.26 6.68 7 7.63 12.26.9 4.94 2.68 9.72 3.72 14.64 1.37 6.5 2.5 13 3.56 19.61 1.16 7.21 2.24 14.44 3.11 21.7a37.7 37.7 0 0 1 .14 9.95c-1.06 7-6.38 11.66-14.36 13.08s-15.83 3.26-23.2 6.78c-6.73 3.22-12.75 7.27-16.23 14.21-2.26 4.49-2.31 9.44-2.51 14.23a197.65 197.65 0 0 0 1.46 35.06c1.17 8.57 1.85 17.2 3.07 25.76.73 5.16 2.1 10.22 3.15 15.33 1 4.74 2.22 9.41.24 14.29-2.85 7.06-10.46 10.33-17.39 7.1-2.41-1.12-4.6-2.88-7.1-3.64a131.56 131.56 0 0 0-16.54-4.08 12.85 12.85 0 0 0-9.46 2.44c-3 2.13-3.52 8.05-.94 11.4a11.22 11.22 0 0 0 3.12 2.91q6.54 3.76 13.27 7.23a17.52 17.52 0 0 1 7.07 6.82c1.74 2.89 1 6 .93 8.95a9.06 9.06 0 0 0 2.53 6.73 27.3 27.3 0 0 0 3.74 2.82c.32-.69.5-.94.46-1-2.52-2.92-1.27-5.87-.08-8.81.91-2.25 1.82-4.5 2.76-6.74a7.07 7.07 0 0 1 .86-1.14c2.84 3 5.14 6.06 5.24 10.17a70.59 70.59 0 0 1-.62 7.66l-8.94 3.64a19.76 19.76 0 0 1-2.45-1.18c-5.88-4-12.11-3.14-18.35-1.25-7.57 2.3-15.23 4.05-23.19 4.21-2.51 0-5 .38-7.61.59l.48 1.08a9.94 9.94 0 0 0 2.08 1.58 58.85 58.85 0 0 1 17.63 10.69c2.69 2.35 5.79 3.95 9.56 3.73 1.87-.11 2.86-1 2.74-2.86s-.5-3.55-.61-5.34a34.3 34.3 0 0 1 .19-3.78l5 .21c1.59 2.37 5.21 2.85 5.9 5.91l-4.38 5.45c3.86 5.32 9.64 3.24 14.22 5.06a46.45 46.45 0 0 1-8.52 1.52c-6.64.36-13.3.49-19.95.65a7.74 7.74 0 0 0-6.52 3.41 6.66 6.66 0 0 0 2.09 6.48c5.86 5.73 12.66 8.8 21 8.66a43.61 43.61 0 0 1 11.27 1.27c8 2 10.53 10.57 5.24 16.85-1.77 2.09-3.91 3.87-5.88 5.79l-1.37 1Zm-25.59-205.31c3.67-1 7.08-1.71 10.37-2.78 7.43-2.41 12.79-10.13 13-17.78.17-5.79-5.95-15.05-13.14-18.11-5.6-2.39-11.54-3.06-17.51-3.57-6.16-.52-12.33-1.11-18.51-1.2-10.27-.15-20.57-.32-30.81.28-8.77.51-17 3.89-25.2 6.88C178 211 175 212.4 172 213.82c-3.5 1.66-5.12 5.52-3.62 8.47A71.49 71.49 0 0 0 190 247.75c9.73 7.17 20.66 11.78 32.19 15 12.74 3.56 24.4.92 34.94-7a13.91 13.91 0 0 0 5.8-9.6Z"
                        className="cls-1"
                    />
                    <path
                        d="M328.44 335.62c.05-1.89.43-3.86.05-5.67-.71-3.41-2.79-6.77-2.65-10.07.44-10.25 1.68-20.45 2.57-30.68.17-2 .14-4 .22-6 .18-4.45 1.69-6 6.19-5.9 6.57.15 13.07.85 19.31 3.18a21.9 21.9 0 0 0 12.35.87c3.65-.76 5.41.9 5.67 4.83.56 8.4-2.92 15.37-7.71 21.86S354.71 321 350 327.56c-2.24 3.15-4 6.67-6.1 9.92a27 27 0 0 1-3.81 4.59c-2.41 2.33-5.09 2.23-7.68.09-1.36-1.13-2.86-2.07-4.29-3.1Z"
                        className="cls-1"
                    />
                    <path
                        d="m294.19 390.92 1.95.22c5.33.58 8.34 3.42 9.11 8.6-.11 4.61-1.66 8.51-6.25 10.17a87.86 87.86 0 0 1-10.12 2.47c-.75.18-1.53.26-2.3.39v.67c5.86.6 11.72 1.35 17.6 1.76s10.47 2.93 13.46 8.12v8.53c-1.28 4.08-2.38 8.21-3.88 12.2a24.07 24.07 0 0 1-10.58 12.3 26.29 26.29 0 0 1-3.07 1.37c-6.88 2.85-10.64 2.64-16.26 3.12.21-.4.43-.8.85-1.56l-7.14.41.87-2.76c3.34-1.62 6.53-3.15 9.7-4.73.19-.09.24-.48.35-.74l.91-.25 1.37-1c2-1.92 4.11-3.7 5.88-5.79 5.29-6.28 2.72-14.81-5.24-16.85a43.61 43.61 0 0 0-11.27-1.27c-8.33.14-15.13-2.93-21-8.66a6.66 6.66 0 0 1-2.09-6.48 7.74 7.74 0 0 1 6.52-3.41c6.65-.16 13.31-.29 19.95-.65a46.45 46.45 0 0 0 8.52-1.52c-4.58-1.82-10.36.26-14.22-5.06l4.38-5.45c-.69-3.06-4.31-3.54-5.9-5.91 2.45.14 4.4-.61 7.35.42"
                        className="cls-3"
                    />
                    <path
                        d="m328.44 335.62-.3 3.44a13.49 13.49 0 0 0-1.32 2.63c-1.61 6.27-3.21 12.54-4.68 18.84-1.59 6.81-9.51 8.18-14 6.94-3.46-1-4.73-4.5-6.7-7.13-2.85-3.81-5.49-7.78-8.53-11.43-1.48-1.79-3.61-3.06-5.53-4.47a8.69 8.69 0 0 0-6.83-1.29c-2.34.37-4.69.77-7.06.94-2.72.2-7.11-3.64-7.12-6.42 0-1.14.75-2.89 1.65-3.31 3-1.42 6.32-2.23 9.57-.4 4.22 2.38 8.52 4.65 12.6 7.25 5.18 3.3 10.12 3.37 15.18-.16 3.2-2.23 6.49-4.33 9.81-6.4 4.87-3.05 9.82-2.65 13.26.97Z"
                        className="cls-6"
                    />
                    <path
                        d="m239.79 385-.48-1.08c2.6-.21 5.1-.54 7.61-.59 8-.16 15.62-1.91 23.19-4.21 6.24-1.89 12.47-2.73 18.35 1.25a19.76 19.76 0 0 0 2.45 1.18l8.94-3.64c4.39-.52 7.86 1.89 11.52 3.65l5.16 3.41c.36.37.68 1 1.08 1.05 3.91.65 7.83 1.18 11.73 1.8a16.42 16.42 0 0 1 2.56 1c-1.24 1.09-2 1.76-2.78 2.42-.33-1.72-1.43-.93-2.42-.8-6 .74-11.67.13-17-3.12-4.9-3-10.1-3.5-15.39-.72a23.66 23.66 0 0 1-3.18 1.22c-3.12-1.22-5.92-2.41-8.79-3.4-4.76-1.65-9.36.11-14 .88-6.37 1-12.71 2.1-19.2.89-1-.18-2.6-.85-3 1.1Z"
                        className="cls-5"
                    />
                    <path
                        d="m316.53 384.93-5.16-3.41c1.8-1.4 2.63-2.17 4.14-1.08a2.31 2.31 0 0 0 3.07 0c.93-1 3.74-9.84 4.37-10.79 3.35-5.91 10.21-4.32 12.71-5.31a10.58 10.58 0 0 0 4.85-3.58c6.42-9.73 12.9-19.44 18.74-29.52 5.5-9.48 11-19 14.52-29.52.45-1.32.94-2.74 2.76-2.77-3.14 7.52-6.22 15.08-9.43 22.57-1.47 3.41-3.2 6.7-4.8 10-.47.42-1.13.74-1.38 1.26a148 148 0 0 1-13.48 21.76c-3.6 5-6.75 10.43-10.92 14.91-5.2 5.6-11.23 10.43-16.74 15.44Z"
                        className="cls-3"
                    />
                    <path
                        d="M316.53 384.93a10.3 10.3 0 0 0 3.25-.47c1.28-.39 11.54-9.37 16.74-15 4.17-4.48 7.32-9.9 10.92-14.91a148 148 0 0 0 13.48-21.76c.25-.52.91-.84 1.38-1.26-.86 2.29-1.59 4.63-2.59 6.86-2.89 6.47-6 12.83-8.79 19.36a129.79 129.79 0 0 0-5.33 15c-1.27 4.53-1.84 9.25-2.72 13.89-.61 3.24-.89 6.59-1.95 9.67-.56 1.64-2.26 3.12-3.81 4.12A51.28 51.28 0 0 1 330 404c-3.78 1.68-7.58 3.29-11.37 4.94l-6.21 2.72c1.2 1.41 1.95 2.41 2.82 3.29 4.67 4.76 6.94 9.78 4.33 16.8l-1.89.15v-8.53c-3-5.19-7.5-7.7-13.46-8.12s-11.74-1.16-17.6-1.76v-.67c.77-.13 1.55-.21 2.3-.39a87.86 87.86 0 0 0 10.08-2.52c4.59-1.66 6.14-5.56 6.25-10.17.68-.25 1.66-.29 2-.78 1.3-1.94 2.4-4 3.58-6 6.14-.21 12.39.87 18.3-1.74.77-.66 1.54-1.33 2.78-2.42a16.42 16.42 0 0 0-2.56-1c-3.9-.62-7.82-1.15-11.73-1.8-.41-.09-.73-.7-1.09-1.07Z"
                        className="cls-4"
                    />
                    <path
                        d="M262.93 246.15a13.91 13.91 0 0 1-5.8 9.61c-10.54 7.91-22.2 10.55-34.94 7-11.53-3.22-22.46-7.83-32.19-15a71.49 71.49 0 0 1-21.64-25.46c-1.5-2.95.12-6.81 3.62-8.47 3-1.42 6-2.81 9.17-3.95 8.21-3 16.43-6.37 25.2-6.88 10.24-.6 20.54-.43 30.81-.28 6.18.09 12.35.68 18.51 1.2 6 .51 11.91 1.18 17.51 3.57 7.19 3.06 13.31 12.32 13.14 18.11-.23 7.65-5.59 15.37-13 17.78-3.32 1.06-6.72 1.8-10.39 2.77Zm-27-.88-4.52 4.78c7.58-1.22 15.19-.8 20.08-7.8l10.68 4-1.33-3.33c2-1 3.71-1.73 5.36-2.65 8.23-4.6 12.91-11.34 12.58-21.08a8.24 8.24 0 0 0-3.56-6.84 20 20 0 0 0-6.91-3.22 113.54 113.54 0 0 0-14.37-1.94c-8.24-.62-16.5-1.22-24.76-1.32-6.44-.08-12.89.48-19.31 1a59.54 59.54 0 0 0-11.22 1.81 66.71 66.71 0 0 0-11.65 4.5c-3.72 1.86-7.13 4.33-10.74 6.58 7 3.08 11.58 3.65 18.95 2 7.56-1.7 15.09-2.68 22.76-.79a35.91 35.91 0 0 0 4.41.56c-5.05 1.72-10.11 2.88-15.15 4.13-5.29 1.31-11.52 5.12-13.08 8.13 4-1.76 7.6-3.58 11.38-5a72.79 72.79 0 0 1 11.72-3.54c3.88-.73 7.94-1.39 11.86.47-2.27.59-4.58 1-6.87 1.38-8.06 1.47-15.36 5-22.52 8.72-2.51 1.31-4.55 3.51-6.88 5.36 3.84 3.42 9 3.5 13.89.58.57 1 .91 2.3 1.74 3 3.44 2.74 13.68 5.26 18 4.69a24.36 24.36 0 0 1-4.86-2 29.59 29.59 0 0 1-4-4c.29-1.12.58-2.24.94-3.61l8.26 2.63 3.31-1.33c2.3.15 4.37.58 4.78 3.42.03.22.66.44 1.02.71Zm-42.79-11.33.14.09v-.12Z"
                        className="cls-2"
                    />
                    <path
                        d="M261.6 389.45h-2.31a37.53 37.53 0 0 1-9.72-1.09l-3.45-1.11c.42-2 2-1.28 3-1.1 6.49 1.21 12.83.15 19.2-.89 4.64-.77 9.24-2.53 14-.88 2.87 1 5.67 2.18 8.79 3.4a23.66 23.66 0 0 0 3.18-1.22c5.29-2.78 10.49-2.28 15.39.72 5.33 3.25 11 3.86 17 3.12 1-.13 2.09-.92 2.42.8-5.91 2.61-12.16 1.53-18.3 1.74-3.22-1-6.39-2.3-9.67-2.7-2.21-.27-4.33-.6-7 .71a10.26 10.26 0 0 1-5 .5 15.42 15.42 0 0 1-5.46-1.81c-3-.6-4.9-.28-7.35-.42l-5-.21"
                        className="cls-6"
                    />
                    <path
                        d="M264.53 389.3c.38 0 1.93-.11 3.52-.22s2.93-.12 3.33-.1a34.3 34.3 0 0 0-.19 3.78c.11 1.79.5 3.56.61 5.34s-.87 2.75-2.74 2.86c-3.77.22-6.87-1.38-9.56-3.73a58.85 58.85 0 0 0-17.63-10.69 9.94 9.94 0 0 1-2.08-1.58l6.33 2.26 3.45 1.11a37.27 37.27 0 0 0 9.72 1.09h2c.35.02 2.86-.09 3.24-.12ZM290.8 450.24l-1.37 1Z"
                        className="cls-2"
                    />
                    <path
                        d="M294.19 390.92c1.86-1.37 4.75-1 7-.71 3.28.4 6.45 1.75 9.67 2.7-1.18 2-2.28 4.11-3.58 6-.33.49-1.31.53-2 .78-.77-5.18-3.78-8-9.11-8.6Z"
                        className="cls-5"
                    />
                    <path
                        d="m230.1 241.05-3.31 1.33-8.26-2.63c-.36 1.37-.65 2.49-.94 3.61a13.73 13.73 0 0 1-1.06-2c-1.22-3.41-3.1-4.13-6.13-2.22-1.27.8-2.47 1.71-3.71 2.58-4.89 2.92-10.05 2.84-13.89-.58 2.33-1.85 4.37-4.05 6.88-5.36 7.16-3.75 14.46-7.25 22.52-8.72 2.29-.42 4.6-.79 6.87-1.38-3.92-1.86-8-1.2-11.86-.47a72.79 72.79 0 0 0-11.72 3.54c-3.78 1.41-7.41 3.23-11.38 5 1.56-3 7.79-6.82 13.08-8.13 5-1.25 10.1-2.41 15.15-4.13a35.91 35.91 0 0 1-4.41-.56c-7.67-1.89-15.2-.91-22.76.79-7.37 1.65-12 1.08-18.95-2 3.61-2.25 7-4.72 10.74-6.58a66.71 66.71 0 0 1 11.68-4.52 59.54 59.54 0 0 1 11.22-1.81c6.42-.53 12.87-1.09 19.31-1 8.26.1 16.52.7 24.76 1.32a113.54 113.54 0 0 1 14.37 1.94 20 20 0 0 1 6.91 3.22 8.24 8.24 0 0 1 3.56 6.84c.33 9.74-4.35 16.48-12.58 21.08-1.65.92-3.4 1.69-5.36 2.65l1.33 3.33-10.68-4a28.4 28.4 0 0 0-12.28-8.16c-.09.94-.17 1.75-.25 2.57a4.6 4.6 0 0 1-1.39-.8 11.57 11.57 0 0 0-11.78-4.24c-1.7.59-4.26 0-4.05 3.65l5.06-1.57c2.15-.3 3.17 1.06 4.11 2.68 1.1 1.9-.35 3.21-.8 4.73Z"
                        className="cls-6"
                    />
                    <path
                        d="M239 236.66c.08-.82.16-1.63.25-2.57a28.4 28.4 0 0 1 12.28 8.16c-4.89 7-12.5 6.58-20.08 7.8l4.52-4.78c.77-1.09 1.84-2.09 2.23-3.31a30.94 30.94 0 0 0 .8-5.3ZM206.69 241.77c1.24-.87 2.44-1.78 3.71-2.58 3-1.91 4.91-1.19 6.13 2.22a13.73 13.73 0 0 0 1.06 2 29.59 29.59 0 0 0 4 4 24.36 24.36 0 0 0 4.86 2c-4.37.57-14.61-2-18-4.69-.85-.65-1.19-1.94-1.76-2.95Z"
                        className="cls-1"
                    />
                    <path
                        d="M239 236.66a30.94 30.94 0 0 1-.8 5.3c-.39 1.22-1.46 2.22-2.23 3.31-.36-.26-1-.49-1-.8-.41-2.84-2.48-3.27-4.78-3.42.45-1.52 1.86-2.83.8-4.67-.94-1.62-2-3-4.11-2.68l-1-2.08a11.57 11.57 0 0 1 11.78 4.24 4.6 4.6 0 0 0 1.34.8Z"
                        className="cls-5"
                    />
                    <path
                        d="m193.13 233.94.16-.03-.02.12-.14-.09z"
                        className="cls-6"
                    />
                    <path
                        d="m225.78 231.62 1 2.08-5.06 1.57c-.2-3.68 2.36-3.06 4.06-3.65Z"
                        className="cls-1"
                    />
                </g>
            </g>
        </svg>
    );
};
export default MiraxsageIcon;
