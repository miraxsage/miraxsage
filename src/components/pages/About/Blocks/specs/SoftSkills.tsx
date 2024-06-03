import { Box, useMediaQuery } from "@mui/material";
import SoftSkillDescriptionBlock from "./SoftSkillDescriptionBlock";
import ResponsibilityStrokeIcon from "@/components/icons/ResponsibilityStrokeIcon";
import __ from "@/utilities/transtation";
import { capitalize } from "@/utilities/string";
import EducabilityStrokeIcon from "@/components/icons/EducabilityStrokeIcon";
import CreativeMindStrokeIcon from "@/components/icons/CreativeMindStrokeIcon";
import OpenabilityStrokeIcon from "@/components/icons/OpenabilityStrokeIcon";
import IntegrityStrokeIcon from "@/components/icons/IntegrityStrokeIcon";
import PassionStrokeIcon from "@/components/icons/PassionStrokeIcon";
import IssueSolvingStrokeIcon from "@/components/icons/IssueSolvingStrokeIcon";
import PersistenceStrokeIcon from "@/components/icons/PersistenceStrokeIcon";
import { useTheme } from "@mui/material";

const data = {
    responsibility: {
        description:
            "самостоятельно разработал серию больших проектов, по настоящий момент используемых в реальном производстве",
        icon: ResponsibilityStrokeIcon,
        level: [115, 123, 107],
    },
    educability: {
        description:
            "постоянно совершенствую личные знания и навыки, интересуюсь новыми технологиями и стараюсь их внедрять в собственные проекты",
        icon: EducabilityStrokeIcon,
        level: [95, 103, 87],
    },
    сreative_mind: {
        description:
            "люблю искать оптимальные и красивые решения тяжелых задач, создавать сложные интерфейсы и системные архитектуры",
        icon: CreativeMindStrokeIcon,
        level: [93, 97, 79],
    },
    openability: {
        description:
            "стараюсь находить общие взгляды и интересы, стремлюсь участвовать в командной работе создания больших проектов",
        icon: OpenabilityStrokeIcon,
        level: [95, 135, 112],
    },
    integrity: {
        description:
            "за продолжительное время практики имею только положительные отзывы касательно качества выполняемой работы и личного отношения",
        icon: IntegrityStrokeIcon,
        level: [81, 89, 65],
    },
    passion: {
        description: "не замечаю, как быстро проходит время при работе над интересным проектом",
        icon: PassionStrokeIcon,
        level: [110, 115, 99],
    },
    "issue solving": {
        description:
            "сложно вспомнить проблемы в разработке из личного опыта, которые в итоге остались без решения, прямым или косвенными методами всегда удавалось находить выход из той или иной ситуации",
        icon: IssueSolvingStrokeIcon,
        level: [125, 156, 129],
    },
    persistence: {
        description:
            "качество, когда при наличии нерешенной проблемы сложно остановиться в поиске ее решения, даже в ущерб переработкам",
        icon: PersistenceStrokeIcon,
        level: [141, 147, 131],
    },
};

export default function AboutSpecsSoftSkillsBlock() {
    const theme = useTheme();
    const twoCols = useMediaQuery(theme.breakpoints.up("2xl"));
    const divider = theme.palette.divider;
    return (
        <Box
            sx={{
                padding: "25px",
                display: "grid",
                gridTemplate: twoCols ? "1fr / 1fr 1fr" : "1fr / 1fr",
                gap: "25px",
                [theme.breakpoints.down("sm")]: {
                    padding: "6.5px",
                },
                [twoCols
                    ? "& .description-block:nth-of-type(even):not(:last-of-type) .connector"
                    : "& .description-block:not(:last-of-type) .connector"]: {
                    display: "block",
                    height: "25px",
                    width: twoCols ? "calc(100% + 25px)" : "50%",
                    position: "absolute",
                    bottom: "-25px",
                    right: twoCols ? "50%" : "25%",
                    "& > div": {
                        border: "1px solid " + divider,
                        width: "50%",
                        height: "calc(50% + 0.5px)",
                        position: "absolute",
                        "&:after": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: "5px",
                            height: "5px",
                            background: divider,
                            borderRadius: "50%",
                            zIndex: 1,
                        },
                    },
                    "& > div:first-of-type": {
                        borderBottomRightRadius: "10px",
                        borderWidth: "0px 1px 1px 0px",
                        right: 0,
                        "&:after": {
                            right: "-2.5px",
                            top: "-2.5px",
                        },
                    },
                    "& > div:last-of-type": {
                        borderTopLeftRadius: "10px",
                        borderWidth: "1px 0px 0px 1px",
                        left: 0,
                        bottom: 0,
                        "&:after": {
                            left: "-2.5px",
                            bottom: "-2.5px",
                        },
                    },
                },
                ...(twoCols
                    ? {
                          "& .description-block:nth-of-type(odd):not(:last-of-type) .connector": {
                              display: "block",
                              width: "25px",
                              position: "absolute",
                              top: "50%",
                              right: "-25px",
                              "& > div:first-of-type": {
                                  background: divider,
                                  width: "100%",
                                  height: "1px",
                                  position: "absolute",
                                  "&:after, &:before": {
                                      content: '""',
                                      display: "block",
                                      position: "absolute",
                                      width: "5px",
                                      height: "5px",
                                      background: divider,
                                      borderRadius: "50%",
                                      top: "-2px",
                                      zIndex: 1,
                                  },
                                  "&:before": {
                                      left: "-3px",
                                  },
                                  "&:after": {
                                      right: "-3px",
                                  },
                              },
                          },
                      }
                    : {}),
            }}
        >
            {Object.entries(data).map(
                (
                    [
                        key,
                        {
                            icon: Icon,
                            description,
                            level: [level, totalLevel, averageLevel],
                        },
                    ],
                    i
                ) => (
                    <Box key={key + i} className="description-block" sx={{ position: "relative" }}>
                        <SoftSkillDescriptionBlock
                            number={i + 1}
                            label={__(capitalize(key))}
                            description={description}
                            icon={<Icon />}
                            level={level}
                            totalLevel={totalLevel}
                            averageLevel={averageLevel}
                        />
                        <div className="connector">
                            <div></div>
                            <div></div>
                        </div>
                    </Box>
                )
            )}
        </Box>
    );
}
