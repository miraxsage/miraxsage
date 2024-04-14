import AccentedTreeView from "@/components/AccentedTreeView";
import DescriptionTable, { DescriptionTableRowOptions } from "@/components/DescriptionTable";
import __ from "@/utilities/transtation";
import BaseEducationIcon from "@/components/icons/BaseEducationIcon";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import UniversityIcon from "@/components/icons/UniversityIcon";
import HighEducationIcon from "@/components/icons/HighEducationIcon";
import AdditionalEducationIcon from "@/components/icons/AdditionalEducationIcon";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@/components/icons/SchoolIcon";

type Data = [string, string, DescriptionTableRowOptions?][];

const schoolData: Data = [
    [
        "[Full name|1]",
        "[Municipal budget educational institution Secondary general_education school] №14",
        { fullLine: true },
    ],
    ["[Region]", "[Krasnodar region]"],
    ["[City]", "[Forbidden 7]"],
    ["[Form of study]", "[Intramural]"],
    ["[Average score]", "[Score 4.3/5]"],
    ["[Senior year]", "2010"],
    ["[Classes]", "11"],
];
const universityData: Data = [
    [
        "[Full name|1]",
        "[Federal state budgetary educational institution of_higher education] «[Kuban state technological university]»",
        { fullLine: true },
    ],
    ["[Region]", "[Krasnodar region]"],
    ["[City]", "[Krasnodar]"],
    ["[Field of study specialty]", "09.03.01 [Informatics and computer science]"],
    ["[Average score]", "[Score 5/5]"],
    [
        "[Graduate work]",
        "[Development of a software package for distributed management of personal databases]",
        { fullLine: true, showLastInCompactMode: true },
    ],
    ["[Certificates]", "", { fullLine: true, showLastInCompactMode: true }],
    ["[Academic degree]", "[Bachelor's degree]"],
    ["[Form of study]", "[Intramural]"],
    ["[Senior year]", "2015"],
    ["[Diploma with honors]", "[Priority Connection]"],
];
const additionalData: Data = [
    [
        "[Full name|1]",
        "[Federal state budgetary educational institution of_higher education] «[Kuban state technological university]»",
        { fullLine: true },
    ],
    ["[Region]", "[Krasnodar region]"],
    ["[City]", "[Forbidden 7]"],
    [
        "[Field of study specialty]",
        "[Training in the pre-university education system in a technical field]",
        { fullLine: true },
    ],
    ["[Form of study]", "[Intramural]"],
    ["[Senior year]", "2010"],
];

function DataTable({ data, withoutBottomBorder = false }: { data: Data; withoutBottomBorder?: boolean }) {
    return <DescriptionTable withoutBottomBorder={withoutBottomBorder}>{data}</DescriptionTable>;
}

export default function AboutBioEducationBlock() {
    return (
        <>
            <AccentedTreeView
                expandedNodes={["general", "generalSges14", "high", "highTechnical", "highTechnicalKubSTU"]}
                selectionMode="disable"
            >
                {[
                    {
                        id: "general",
                        title: __("General"),
                        icon: <BaseEducationIcon />,
                        children: [
                            {
                                id: "generalSges14",
                                title: __("MBEI SGES") + " №14 (2000 - 2010)",
                                icon: <SchoolIcon />,
                                children: [
                                    {
                                        id: "generalSges14-details",
                                        content: <DataTable data={schoolData} />,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "high",
                        title: __("Higher"),
                        icon: <HighEducationIcon />,
                        children: [
                            {
                                id: "highTechnical",
                                title: __("Technical"),
                                icon: <MiscellaneousServicesIcon />,
                                children: [
                                    {
                                        id: "highTechnicalKubSTU",
                                        title: __(["FSBEI HE", " ", "Kub", "STU"]) + " (2011 - 2015)",
                                        icon: <UniversityIcon />,
                                        children: [
                                            {
                                                id: "highTechnicalKubSTU-details",
                                                content: <DataTable data={universityData} />,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: "additional",
                        title: __("Additional"),
                        icon: <AdditionalEducationIcon />,
                        children: [
                            {
                                id: "additionalKubSTU",
                                title: __(["FSBEI HE", " ", "Kub", "STU"]) + " (2010)",
                                icon: <VerifiedIcon />,
                                children: [
                                    {
                                        id: "additionalKubSTU-datails",
                                        content: <DataTable data={additionalData} withoutBottomBorder={true} />,
                                    },
                                ],
                            },
                        ],
                    },
                ]}
            </AccentedTreeView>
        </>
    );
}
