import { useEffect } from "react";
import LogoIcon from "./icons/Logo";

export function AppSpinner({ compact }: { compact?: boolean }) {
    const stylesId = compact ? "app-loader-compact-styles" : "app-loader-styles";
    useEffect(() => {
        const appearanceConfig = JSON.parse(localStorage.getItem("appearanceConfig") ?? "{}") ?? {
            colorMode: "dark",
            language: "ru",
        };
        const bg =
            appearanceConfig.colorMode == "light"
                ? compact
                    ? "transparent"
                    : "linear-gradient(90deg, rgb(240, 240, 240), transparent 20%, transparent 80%, rgb(240, 240, 240))"
                : "#151722";
        const fg = appearanceConfig.colorMode == "light" ? "#d1d1d1" : "#2c2f3e";
        if (document.querySelector("head style#" + stylesId)) return;
        const loaderStyles = document.createElement("style");
        loaderStyles.innerHTML = `
        body{
            margin: 0;
        }
        .${stylesId}.loader-container{
            background: ${bg};
            display: flex;
            align-items: center;
            justify-content: center;
            ${compact ? "min-height: unset;" : "min-height: 100dvh;"}
            width: 100%;
            height: 100%;
            opacity: 1 !important;
        }
        .${stylesId}.loader-container .loader-element{
            color: ${fg};
            display: flex;
            flex-direction: column;
            gap: 15px;
            align-items: center;
        }
        .${stylesId}.loader-container .loader-element svg{
            width: 45px;
            height: 45px;
        }
        .${stylesId}.loader-container .loader-element .loader-animator{
            width: 25px;
            aspect-ratio: 5/4;
            --c: no-repeat linear-gradient(${fg} 0 0);
            background: var(--c), var(--c), var(--c);
            animation: l16-1 1s infinite, l16-2 1s infinite
        }
        @keyframes l16-1 {
            0%, 100% { background-size: 20% 100% }
            33%, 66% { background-size: 20% 40% }
        }
        @keyframes l16-2 {
            0%, 33% { background-position: 0 0, 50% 100%, 100% 0 }
            66%, 100% { background-position: 0 100%, 50% 0, 100% 100% }
        };`;
        loaderStyles.id = stylesId;
        document.querySelector("head")?.appendChild(loaderStyles);
    }, []);

    return (
        <div className={stylesId + " loader-container"} style={{ opacity: 0 }}>
            <div className="loader-element">
                <LogoIcon />
                <div className="loader-animator"></div>
            </div>
        </div>
    );
}

export function SimpleSpinner() {
    useEffect(() => {
        const appearanceConfig = JSON.parse(localStorage.getItem("appearanceConfig") ?? "{}") ?? {
            colorMode: "dark",
            language: "ru",
        };
        const fg = appearanceConfig.colorMode == "light" ? "#d1d1d1" : "#2c2f3e";
        if (document.querySelector("head style#loader-styles")) return;
        const loaderStyles = document.createElement("style");
        loaderStyles.innerHTML = `
        .loader-element{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${fg};
        }
        .loader-element .loader-animator{
            width: 25px;
            aspect-ratio: 5/4;
            --c: no-repeat linear-gradient(${fg} 0 0);
            background: var(--c), var(--c), var(--c);
            animation: l16-1 1s infinite, l16-2 1s infinite
        }
        @keyframes l16-1 {
            0%, 100% { background-size: 20% 100% }
            33%, 66% { background-size: 20% 40% }
        }
        @keyframes l16-2 {
            0%, 33% { background-position: 0 0, 50% 100%, 100% 0 }
            66%, 100% { background-position: 0 100%, 50% 0, 100% 100% }
        };`;
        loaderStyles.id = "loader-styles";
        document.querySelector("head")?.appendChild(loaderStyles);
    }, []);

    return (
        <div className="loader-element">
            <div className="loader-animator"></div>
        </div>
    );
}
