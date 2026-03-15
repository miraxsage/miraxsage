"use client";

import { createContext, useContext } from "react";
import type { ProjectImage } from "@/entities/project/model/projectImage";

interface ImageMarkerContextValue {
    images: ProjectImage[];
    mediaId: string;
    onImageClick: (slug: string) => void;
}

export const ImageMarkerContext = createContext<ImageMarkerContextValue | null>(null);

export function useImageMarkerContext() {
    return useContext(ImageMarkerContext);
}
