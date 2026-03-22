"use client";

import { createContext, useContext } from "react";
import { defaultInfoDrawerData } from "./infoDrawerDefaults";
import type { InfoDrawerData } from "./infoDrawerDefaults";

export type { InfoDrawerData };
export { defaultInfoDrawerData };

export const InfoDrawerDataContext = createContext<InfoDrawerData>(defaultInfoDrawerData);

export function useInfoDrawerData() {
    return useContext(InfoDrawerDataContext);
}
