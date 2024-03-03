type Pages = "profile" | "about" | "projects" | "contacts";

type PagesIntegratorProps = {
    page: Pages;
};

import About from "./About";
import Profile from "./Profile";
import Projects from "./Projects";
import Contacts from "./Contacts";
import { useState } from "react";

export default function PagesIntegrator({ page }: PagesIntegratorProps) {
    const [loadedPages, setLoadedPages] = useState<
        PagesIntegratorProps["page"][]
    >([]);
    if (!loadedPages.includes(page)) setLoadedPages([...loadedPages, page]);
    const pages: [Pages, React.FC][] = [
        ["profile", Profile],
        ["about", About],
        ["projects", Projects],
        ["contacts", Contacts],
    ];
    return (
        <>
            {pages.map(([id, Page]) =>
                loadedPages.includes(id) || page == id ? (
                    <div
                        key={id}
                        className="h-full"
                        style={{ display: id == page ? "block" : "none" }}
                    >
                        <Page />
                    </div>
                ) : null
            )}
        </>
    );
}
