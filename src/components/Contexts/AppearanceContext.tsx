import { ReactNode, createContext, useContext, useState } from "react";
import ThemeContext from "./ThemeContext";
import { FlagsObjectFromUnion } from "@/types/Common";

type AppearanceConfig = {
    colorMode: "light" | "dark";
    language: "ru" | "en";
};

type AppearanceContextConfig = AppearanceConfig & {
    update: (
        config:
            | Partial<AppearanceConfig>
            | ((updater: AppearanceConfig) => Partial<AppearanceConfig>)
    ) => void;
};

const defaultConfig: AppearanceConfig = {
    colorMode: "dark",
    language: "ru",
};

const Context = createContext<AppearanceContextConfig | null>(null);

const AppearanceContext: React.FC<{ children: ReactNode }> = function ({
    children,
}) {
    const localStorageConfig = localStorage.getItem("appearanceContextConfig");
    const defConf = localStorageConfig
        ? JSON.parse(localStorageConfig)
        : (defaultConfig as AppearanceConfig);
    const [config, setConfig] = useState<AppearanceConfig>({
        ...defConf,
    });
    const contextConfig: AppearanceContextConfig = {
        ...config,
        update(newConfig) {
            let resultConfig = null;
            if (typeof newConfig == "function")
                resultConfig = { ...config, ...newConfig(config) };
            else resultConfig = { ...config, ...newConfig };
            localStorage.setItem(
                "appearanceContextConfig",
                JSON.stringify(resultConfig)
            );
            setConfig(resultConfig);
        },
    };
    return (
        <Context.Provider value={contextConfig}>
            <ThemeContext>{children}</ThemeContext>
        </Context.Provider>
    );
};

export default AppearanceContext;

/* APPEARANCE HOOKS */
export function useAppearance(
    updater: (oldConfig: AppearanceConfig) => AppearanceConfig
): undefined;
export function useAppearance(): AppearanceContextConfig;
// eslint-disable-next-line react-refresh/only-export-components
export function useAppearance(
    updater?: (oldConfig: AppearanceConfig) => Partial<AppearanceConfig>
): AppearanceContextConfig | undefined {
    const context = useContext(Context);
    if (!context) throw new Error("There is no appearance context provided");
    if (updater) {
        context.update(updater(context));
        return;
    }
    return context;
}

export function useThemeMode(
    newTheme: AppearanceConfig["colorMode"] | "toggle"
): undefined;
export function useThemeMode(): FlagsObjectFromUnion<
    AppearanceConfig["colorMode"]
> & { mode: AppearanceConfig["colorMode"] };
// eslint-disable-next-line react-refresh/only-export-components
export function useThemeMode(
    newTheme?: AppearanceConfig["colorMode"] | "toggle"
):
    | (FlagsObjectFromUnion<AppearanceConfig["colorMode"]> & {
          mode: AppearanceConfig["colorMode"];
      })
    | undefined {
    const context = useAppearance();
    if (newTheme)
        context.update({
            colorMode:
                newTheme == "toggle"
                    ? context.colorMode == "dark"
                        ? "light"
                        : "dark"
                    : newTheme,
        });
    else
        return {
            dark: context.colorMode == "dark",
            light: context.colorMode == "light",
            mode: context.colorMode,
        };
}
