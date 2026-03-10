"use client";
import { useResumeData } from "@/entities/resume/model/resumeDataContext";

export default function AboutSpecsMetricsBlock() {
    const { metrics } = useResumeData();
    const text = metrics[0]?.text ?? "";
    return (
        <div className="px-4 py-3" style={{ whiteSpace: "pre-wrap" }}>
            {text}
        </div>
    );
}
