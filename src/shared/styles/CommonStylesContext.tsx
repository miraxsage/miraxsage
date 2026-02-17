"use client";

import { ReactContentProps } from "@/shared/types/react";
import { ScopedCssBaseline } from "@mui/material";
import { useThemeColor } from "@/shared/lib/theme";

export default function CommonStylesContext({ children }: ReactContentProps) {
    return <ScopedCssBaseline sx={{ color: useThemeColor("regularText") }}>{children}</ScopedCssBaseline>;
}
