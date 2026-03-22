"use client";

import StatsBlocks from "@/widgets/layout/InfoDrawer/StatsBlocks";
import { useInfoDrawerData } from "@/shared/lib/infoDrawerData";

export default function AboutSpecsMetricsBlock() {
    const data = useInfoDrawerData();

    if (!data.blocks || data.blocks.length === 0) return null;

    return (
        <div style={{ padding: "16px" }}>
            <StatsBlocks
                blocks={data.blocks}
                username={data.github_username}
            />
        </div>
    );
}
