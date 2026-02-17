import MainLayout from "@/widgets/layout/MainLayout";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return <MainLayout>{children}</MainLayout>;
}
