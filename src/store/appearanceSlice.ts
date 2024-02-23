import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TypeOrItsAnyInnerField } from "@/types/common";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface AppearanceConfig {
    colorMode: "light" | "dark";
    language: "ru" | "en";
}

const defaultConfig: AppearanceConfig = {
    colorMode: "dark",
    language: "ru",
};

const localStorageConfig = localStorage.getItem("appearanceConfig");
const initialConfig = (
    localStorageConfig ? JSON.parse(localStorageConfig) : defaultConfig
) as AppearanceConfig;

const slice = createSlice({
    name: "appearance",
    initialState: initialConfig,
    reducers: {
        colorMode: (
            state,
            options: PayloadAction<AppearanceConfig["colorMode"]>
        ) => {
            state.colorMode = options.payload;
        },
        language: (
            state,
            newLanguage: PayloadAction<AppearanceConfig["language"]>
        ) => {
            state.language = newLanguage.payload;
            window.cookie.set("lang", state.language);
        },
    },
});

export default slice.reducer;

export const { colorMode, language } = slice.actions;

type UseAppearanceSelector = TypedUseSelectorHook<{
    appearance: AppearanceConfig;
}>;
const useAppearanceSelector: UseAppearanceSelector = useSelector;

export function useAppearance(): AppearanceConfig;

export function useAppearance<
    SelectType extends TypeOrItsAnyInnerField<AppearanceConfig>
>(selector: (state: AppearanceConfig) => SelectType): SelectType;

export function useAppearance<
    SelectType extends TypeOrItsAnyInnerField<AppearanceConfig>
>(selector?: (state: AppearanceConfig) => SelectType | AppearanceConfig) {
    if (selector == undefined) selector = (s) => s;
    return useAppearanceSelector(
        (state) => selector?.(state.appearance) ?? state.appearance
    );
}

export function useColorMode() {
    const mode = useAppearance((appearance) => appearance.colorMode);
    const dispatch = useDispatch();
    return {
        dark: mode == "dark",
        light: mode == "light",
        mode,
        update: (
            newMode:
                | AppearanceConfig["colorMode"]
                | ((
                      oldMode: AppearanceConfig["colorMode"]
                  ) => AppearanceConfig["colorMode"])
        ) =>
            dispatch(
                slice.actions.colorMode(
                    typeof newMode == "function" ? newMode(mode) : newMode
                )
            ),
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
                | ((
                      oldLang: AppearanceConfig["language"]
                  ) => AppearanceConfig["language"])
        ) =>
            dispatch(
                slice.actions.language(
                    typeof newLang == "function" ? newLang(lang) : newLang
                )
            ),
        toggle: () =>
            dispatch(slice.actions.language(lang == "ru" ? "en" : "ru")),
    };
}
