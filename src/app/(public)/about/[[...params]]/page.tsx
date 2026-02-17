import About from "@/entities/resume/ui/About";

export function generateStaticParams() {
    const categories = {
        biography: ["general", "education", "labor", "questionaire"],
        experience: ["technologies", "achievements", "projects"],
        specifications: ["soft-skills", "hard-skills", "metrics"],
        snippets: [],
    };

    const params: Array<{ params: string[] }> = [
        { params: [] }, // /about
    ];

    for (const [cat, blocks] of Object.entries(categories)) {
        params.push({ params: [cat] }); // /about/biography
        for (const block of blocks) {
            params.push({ params: [cat, block] }); // /about/biography/general
        }
    }

    return params;
}

export default function AboutPage() {
    return <About />;
}
