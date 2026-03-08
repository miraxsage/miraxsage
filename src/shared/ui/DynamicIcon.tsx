"use client";
// Static registry of commonly used MUI icons — avoids loading the full 2MB module for the typical case
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WebhookIcon from "@mui/icons-material/Webhook";
import AssessmentIcon from "@mui/icons-material/Assessment";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import DataObjectIcon from "@mui/icons-material/DataObject";
import MessageIcon from "@mui/icons-material/Message";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponent = React.ElementType<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MUI_REGISTRY: Record<string, IconComponent> = {
    Person: PersonIcon as IconComponent,
    Badge: BadgeIcon as IconComponent,
    School: SchoolIcon as IconComponent,
    BusinessCenter: BusinessCenterIcon as IconComponent,
    ReceiptLong: ReceiptLongIcon as IconComponent,
    EmojiEvents: EmojiEventsIcon as IconComponent,
    Webhook: WebhookIcon as IconComponent,
    Assessment: AssessmentIcon as IconComponent,
    RocketLaunch: RocketLaunchIcon as IconComponent,
    PsychologyAlt: PsychologyAltIcon as IconComponent,
    Psychology: PsychologyIcon as IconComponent,
    Leaderboard: LeaderboardIcon as IconComponent,
    DataObject: DataObjectIcon as IconComponent,
    Message: MessageIcon as IconComponent,
};

interface DynamicIconProps {
    name?: string | null;
    /** Pre-rendered SVG string from server — renders directly, no MUI bundle needed */
    svg?: string | null;
    fontSize?: string;
}

export default function DynamicIcon({ name, svg, fontSize }: DynamicIconProps) {
    if (svg) {
        // display:contents removes the span box but CSS inheritance still works,
        // so font-size here propagates to the SVG's "1em" width/height.
        // Default 1.5rem matches MUI's SvgIcon default size.
        return (
            <span
                style={{ display: "contents", fontSize: fontSize ?? "1.5rem" }}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        );
    }
    if (!name) return null;
    const Icon = MUI_REGISTRY[name] ?? null;
    if (!Icon) return null;
    return <Icon fontSize={fontSize} />;
}
