import { ReactContentProps } from "@/types/react";
import { ScopedCssBaseline } from "@mui/material";
import { useThemeColor } from "./Theme";

export default function CommonStylesContext({ children }: ReactContentProps) {
    return <ScopedCssBaseline sx={{ color: useThemeColor("regularText") }}>{children}</ScopedCssBaseline>;
}
