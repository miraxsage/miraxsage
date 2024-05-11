import { Box, BoxProps } from "@mui/material";
import DeveloperIllustration from "./DeveloperIllustration";
import Link from "@/components/Link";
import { useLanguage } from "@/store/appearanceSlice";
import __ from "@/utilities/transtation";

function SpecialLink({ sx, children, ...props }: BoxProps<"a">) {
    return (
        <Link
            sx={{
                textDecorationColor: "#589487",
                WebkitTextFillColor: "#589487",
                "&:hover": {
                    textDecorationColor: "#2bc979",
                    WebkitTextFillColor: "#2bc979",
                },
                ...sx,
            }}
            {...props}
        >
            {children}
        </Link>
    );
}

export default function HelloBlock() {
    const lang = useLanguage();
    return (
        <Box sx={{ display: "flex", gap: "5vw", alignItems: "center", justifyContent: "center" }}>
            <DeveloperIllustration sx={{ width: "40%" }} />
            <Box>
                <Box sx={{ fontFamily: "NeueMachina", color: "white", fontSize: "57px", lineHeight: 1 }}>
                    {lang.ru ? "Всем " : "Hello "}
                    <Box
                        sx={{
                            display: "inline-block",
                            background: `linear-gradient(25deg, #2dcab2, #2bc979)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {lang.ru ? "привет" : "everyone"}
                    </Box>
                    !{" "}
                    <Box component="span" sx={{ fontSize: "45px", position: "relative", top: "-4px" }}>
                        👋
                    </Box>
                    <Box
                        sx={{
                            background: `linear-gradient(90deg, #ffffff 30%, #589487)`,
                            fontFamily: "Cascadia",
                            lineHeight: 1.2,
                            fontSize: "30px",
                            fontWeight: "500",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        <br />
                        {lang.ru ? "Меня зовут Максим и я" : "My name is Maxim and I am a"}
                        <br />
                        <Box component="span" sx={{ textDecoration: "line-through", textDecorationColor: "white" }}>
                            {lang.ru ? "трудоголик" : "workaholic"}
                        </Box>
                        {lang.ru ? " веб-разработчик" : " web-developer"}
                        <Box component="span" sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}>
                            🙂‍
                        </Box>
                        .
                        <br />
                        {lang.ru ? (
                            <>
                                Давайте немного познакомимся. <br />
                                На этой страничке я расскажу чуть <br />
                                чуть о себе, о своих навыках и <br />
                                опыте.
                                <br />
                                <br />
                                Вы всегда можете изучить мое
                                <br />
                                подробное
                            </>
                        ) : (
                            <>
                                Let's get acquainted just a bit.
                                <br />
                                On this page I will tell you
                                <br />
                                a little about myself, my <br />
                                skills and experience.
                                <br />
                                <br />
                                You can always view my detailed
                                <br />
                            </>
                        )}{" "}
                        <SpecialLink href="/about">_{__("resume")}</SpecialLink>
                        <Box component="span" sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}>
                            📜
                        </Box>{" "}
                        и <SpecialLink href="/projects">_{__("portfolio")}</SpecialLink>
                        <Box component="span" sx={{ WebkitBackgroundClip: "unset", WebkitTextFillColor: "white" }}>
                            💼
                        </Box>
                        ,
                        <br />
                        {lang.ru ? (
                            <>
                                перейдя по соответствующим ссылкам
                                <br />
                                в каждом из блоков или начале
                                <br />
                                страницы.
                            </>
                        ) : (
                            <>
                                by clicking on the appropriate
                                <br />
                                links in each of the blocks or
                                <br />
                                at the beginning of the page.
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
