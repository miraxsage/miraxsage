"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydratePreferences, getDefaultLanguage } from "./appearanceSlice";

export default function AppHydration({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const stored = localStorage.getItem("appearanceConfig");
            if (stored) {
                const parsed = JSON.parse(stored);
                dispatch(hydratePreferences(parsed));
            } else {
                const lang = getDefaultLanguage();
                if (lang !== "ru") {
                    dispatch(hydratePreferences({ language: lang }));
                }
            }
        } catch {
            // ignore parse errors
        }
    }, [dispatch]);

    return children;
}
