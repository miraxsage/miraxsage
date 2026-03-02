"use client";
import {
    AboutCategoriesKeysRecursive,
    AboutCategoriesType,
    AboutCategory,
    findCategory,
} from "@/entities/resume/model/categories";
import { ReactNode } from "react";
import { useCatLabel } from "@/entities/resume/model/categoryLabels";
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
    const label = useCatLabel(category);
    return (
        <CustomAccordion
            withoutTransition={withoutTransition}
            className={className}
            icon={categoryObj.icon}
            title={label}
            onChange={onToggle}
            expanded={expanded}
        >
            {children}
        </CustomAccordion>
    );
}
