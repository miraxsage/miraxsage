import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/shared/lib/store/StoreProvider";
import ThemeProvider from "@/shared/lib/theme/ThemeProvider";
import AppContent from "@/widgets/layout/AppContent";
import { CustomScrollbarStylesContainer } from "@/shared/ui/Scrollbar";
import CommonStylesContext from "@/shared/styles/CommonStylesContext";
import TranslationsProvider from "@/shared/lib/i18n/TranslationsProvider";
import { getTranslations } from "@/shared/lib/i18n/getTranslations";
import AppHydration from "@/shared/lib/store/AppHydration";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const translations = getTranslations();
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <StoreProvider>
                    <AppHydration>
                        <TranslationsProvider translations={translations}>
                            <ThemeProvider>
                                <CommonStylesContext>
                                    <CustomScrollbarStylesContainer>
                                        <AppContent>{children}</AppContent>
                                    </CustomScrollbarStylesContainer>
                                </CommonStylesContext>
                            </ThemeProvider>
                        </TranslationsProvider>
                    </AppHydration>
                </StoreProvider>
            </body>
        </html>
    );
}
