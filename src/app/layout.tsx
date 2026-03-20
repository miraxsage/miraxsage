import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/shared/lib/store/StoreProvider";
import ThemeProvider from "@/shared/lib/theme/ThemeProvider";
import AppContent from "@/widgets/layout/AppContent";
import { CustomScrollbarStylesContainer } from "@/shared/ui/Scrollbar";
import CommonStylesContext from "@/shared/styles/CommonStylesContext";
import TranslationsProvider from "@/shared/lib/i18n/TranslationsProvider";
import { getTranslations } from "@/shared/lib/i18n/getTranslations";
import { cookies } from "next/headers";
import { defaultConfig } from "@/shared/lib/store/appearanceSlice";

export const metadata: Metadata = {
    title: "Miraxsage",
    description: "Miraxsage — Full-Stack Web Developer Portfolio",
    icons: {
        icon: [
            { url: "/darkIcon.svg", media: "(prefers-color-scheme: light)" },
            { url: "/lightIcon.svg", media: "(prefers-color-scheme: dark)" },
        ],
    },
};

async function getAppearanceFromCookies(): Promise<typeof defaultConfig> {
    try {
        const cookieStore = await cookies();
        const raw = cookieStore.get("appearanceConfig")?.value;
        if (!raw) return defaultConfig;
        const parsed = JSON.parse(decodeURIComponent(raw));
        return { ...defaultConfig, ...parsed };
    } catch {
        return defaultConfig;
    }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const translations = getTranslations();
    const appearance = await getAppearanceFromCookies();
    return (
        <html lang={appearance.language} suppressHydrationWarning>
            <body>
                <StoreProvider initialAppearance={appearance}>
                    <TranslationsProvider translations={translations}>
                        <ThemeProvider>
                            <CommonStylesContext>
                                <CustomScrollbarStylesContainer>
                                    <AppContent>{children}</AppContent>
                                </CustomScrollbarStylesContainer>
                            </CommonStylesContext>
                        </ThemeProvider>
                    </TranslationsProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
