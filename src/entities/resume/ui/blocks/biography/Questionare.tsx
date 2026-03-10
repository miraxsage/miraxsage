"use client";
import AccentedTreeView from "@/shared/ui/AccentedTreeView";
import type { AccentedTreeItemProps } from "@/shared/ui/AccentedTreeView";
import DescriptionText from "@/shared/ui/DescriptionText";
import { useMediaQuery, useTheme } from "@mui/material";
import { useLanguage } from "@/shared/lib/store/appearanceSlice";
import { useResumeData } from "@/entities/resume/model/resumeDataContext";
import { ICON_MAP } from "@/entities/resume/model/iconMap";
import DynamicIcon from "@/shared/ui/DynamicIcon";

export default function AboutBioQuestionaireBlock() {
    const theme = useTheme();
    const lang = useLanguage();
    const lessSm = useMediaQuery(theme.breakpoints.down("sm"));
    const { questionnaireItems } = useResumeData();

    const items: AccentedTreeItemProps[] = questionnaireItems.map((item, index) => {
        const StaticIcon = item.icon ? ICON_MAP[item.icon] : undefined;
        const icon = StaticIcon
            ? <StaticIcon />
            : (item.icon || item.icon_svg)
            ? <DynamicIcon name={item.icon} svg={item.icon_svg} />
            : undefined;
        const question = lang.lang === "en" ? item.question_en : item.question_ru;
        const answer = lang.lang === "en" ? item.answer_en : item.answer_ru;
        const isLast = index === questionnaireItems.length - 1;

        return {
            id: `questionnaire_${item.id}`,
            title: question,
            icon,
            children: [
                {
                    id: `questionnaire_${item.id}_answer`,
                    content: (
                        <DescriptionText withoutBottomBorder={isLast}>
                            {answer}
                        </DescriptionText>
                    ),
                },
            ],
        };
    });

    const firstId = items[0]?.id;

    return (
        <>
            <AccentedTreeView
                intend={lessSm ? "small" : "regular"}
                initiallyExpandedNodes={firstId ? [firstId] : []}
                selectionMode="disable"
                sx={{
                    "ul.text-list li": {
                        listStyle: "outside",
                        margin: "0px 0px 10px 17px",
                    },
                }}
            >
                {items}
            </AccentedTreeView>
        </>
    );
}
