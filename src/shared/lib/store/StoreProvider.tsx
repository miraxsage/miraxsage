"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppearanceState } from "./index";

export default function StoreProvider({
    children,
    initialAppearance,
}: {
    children: React.ReactNode;
    initialAppearance?: Partial<AppearanceState>;
}) {
    const storeRef = useRef(makeStore(initialAppearance));
    return <Provider store={storeRef.current}>{children}</Provider>;
}
