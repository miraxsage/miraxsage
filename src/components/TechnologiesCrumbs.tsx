import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MusclesIcon from "@/components/icons/MusclesIcon";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CustomBreadcrumbs from "./Breadcrumbs";
import { TechnologiesList, technologies } from "./pages/About/Blocks/specs/Technologies";
import { Box, SxProps } from "@mui/material";
import { useThemeColor } from "./contexts/Theme";

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
                        label: tech + "-проекты",
                        icon: <RocketLaunchIcon />,
                        link: "/projects?techs=" + encodeURIComponent(tech.toLowerCase()),
                    },
                    {
                        label: tech + "-навыки",
                        icon: <MusclesIcon />,
                        link: "/about/specifications/hard-skills",
                    },
                    {
                        label: "Документация",
                        icon: <MenuBookIcon />,
                        link: datalink,
                    },
                ],
            }))}
        </CustomBreadcrumbs>
    );
}
