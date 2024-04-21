import { useState } from "react";
import CascadiaExtraLight from "@/assets/fonts/CascadiaCodePL-Light.woff2";
import { AppSpinner } from "./Spinners";

let AppComponent: React.FC | null = null;

export default function AppLoader() {
    const [loading, setLoading] = useState(true);
    if (loading) {
        (async () => {
            const [AppModule, CascadiaFont] = await Promise.all([
                import("@/components/App"),
                new FontFace("Cascadia", `url(${CascadiaExtraLight})`).load(),
            ]);
            AppComponent = AppModule.default;
            document.fonts.add(CascadiaFont);
            setLoading(false);
        })();
        return <AppSpinner />;
    }
    return AppComponent && <AppComponent />;
}
