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
                dispatch(hydratePreferences(JSON.parse(stored)));
            } else {
                dispatch(hydratePreferences({ language: getDefaultLanguage() }));
            }
        } catch {
            dispatch(hydratePreferences({}));
        }
    }, [dispatch]);

    return children;
}
