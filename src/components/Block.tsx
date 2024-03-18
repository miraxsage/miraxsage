import {
    AboutCategoriesKeysRecursive,
    AboutCategoriesType,
    AboutCategory,
    findCategory,
} from "./pages/About/Categories";
import { ReactNode } from "react";
import __ from "@/utilities/transtation";
import { capitalize } from "@/utilities/string";
import CustomAccordion from "./Accordion";

interface AboutBlockProps {
    category: AboutCategoriesKeysRecursive<AboutCategoriesType>;
    children: ReactNode;
    expanded?: boolean;
    onToggle?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
    className?: string;
    withoutTransition?: boolean;
}

export default function AboutBlock({
    category,
    children,
    onToggle,
    expanded,
    className,
    withoutTransition = false,
}: AboutBlockProps) {
    const categoryObj: AboutCategory = findCategory(category);
    return (
        <CustomAccordion
            withoutTransition={withoutTransition}
            className={className}
            icon={categoryObj.icon}
            title={__(capitalize(category))}
            onChange={onToggle}
            expanded={expanded}
        >
            {children}
        </CustomAccordion>
    );
}
