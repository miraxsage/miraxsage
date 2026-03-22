"use client";

import { PayloadAction, createListenerMiddleware, createSlice } from "@reduxjs/toolkit";
import { TypeOrItsAnyInnerField } from "@/shared/types/common";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setCurrentLanguage } from "@/shared/lib/i18n/translation";

interface AppearanceConfig {
    colorMode: "light" | "dark";
    language: "ru" | "en";
    viewMode: "desktop" | "console";
    screenMode: "full" | "window";
    asideMenuVisibility: "shown" | "collapsed";
    siteMapVisibility: "shown" | "collapsed";
    infoDrawerVisibility: "shown" | "collapsed";
}

function getDefaultLanguage(): "ru" | "en" {
    if (typeof navigator === "undefined") return "ru";
    let userLang = (navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage) ?? "ru";
    if (!userLang) userLang = "ru";
    userLang = userLang.slice(0, 2).toLowerCase();
    if (!userLang.match(/^ru|en$/)) userLang = "ru";
    return userLang as "ru" | "en";
}

const defaultConfig: AppearanceConfig = {
    colorMode: "dark",
    language: "ru",
    viewMode: "desktop",
    screenMode: "window",
    asideMenuVisibility: "shown",
    siteMapVisibility: "collapsed",
    infoDrawerVisibility: "collapsed",
};

function getInitialConfig(): AppearanceConfig {
    // Always return server-safe defaults for SSR/hydration consistency.
    // Real user preferences are applied after hydration via hydratePreferences action.
    return defaultConfig;
}

type StateConfig = {
    appearance: AppearanceConfig;
};

const initialConfig = getInitialConfig();

const slice = createSlice({
    name: "appearance",
    initialState: initialConfig,
    reducers: {
        hydratePreferences: (state, action: PayloadAction<Partial<AppearanceConfig>>) => {
            return { ...state, ...action.payload };
        },
        colorMode: (state, options: PayloadAction<AppearanceConfig["colorMode"]>) => {
            state.colorMode = options.payload;
        },
        language: (state, newLanguage: PayloadAction<AppearanceConfig["language"]>) => {
            state.language = newLanguage.payload;
            if (typeof window !== "undefined") {
                document.documentElement.lang = state.language;
            }
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
            if (options.payload === "shown") state.infoDrawerVisibility = "collapsed";
        },
        infoDrawerVisibility: (state, options: PayloadAction<AppearanceConfig["infoDrawerVisibility"]>) => {
            state.infoDrawerVisibility = options.payload;
            if (options.payload === "shown") state.siteMapVisibility = "collapsed";
        },
    },
});

const appearanceListener = createListenerMiddleware<StateConfig>();
appearanceListener.startListening({
    predicate: (action) => action.type.startsWith("appearance"),
    effect(_action, api) {
        const state = api.getState().appearance;
        setCurrentLanguage(state.language);
        if (typeof document === "undefined") return;
        const value = JSON.stringify({ ...state, siteMapVisibility: "collapsed", infoDrawerVisibility: "collapsed" });
        document.cookie = `appearanceConfig=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 365}`;
    },
});
const listener = appearanceListener.middleware;

export default slice.reducer;

export const { hydratePreferences, colorMode, language, viewMode, screenMode, asideMenuVisibility } = slice.actions;

export { defaultConfig, getDefaultLanguage };

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
    const sm = useAppearance((appearance) => appearance.screenMode);
    const dispatch = useDispatch();
    return {
        value: sm,
        full: sm == "full",
        window: sm == "window",
        update: (
            newScreenMode:
                | AppearanceConfig["screenMode"]
                | ((oldScreenMode: AppearanceConfig["screenMode"]) => AppearanceConfig["screenMode"])
        ) =>
            dispatch(
                slice.actions.screenMode(typeof newScreenMode == "function" ? newScreenMode(sm) : newScreenMode)
            ),
        toggle: () => dispatch(slice.actions.screenMode(sm == "window" ? "full" : "window")),
    };
}

export function useViewMode() {
    const vm = useAppearance((appearance) => appearance.viewMode);
    const dispatch = useDispatch();
    return {
        value: vm,
        desktop: vm == "desktop",
        console: vm == "console",
        update: (
            newViewMode:
                | AppearanceConfig["viewMode"]
                | ((oldScreenMode: AppearanceConfig["viewMode"]) => AppearanceConfig["viewMode"])
        ) => dispatch(slice.actions.viewMode(typeof newViewMode == "function" ? newViewMode(vm) : newViewMode)),
        toggle: () => dispatch(slice.actions.viewMode(vm == "desktop" ? "console" : "desktop")),
    };
}

export function useAsideMenuVisibility() {
    const amv = useAppearance((appearance) => appearance.asideMenuVisibility);
    const dispatch = useDispatch();
    return {
        value: amv,
        shown: amv == "shown",
        collapsed: amv == "collapsed",
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
                        ? newAsideMenuVisibility(amv)
                        : newAsideMenuVisibility
                )
            ),
        toggle: () =>
            dispatch(slice.actions.asideMenuVisibility(amv == "shown" ? "collapsed" : "shown")),
    };
}

export function useSiteMapVisibility() {
    const smv = useAppearance((appearance) => appearance.siteMapVisibility);
    const dispatch = useDispatch();
    return {
        value: smv,
        shown: smv == "shown",
        collapsed: smv == "collapsed",
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
                        ? newSiteMapVisibility(smv)
                        : newSiteMapVisibility
                )
            ),
        toggle: () => dispatch(slice.actions.siteMapVisibility(smv == "shown" ? "collapsed" : "shown")),
    };
}

export function useInfoDrawerVisibility() {
    const idv = useAppearance((appearance) => appearance.infoDrawerVisibility);
    const dispatch = useDispatch();
    return {
        value: idv,
        shown: idv == "shown",
        collapsed: idv == "collapsed",
        update: (
            newVisibility:
                | AppearanceConfig["infoDrawerVisibility"]
                | ((old: AppearanceConfig["infoDrawerVisibility"]) => AppearanceConfig["infoDrawerVisibility"])
        ) =>
            dispatch(
                slice.actions.infoDrawerVisibility(
                    typeof newVisibility == "function" ? newVisibility(idv) : newVisibility
                )
            ),
        toggle: () => dispatch(slice.actions.infoDrawerVisibility(idv == "shown" ? "collapsed" : "shown")),
    };
}
