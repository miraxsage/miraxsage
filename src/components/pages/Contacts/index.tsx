import CustomBreadcrumbs, { CustomBreadcrumbsProps } from "@/components/Breadcrumbs";
import Thankfullness from "./Thankfullness";
import { Box, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PersonIcon from "@mui/icons-material/Person";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import __ from "@/utilities/transtation";
import CustomAccordion from "@/components/Accordion";
import DescriptionTable, { DescriptionTableData } from "@/components/DescriptionTable";
import TelegramIcon from "@/components/icons/TelegramIcon";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "@/components/Link";
import { GitHub } from "@mui/icons-material";
import CustomTextField from "@/components/TextInput";
import CustomCodeEditor from "@/components/CodeEditor";
import CustomScrollbar from "@/components/Scrollbar";
import { langs } from "@uiw/codemirror-extensions-langs";
import { useRef, useState } from "react";
import { useAppearance } from "@/store/appearanceSlice";
import { capitalize } from "@/utilities/string";
import { Base64 } from "@/utilities/base64";
import { FeedbackSending } from "./FeedbackSending";
import { AnimatePresence, motion } from "framer-motion";

function contactData(title: string, Icon: React.FC, link: string): DescriptionTableData[number] {
    return [
        {
            title: title,
            icon: (
                <Box
                    sx={{
                        "& .MuiSvgIcon-root": {
                            fontSize: "20px",
                            marginRight: "8px",
                            marginTop: title == "GitHub" ? "-3px" : "0px",
                        },
                    }}
                >
                    {<Icon />}
                </Box>
            ),
        },
        <Link target="_blank" href={link}>
            {link.replace(/^mailto:/, "")}
        </Link>,
        { fullLine: true },
    ];
}

function validate(fields?: { name?: string; email?: string; subject?: string; message?: string }, lang?: string) {
    const errors = { name: "", email: "", subject: "", message: "", hasErrors: false };
    if (!fields) return errors;
    const requiredError = lang == "ru" ? "Поле «%» обязательно для заполнения" : "Field «%» is required";
    errors.name = fields.name ? "" : requiredError.replace("%", __("Your name"));
    errors.email = fields.email ? "" : requiredError.replace("%", __("Email address"));
    errors.subject = fields.subject ? "" : requiredError.replace("%", __("Appeal's subject"));
    errors.message = fields.message ? "" : requiredError.replace("%", __("Message"));
    if (
        !fields.email
            ?.toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    )
        errors.email = lang == "ru" ? "Неверный формат адреса электронной почты" : "Wrong email format";
    if (fields.message && fields.message.length > 650)
        errors.message =
            lang == "ru" ? "Максимальная длина сообщения 650 символов" : "Maximal length of message is 650 characters";
    return errors;
}

async function sendForm(fields: { name: string; email: string; subject: string; message: string }) {
    const body = (["email", "subject", "message", "name"] as const).reduce(
        (acc, cur) =>
            acc +
            (acc ? "&" : "") +
            cur +
            "=" +
            encodeURIComponent(cur.match(/email/) ? fields[cur] : Base64.encode(fields[cur])),
        ""
    );
    try {
        const res = await fetch(
            `https://script.google.com/macros/s/AKfycbzYYk-OXS3GTDuVA5R_1UA2Q1hqovcL5gDmZzwQw5mvIvIcEgQJ4Q5WiLtqSPfr2rmxCw/exec?${body}`
        );
        if (!res.ok) throw new Error("Bad request");
        const text = await res.text();
        const json = JSON.parse(text);
        return Boolean(json.success);
    } catch (e) {
        return false;
    }
}

export default function Contacts() {
    const navigate = useNavigate();
    const lang = useAppearance().language;
    const [accentedSubmit, setAccentedButton] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [feedback, setFeedback] = useState<
        { status: "loading" | "success" | "error"; message: string } | undefined
    >();
    const actualFeedback = useRef<{ status: "loading" | "success" | "error"; message: string } | undefined>();
    actualFeedback.current = feedback;
    const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});
    const validateField = (field: "name" | "email" | "subject" | "message", value?: string) => {
        if (!value) {
            if (errors[field]) setErrors({ ...errors, [field]: undefined });
            return;
        }
        const newErrors = validate({ [field]: value }, lang);
        if (errors[field] != newErrors[field]) setErrors({ ...errors, [field]: newErrors[field] });
    };
    const fieldValidationProps = (field: "name" | "email" | "subject" | "message") => {
        return {
            onFocus: () => validateField(field),
            onBlur: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                validateField(field, e.target.value),
            error: !!errors[field],
            helperText: errors[field],
        };
    };
    const onFieldChange =
        (field: "name" | "email" | "subject" | "message") =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = e.target.value;
            ({ name: setName, email: setEmail, subject: setSubject, message: setMessage })[field](value);
        };
    const submit = async () => {
        const fields = { name, email, subject, message };
        const errors = validate(fields, lang);
        if (errors.name || errors.email || errors.subject || errors.message) {
            setErrors(errors);
            return;
        }
        setFeedback({
            status: "loading",
            message: lang == "ru" ? "Выполняется отправка сообщения" : "Message submitting is being performed",
        });
        const res = await sendForm(fields);
        //const res = await new Promise((resolve) => setTimeout(() => resolve(true), 5000));
        if (actualFeedback.current) {
            if (res) {
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
            }
            setFeedback({
                status: res ? "success" : "error",
                message: res
                    ? lang == "ru"
                        ? "Ваше обращение успешно зарегистрировано"
                        : "Your request has been registered"
                    : lang == "ru"
                    ? "При выполнении запроса произошла ошибка. Пожалуйста попробуйте позже, либо свяжитесь со мной через Telegram или по электронной почте"
                    : "An error occurred while executing the request. Please try again later, or contact me via Telegram or Email",
            });
        }
    };
    return (
        <Box sx={{ display: "grid", gridTemplateRows: "auto minmax(0, 1fr)", height: "100%", position: "relative" }}>
            <CustomBreadcrumbs
                sx={{ padding: "6px 8px", margin: 0, flexGrow: 1, borderBottom: 1, borderColor: "divider" }}
            >
                {(() => {
                    const items = [
                        { label: "Miraxsage", link: "/" },
                        {
                            label: __("Interact"),
                            onClick: () => navigate("/interact"),
                            subitems: [
                                {
                                    label: __("Profile"),
                                    icon: <AssignmentIndIcon />,
                                    link: "/profile",
                                },
                                {
                                    label: __("About"),
                                    icon: <PersonIcon />,
                                    link: "/about",
                                },
                                {
                                    label: __("Projects"),
                                    icon: <RocketLaunchIcon />,
                                    link: "/projects",
                                },
                            ],
                        },
                    ];
                    return items as CustomBreadcrumbsProps["children"];
                })()}
            </CustomBreadcrumbs>
            <CustomScrollbar sx={{ gridArea: "2/1/2/1" }}>
                <Thankfullness />
                <Box
                    sx={{
                        padding: "15px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <CustomAccordion expandable={false} title="Социальные сети">
                            <Box sx={{ marginLeft: "-1px" }}>
                                <DescriptionTable withoutBottomBorder={true} withoutTopBorder={true}>
                                    {[
                                        contactData("Telegram", TelegramIcon, "https://t.me/miraxsage"),
                                        contactData("Email", AlternateEmailOutlinedIcon, "mailto:manin.maxim@mail.ru"),
                                        contactData(
                                            "LinkedIn",
                                            LinkedInIcon,
                                            "https://www.linkedin.com/in/manin-maxim-ba74a6221/"
                                        ),
                                        contactData("GitHub", GitHub, "https://github.com/miraxsage/"),
                                    ]}
                                </DescriptionTable>
                            </Box>
                        </CustomAccordion>
                        <CustomAccordion expandable={false} title="Обратная связь">
                            <Box
                                sx={{
                                    padding: "15px",
                                    display: "flex",
                                    flexDirection: "column",
                                    "& > .MuiFormControl-root + *": { marginTop: "15px" },
                                }}
                            >
                                <CustomTextField
                                    size="small"
                                    label={__("Your name")}
                                    value={name}
                                    onChange={onFieldChange("name")}
                                    {...fieldValidationProps("name")}
                                />
                                <CustomTextField
                                    size="small"
                                    label={capitalize(__("email address"))}
                                    value={email}
                                    onChange={onFieldChange("email")}
                                    {...fieldValidationProps("email")}
                                />
                                <CustomTextField
                                    size="small"
                                    select
                                    label={__("Appeal's subject")}
                                    value={subject}
                                    onChange={onFieldChange("subject")}
                                    {...fieldValidationProps("subject")}
                                >
                                    <MenuItem value={__("Partnership proposition")}>
                                        {__("Partnership proposition")}
                                    </MenuItem>
                                    <MenuItem value={__("Job offer")}>{__("Job offer")}</MenuItem>
                                    <MenuItem value={__("Thanks letter")}>{__("Thanks letter")}</MenuItem>
                                    <MenuItem value={capitalize(__("resume / portfolio question"))}>
                                        {capitalize(__("resume / portfolio question"))}
                                    </MenuItem>
                                    <MenuItem value={__("Other")}>{__("Other")}</MenuItem>
                                </CustomTextField>
                                <CustomTextField
                                    size="small"
                                    label={__("Message")}
                                    value={message}
                                    onChange={onFieldChange("message")}
                                    {...fieldValidationProps("message")}
                                    rows={3}
                                    multiline
                                />
                            </Box>
                        </CustomAccordion>
                    </div>
                    <Box
                        sx={{
                            display: "grid",
                            minHeight: "100%",
                            gridTemplateRows: "1fr auto",
                            alignItems: "center",
                            width: "50%",
                        }}
                    >
                        <CustomCodeEditor
                            extensions={[langs["typescript"]()]}
                            basicSetup={{ foldGutter: false, lineNumbers: false }}
                            value={`
<AccentedTreeView expandedNodes={["frontend"]} disableSelection={true}>
{[
    {
        id: "frontend",
        title: "Frontend",
        icon: <MarkupIcon />,
        children: [
            {
                id: "frontend-table-details",
                content: <TechnologiesTable data={frontendData} />,
            },
        ],
    },
                    `}
                        />
                        <Button
                            sx={{ margin: "0 auto" }}
                            onMouseEnter={() => setAccentedButton(true)}
                            onMouseLeave={() => setAccentedButton(false)}
                            color={accentedSubmit ? "primary" : "regular"}
                            variant="outlined"
                            onClick={submit}
                        >
                            Отправить
                        </Button>
                    </Box>
                </Box>
            </CustomScrollbar>
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        style={{ gridArea: "2/1/2/1" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <FeedbackSending
                            status={feedback.status}
                            message={feedback.message}
                            onClick={() => setFeedback(undefined)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}
