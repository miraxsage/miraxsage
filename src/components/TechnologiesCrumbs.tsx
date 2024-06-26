import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MusclesIcon from "@/components/icons/MusclesIcon";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CustomBreadcrumbs from "./Breadcrumbs";
import { TechnologiesList, technologies } from "./pages/About/Blocks/specs/Technologies";
import { Box, SxProps } from "@mui/material";
import { useThemeColor } from "./contexts/Theme";
import { useLanguage } from "@/store/appearanceSlice";

function Separator() {
    return <Box sx={{ color: useThemeColor("regularText"), opacity: 0.5 }}>+</Box>;
}

const wholeTechnologiesList = [...technologies.frontend, ...technologies.backend, ...technologies.desktop];

export default function TechnologiesCrumbs({
    techs,
    contrast,
    sx = {},
}: {
    contrast?: boolean;
    techs: TechnologiesList<"Techs">[] | TechnologiesList<"Cats">;
    sx?: SxProps;
}) {
    const techsItems =
        typeof techs == "string" ? technologies[techs] : wholeTechnologiesList.filter(([name]) => techs.includes(name));
    const lang = useLanguage();
    return (
        <CustomBreadcrumbs
            sx={{
                marginBottom: "0px",
                "& .MuiBreadcrumbs-ol": {
                    lineHeight: "32px",
                },
                ...sx,
            }}
            maxItems={20}
            separator={<Separator />}
            withoutExpandIcon={true}
        >
            {techsItems.map(([tech, datalink, Icon, , , , color]) => ({
                label: tech,
                iconColor: contrast ? color : undefined,
                icon: <Icon />,
                subitems: [
                    {
                        label: tech + (lang.ru ? "-проекты" : "-projects"),
                        icon: <RocketLaunchIcon />,
                        link: "/projects?techs=" + encodeURIComponent(tech.toLowerCase()),
                    },
                    {
                        label: tech + (lang.ru ? "-навыки" : "-skills"),
                        icon: <MusclesIcon />,
                        link: "/about/specifications/hard-skills",
                    },
                    {
                        label: lang.ru ? "Документация" : "Documentation",
                        icon: <MenuBookIcon />,
                        link: datalink,
                    },
                ],
            }))}
        </CustomBreadcrumbs>
    );
}
