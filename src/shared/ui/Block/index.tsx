"use client";
import {
    AboutCategoriesKeysRecursive,
    AboutCategoriesType,
    AboutCategory,
    findCategory,
} from "@/entities/resume/model/categories";
import { ReactNode } from "react";
import __ from "@/shared/lib/i18n/translation";
import { capitalize } from "@/shared/lib/string";
import CustomAccordion from "@/shared/ui/Accordion";

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
