"use client";
import CustomBreadcrumbs, { CustomBreadcrumbsProps } from "@/shared/ui/Breadcrumbs";
import Thankfullness, { PageContentItem } from "./Thankfullness";
import { Box, Button, MenuItem, Theme, useMediaQuery, useTheme } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import __ from "@/shared/lib/i18n/translation";
import { useUiLabels } from "@/entities/ui-labels/model/uiLabelsContext";
import CustomAccordion from "@/shared/ui/Accordion";
import DescriptionTable, { DescriptionTableData } from "@/shared/ui/DescriptionTable";
import Link from "@/shared/ui/Link";
import type { ContactItem } from "@/widgets/landing/MainSlide";
import DynamicIcon from "@/shared/ui/DynamicIcon";
import CustomTextField from "@/shared/ui/TextInput";
import CustomCodeEditor from "@/shared/ui/CodeEditor";
import CustomScrollbar from "@/shared/ui/Scrollbar";
import { langs } from "@uiw/codemirror-extensions-langs";
import { useEffect, useRef, useState } from "react";
import { useAppearance, useScreenMode } from "@/shared/lib/store/appearanceSlice";
import { Base64 } from "@/shared/lib/base64";
import { FeedbackSending } from "./FeedbackSending";
import { AnimatePresence, motion } from "framer-motion";
import classes from "classnames";
import { RevealAsideMenuButton } from "@/widgets/layout/RevealAsideMenuButton";
import { getThemeColor } from "@/shared/lib/theme";
import { useRouter } from "next/navigation";
import SharePopup, { useSharePopup } from "@/shared/ui/SharePopup";

function contactData(contact: ContactItem, theme: Theme, ru: boolean): DescriptionTableData[number] {
    return [
        {
            title: ru ? contact.title_ru : contact.title_en,
            icon: (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        "& .MuiSvgIcon-root": {
                            fontSize: "20px",
                            marginRight: "8px",
                            color: getThemeColor("regularHoverIcon", theme),
                        },
                    }}
                >
                    <DynamicIcon svg={contact.icon_svg} name={contact.icon} />
                </Box>
            ),
        },
        <Link target="_blank" href={contact.url}>
            {contact.url.replace(/^mailto:/, "")}
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

export default function Contacts({ contacts, content }: { contacts: ContactItem[]; content: PageContentItem[] }) {
    const router = useRouter();
    const lang = useAppearance().language;
    const t = useUiLabels();
    const screenMode = useScreenMode();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down("md"));
    const sharePopup = useSharePopup();
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
    useEffect(() => {
        document.title = t("Interact") + " | Miraxsage";
    }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps
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
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        (async () => {
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
        })();
    };
    return (
        <Box sx={{ display: "grid", gridTemplateRows: "auto minmax(0, 1fr)", height: "100%", position: "relative" }}>
            {!md && (
                <Box sx={{ display: "flex", borderBottom: 1, borderColor: "divider" }}>
                    <RevealAsideMenuButton />
                    <CustomBreadcrumbs sx={{ padding: "6px 8px", margin: 0, flexGrow: 1, "& .MuiBreadcrumbs-ol": { justifyContent: "center" } }}>
                        {(() => {
                            const items = [
                                { label: "Miraxsage", link: "/" },
                                {
                                    label: t("Interact"),
                                    onClick: () => router.push("/interact"),
                                    subitems: [
                                        {
                                            label: t("Resume"),
                                            icon: <AssignmentIndIcon />,
                                            link: "/about",
                                        },
                                        {
                                            label: t("Portfolio"),
                                            icon: <RocketLaunchIcon />,
                                            link: "/projects",
                                        },
                                    ],
                                },
                            ];
                            return items as CustomBreadcrumbsProps["children"];
                        })()}
                    </CustomBreadcrumbs>
                </Box>
            )}
            <CustomScrollbar sx={{ gridArea: "2/1/2/1" }}>
                <Box sx={{ display: "grid", gridTemplate: "auto 1fr", minHeight: "100%" }}>
                    <Thankfullness content={content} />
                    <Box
                        sx={{
                            padding: "15px",
                            display: "grid",
                            gridTemplateColumns: "minmax(0, 600px) minmax(0, 1fr)",
                            gap: "20px",
                            alignItems: "center",
                            [theme.breakpoints.down("2xl")]: {
                                gridTemplateColumns: "minmax(0, 450px) minmax(0, 1fr)",
                            },
                            [theme.breakpoints.down("xl")]: {
                                gridTemplateColumns: "minmax(0, 363px) minmax(0, 1fr)",
                            },
                            [theme.breakpoints.down("lg")]: {
                                gridTemplateColumns: "minmax(0, 1fr)",
                            },
                        }}
                        className={classes({ "container mx-auto": screenMode.full })}
                    >
                        <div>
                            <CustomAccordion expandable={false} title={t("Social networks")}>
                                <Box sx={{ marginLeft: "-1px" }}>
                                    <DescriptionTable withoutBottomBorder={true} withoutTopBorder={true}>
                                        {contacts.filter((c) => c.type !== "share").map((c) => contactData(c, theme, lang === "ru"))}
                                    </DescriptionTable>
                                </Box>
                            </CustomAccordion>
                            {(() => {
                                const shareContact = contacts.find((c) => c.type === "share");
                                if (!shareContact) return null;
                                return (
                                    <>
                                        <Button
                                            variant="outlined"
                                            onClick={sharePopup.handleOpen}
                                            sx={{
                                                width: "100%",
                                                justifyContent: "center",
                                                gap: 1,
                                                borderColor: "divider",
                                                color: getThemeColor("regularText", theme),
                                                borderRadius: "6px",
                                                py: 1,
                                                "&:hover": {
                                                    borderColor: "divider",
                                                    background: getThemeColor("regularHoverBg", theme),
                                                },
                                                "& .MuiSvgIcon-root, & svg:not(.MuiSvgIcon-root)": {
                                                    fontSize: "20px",
                                                    color: getThemeColor("regularHoverIcon", theme),
                                                },
                                            }}
                                        >
                                            <DynamicIcon svg={shareContact.icon_svg} name={shareContact.icon} />
                                            {lang === "ru" ? shareContact.title_ru : shareContact.title_en}
                                        </Button>
                                        <SharePopup {...sharePopup} matchAnchorWidth />
                                    </>
                                );
                            })()}
                            <CustomAccordion expandable={false} title={t("Feedback")}>
                                <Box
                                    component="form"
                                    onSubmit={submit}
                                    sx={{
                                        padding: "15px",
                                        display: "flex",
                                        flexDirection: "column",
                                        "& > .MuiFormControl-root + *": { marginTop: "15px" },
                                    }}
                                >
                                    <CustomTextField
                                        size="small"
                                        name="name"
                                        label={t("Your name")}
                                        value={name}
                                        onChange={onFieldChange("name")}
                                        {...fieldValidationProps("name")}
                                    />
                                    <CustomTextField
                                        size="small"
                                        name="email"
                                        label={t("Email address")}
                                        value={email}
                                        onChange={onFieldChange("email")}
                                        {...fieldValidationProps("email")}
                                    />
                                    <CustomTextField
                                        size="small"
                                        name="subject"
                                        select
                                        label={t("Appeal's subject")}
                                        value={subject}
                                        onChange={onFieldChange("subject")}
                                        {...fieldValidationProps("subject")}
                                    >
                                        <MenuItem value={t("Partnership proposition")}>
                                            {t("Partnership proposition")}
                                        </MenuItem>
                                        <MenuItem value={t("Job offer")}>{t("Job offer")}</MenuItem>
                                        <MenuItem value={t("Thanks letter")}>{t("Thanks letter")}</MenuItem>
                                        <MenuItem value={t("Resume / portfolio question")}>
                                            {t("Resume / portfolio question")}
                                        </MenuItem>
                                        <MenuItem value={t("Other")}>{t("Other")}</MenuItem>
                                    </CustomTextField>
                                    <CustomTextField
                                        size="small"
                                        name="message"
                                        label={t("Message")}
                                        value={message}
                                        onChange={onFieldChange("message")}
                                        {...fieldValidationProps("message")}
                                        rows={3}
                                        multiline
                                    />
                                    <Button
                                        sx={{ margin: "0 auto", ":not(:hover)": { color: "inherit" } }}
                                        type="submit"
                                        onMouseEnter={() => setAccentedButton(true)}
                                        onMouseLeave={() => setAccentedButton(false)}
                                        color={accentedSubmit ? "primary" : "regular"}
                                        variant="outlined"
                                        onClick={submit}
                                    >
                                        {t("Submit")}
                                    </Button>
                                </Box>
                            </CustomAccordion>
                        </div>
                        {!md && (
                            <CustomCodeEditor
                                extensions={[langs["ts"]()]}
                                lineWrapping={true}
                                basicSetup={{ foldGutter: false, lineNumbers: false }}
                                value={`const data: Record<string, string> = {
    name: "${name}",
    email: "${email}",
    subject: "${subject}",
    message: "${message}" };
const body = Object.keys(data).reduce((acc, cur) => \`\${acc}\${acc && "&"}\${cur}=\${data[cur]}\`);
try {
    const res = await fetch(
        \`https://script.google.com/macros/s/AKfycbzYYk-OXS3GTDuVA5R_1UA2Q1hqovcL5gDmZzwQe5mvIvIcEgQJ4q5WiLtqSPfr2rmxCw/exec?\${body}\`
    );
    if (!res.ok) throw new Error("Bad request");
    const text = await res.text();
    const json = JSON.parse(text);
    if(json.success)
        throw new Error(json.message);
    return Boolean(json.success);
} catch (e) {
    if (e instanceof Error) return e.message;
    return "Error";
},
                    `}
                            />
                        )}
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

export const Component = Contacts;
