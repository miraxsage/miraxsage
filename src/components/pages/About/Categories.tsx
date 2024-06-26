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
import MusclesIcon from "../../icons/MusclesIcon";
import { ReactNode } from "react";

export type AboutCategory = {
    icon?: ReactNode;
    items?: { [k: string]: AboutCategory };
};
export type AboutCategoriesInterface = Exclude<AboutCategory["items"], undefined>;

const categories = {
    biography: {
        icon: <PersonIcon />,
        items: {
            general: { icon: <BadgeIcon /> },
            education: {
                icon: <SchoolIcon />,
            },
            labor: { icon: <BusinessCenterIcon /> },
            questionaire: {
                icon: <ReceiptLongIcon />,
            },
        },
    },
    experience: {
        icon: <MusclesIcon />,
        items: {
            technologies: { icon: <WebhookIcon /> },
            achievements: { icon: <EmojiEventsIcon /> },
            projects: { icon: <RocketLaunchIcon /> },
        },
    },
    specifications: {
        icon: <AssessmentIcon />,
        items: {
            ["soft-skills"]: { icon: <PsychologyAltIcon /> },
            ["hard-skills"]: { icon: <PsychologyIcon /> },
            metrics: { icon: <LeaderboardIcon /> },
        },
    },
    snippets: {
        icon: <DataObjectIcon />,
    },
} satisfies AboutCategoriesInterface;

export default categories;

export type AboutCategoriesType = typeof categories;

export type AboutCategories = keyof AboutCategoriesType;

export type AboutContentfulCategories = Exclude<AboutCategories, "snippets">;

export type AboutSubCategories<K extends AboutContentfulCategories = AboutContentfulCategories> =
    AboutCategoriesKeysRecursive<AboutCategoriesType, K>;

export type AboutCategoriesKeysRecursive<T extends object, K extends keyof T = keyof T> = T extends {
    icon: unknown;
    items: unknown;
}
    ? T["items"] extends object
        ? AboutCategoriesKeysRecursive<T["items"]>
        : never
    : K extends string
    ? T[K] extends { icon: unknown; items: unknown }
        ? K | AboutCategoriesKeysRecursive<T[K]>
        : K
    : never;

export function findCategory(id: string, initialCats?: AboutCategoriesInterface) {
    const cats = Object.entries(initialCats || categories);
    let i = -1;
    while (++i < cats.length) {
        if (cats[i][0] == id) return cats[i][1];
        if (cats[i][1].items) cats.push(...Object.entries(cats[i][1].items));
    }
    return null;
}

export function hasSubcategories(cat: AboutCategories): cat is AboutContentfulCategories {
    return "items" in categories[cat];
}
