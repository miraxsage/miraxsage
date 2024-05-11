import { Box, SxProps, alpha, useTheme } from "@mui/material";
import LeftFloralBackground from "./LeftFloralBackground";
import { getThemeColor } from "@/components/contexts/Theme";
import RightFloralBackground from "./RightFloralBackground";
import AgreementImage from "./AgreementImage";
import GeometryWavesBackground from "./GeometryWavesBackground";

type HeadlineTitleBlockProps = {
    children: string;
    background: "light" | "dark" | "light-hatching" | "dark-hatching";
    sx?: SxProps;
};
function HeadlineTitleBlock({ children, background, sx }: HeadlineTitleBlockProps) {
    const theme = useTheme();
    const dividerColor = theme.palette.divider;
    const layoutColor = getThemeColor("layoutBackground", theme);
    let bg = null;
    let border = null;
    if (background == "dark") {
        bg = layoutColor;
        border = dividerColor;
    } else if (background == "light") {
        bg = dividerColor;
        border = layoutColor;
    } else if (background == "dark-hatching") {
        bg = `repeating-linear-gradient(
            -45deg,
            ${getThemeColor("layoutBackground", theme)},
            ${getThemeColor("layoutBackground", theme)} 5px,
            ${theme.palette.divider} 5px,
            ${theme.palette.divider} 6.5px 
          )`;
        border = dividerColor;
    } else {
        bg = `repeating-linear-gradient(
            -45deg,
            ${theme.palette.divider},
            ${theme.palette.divider} 5px,
            ${getThemeColor("layoutBackground", theme)} 5px,
            ${getThemeColor("layoutBackground", theme)} 6px 
          )`;
        border = layoutColor;
    }

    return (
        <Box
            sx={{
                padding: "3.5px 14px 5px 14px",
                borderRadius: "5px",
                fontSize: "21px",
                background: bg,
                border: `1px solid ${border}`,
                ...sx,
            }}
        >
            {children}
        </Box>
    );
}

function Headline({ sx }: { sx?: SxProps }) {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px 0px", ...sx }}>
            <Box sx={{ display: "flex", flexDirection: "column", position: "relative" }}>
                <HeadlineTitleBlock
                    background="dark-hatching"
                    sx={{
                        fontWeight: "bold",
                        alignSelf: "start",
                        position: "absolute",
                        left: "5px",
                        top: "-5px",
                        userSelect: "none",
                    }}
                >
                    Большое спасибо!
                </HeadlineTitleBlock>
                <HeadlineTitleBlock
                    background="dark-hatching"
                    sx={{ userSelect: "none", position: "absolute", right: "-5px", bottom: "5px" }}
                >
                    за Ваше внимание
                </HeadlineTitleBlock>
                <HeadlineTitleBlock
                    background="light"
                    sx={{ fontWeight: "bold", alignSelf: "start", position: "relative" }}
                >
                    Большое спасибо!
                </HeadlineTitleBlock>
                <HeadlineTitleBlock background="dark" sx={{ margin: "-8px 0px 0px 80px", position: "relative" }}>
                    за Ваше внимание
                </HeadlineTitleBlock>
            </Box>
        </Box>
    );
}

export default function Thankfullness() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr)",
                background: getThemeColor("barBackground", theme),
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "112px",
                    overflow: "hidden",
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                }}
            >
                <GeometryWavesBackground style={{ translate: "0 -10%" }} />
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <LeftFloralBackground style={{ height: "100%" }} />
                <RightFloralBackground style={{ height: "100%" }} />
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplate: "1fr / 40% 45% 15%",
                    padding: "0px 0px 15px 0px",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        justifySelf: "end",
                        position: "relative",
                        marginRight: "70px",
                        translate: "0 8%",
                        scale: "1.2",
                        aspectRatio: "504 / 336",
                    }}
                >
                    <AgreementImage style={{ position: "absolute", height: "100%" }} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Headline />
                    <Box sx={{ textIndent: "40px", marginTop: "8px" }}>
                        <p>
                            Я Вас сердечно благодарю за посещение моего скромного сайта и очень надеюсь, что у него
                            получилось вызвать у Вас положительные эмоции визуального, эстетического, функционального
                            плана и, возможно, Вам захотелось написать мне, задать вопрос или сделать предложение.
                            Честно говоря, я буду очень рад получить от Вас обратную связь.
                        </p>
                        <p>
                            Вы можете отправить мне сообщение в одной из указанных соцсетей (я чаще использую Telegram),
                            по электронной почте или написать его прямо на этой станице через форму обратной связи ниже.
                        </p>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
