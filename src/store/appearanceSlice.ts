import { PayloadAction, createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import { TypeOrItsAnyInnerField } from "@/types/common";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface AppearanceConfig {
    colorMode: "light" | "dark";
    language: "ru" | "en";
    viewMode: "desktop" | "console";
    screenMode: "full" | "window";
    asideMenuVisibility: "shown" | "collapsed";
    siteMapVisibility: "shown" | "collapsed";
}

const defaultConfig: AppearanceConfig = {
    colorMode: "dark",
    language: "ru",
    viewMode: "desktop",
    screenMode: "window",
    asideMenuVisibility: "shown",
    siteMapVisibility: "collapsed",
};

type StateConfig = {
    appearance: AppearanceConfig;
};

const localStorageConfig = localStorage.getItem("appearanceConfig");
const initialConfig = (localStorageConfig ? JSON.parse(localStorageConfig) : defaultConfig) as AppearanceConfig;
document.documentElement.lang = initialConfig.language;

const slice = createSlice({
    name: "appearance",
    initialState: initialConfig,
    reducers: {
        colorMode: (state, options: PayloadAction<AppearanceConfig["colorMode"]>) => {
            state.colorMode = options.payload;
        },
        language: (state, newLanguage: PayloadAction<AppearanceConfig["language"]>) => {
            state.language = newLanguage.payload;
            window.cookie.set("lang", state.language);
            document.documentElement.lang = state.language;
        },
        viewMode: (state, options: PayloadAction<AppearanceConfig["viewMode"]>) => {
            state.viewMode = options.payload;
        },
        screenMode: (state, options: PayloadAction<AppearanceConfig["screenMode"]>) => {
            state.screenMode = options.payload;
        },
        asideMenuVisibility: (state, options: PayloadAction<AppearanceConfig["asideMenuVisibility"]>) => {
            state.asideMenuVisibility = options.payload;
        },
        siteMapVisibility: (state, options: PayloadAction<AppearanceConfig["siteMapVisibility"]>) => {
            state.siteMapVisibility = options.payload;
        },
    },
});

const appearanceListener = createListenerMiddleware<StateConfig>();
appearanceListener.startListening({
    predicate: (action) => action.type.startsWith("appearance"),
    effect(_action, api) {
        localStorage.setItem(
            "appearanceConfig",
            JSON.stringify({ ...api.getState().appearance, siteMapVisibility: "collapsed" })
        );
    },
});
const listener = appearanceListener.middleware;

export default slice.reducer;

export const { colorMode, language, viewMode, screenMode, asideMenuVisibility } = slice.actions;

export { listener };

type UseAppearanceSelector = TypedUseSelectorHook<StateConfig>;
const useAppearanceSelector: UseAppearanceSelector = useSelector;

export function useAppearance(): AppearanceConfig;

export function useAppearance<SelectType extends TypeOrItsAnyInnerField<AppearanceConfig>>(
    selector: (state: AppearanceConfig) => SelectType
): SelectType;
export function useAppearance<SelectType extends TypeOrItsAnyInnerField<AppearanceConfig>>(
    selector?: (state: AppearanceConfig) => SelectType | AppearanceConfig
) {
    if (selector == undefined) selector = (s) => s;
    return useAppearanceSelector((state) => selector?.(state.appearance) ?? state.appearance);
}

export function useColorMode() {
    const mode = useAppearance((appearance) => appearance.colorMode);
    const dispatch = useDispatch();
    return {
        dark: mode == "dark",
        light: mode == "light",
        mode,
        toggle: () => dispatch(slice.actions.colorMode(mode == "dark" ? "light" : "dark")),
        update: (
            newMode:
                | AppearanceConfig["colorMode"]
                | ((oldMode: AppearanceConfig["colorMode"]) => AppearanceConfig["colorMode"])
        ) => dispatch(slice.actions.colorMode(typeof newMode == "function" ? newMode(mode) : newMode)),
    };
}

export function useLanguage() {
    const lang = useAppearance((appearance) => appearance.language);
    const dispatch = useDispatch();
    return {
        en: lang == "en",
        ru: lang == "ru",
        lang,
        update: (
            newLang:
                | AppearanceConfig["language"]
                | ((oldLang: AppearanceConfig["language"]) => AppearanceConfig["language"])
        ) => dispatch(slice.actions.language(typeof newLang == "function" ? newLang(lang) : newLang)),
        toggle: () => dispatch(slice.actions.language(lang == "ru" ? "en" : "ru")),
    };
}

export function useScreenMode() {
    const screenMode = useAppearance((appearance) => appearance.screenMode);
    const dispatch = useDispatch();
    return {
        value: screenMode,
        full: screenMode == "full",
        window: screenMode == "window",
        update: (
            newscreenMode:
                | AppearanceConfig["screenMode"]
                | ((oldscreenMode: AppearanceConfig["screenMode"]) => AppearanceConfig["screenMode"])
        ) =>
            dispatch(
                slice.actions.screenMode(typeof newscreenMode == "function" ? newscreenMode(screenMode) : newscreenMode)
            ),
        toggle: () => dispatch(slice.actions.screenMode(screenMode == "window" ? "full" : "window")),
    };
}

export function useViewMode() {
    const viewMode = useAppearance((appearance) => appearance.viewMode);
    const dispatch = useDispatch();
    return {
        value: viewMode,
        desktop: viewMode == "desktop",
        console: viewMode == "console",
        update: (
            newViewMode:
                | AppearanceConfig["viewMode"]
                | ((oldScreenMode: AppearanceConfig["viewMode"]) => AppearanceConfig["viewMode"])
        ) => dispatch(slice.actions.viewMode(typeof newViewMode == "function" ? newViewMode(viewMode) : newViewMode)),
        toggle: () => dispatch(slice.actions.viewMode(viewMode == "desktop" ? "console" : "desktop")),
    };
}

export function useAsideMenuVisibility() {
    const asideMenuVisibility = useAppearance((appearance) => appearance.asideMenuVisibility);
    const dispatch = useDispatch();
    return {
        value: asideMenuVisibility,
        shown: asideMenuVisibility == "shown",
        collapsed: asideMenuVisibility == "collapsed",
        update: (
            newAsideMenuVisibility:
                | AppearanceConfig["asideMenuVisibility"]
                | ((
                      oldAsideMenuVisibility: AppearanceConfig["asideMenuVisibility"]
                  ) => AppearanceConfig["asideMenuVisibility"])
        ) =>
            dispatch(
                slice.actions.asideMenuVisibility(
                    typeof newAsideMenuVisibility == "function"
                        ? newAsideMenuVisibility(asideMenuVisibility)
                        : newAsideMenuVisibility
                )
            ),
        toggle: () =>
            dispatch(slice.actions.asideMenuVisibility(asideMenuVisibility == "shown" ? "collapsed" : "shown")),
    };
}

export function useSiteMapVisibility() {
    const siteMapVisibility = useAppearance((appearance) => appearance.siteMapVisibility);
    const dispatch = useDispatch();
    return {
        value: siteMapVisibility,
        shown: siteMapVisibility == "shown",
        collapsed: siteMapVisibility == "collapsed",
        update: (
            newSiteMapVisibility:
                | AppearanceConfig["siteMapVisibility"]
                | ((
                      oldAsideMenuVisibility: AppearanceConfig["siteMapVisibility"]
                  ) => AppearanceConfig["siteMapVisibility"])
        ) =>
            dispatch(
                slice.actions.siteMapVisibility(
                    typeof newSiteMapVisibility == "function"
                        ? newSiteMapVisibility(siteMapVisibility)
                        : newSiteMapVisibility
                )
            ),
        toggle: () => dispatch(slice.actions.siteMapVisibility(siteMapVisibility == "shown" ? "collapsed" : "shown")),
    };
}
