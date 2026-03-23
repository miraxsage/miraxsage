"use client";

import { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Button,
    TextField,
    Tabs,
    Tab,
    useTheme,
    IconButton,
    Checkbox,
    FormControlLabel,
    Alert,
    CircularProgress,
    MenuItem,
    Divider,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAdminData, useLocalizedField, AdminSection, AdminTabs, IconPickerButton, ProjectImageGrid, RichTextEditor, ImageMarkerNode, ImageMarkerPlugin, ImageDragPlugin, ImagePickerModal, ImageMarkerContext, ImageModal, dispatchImageInsert, dispatchSaveSelection } from "@/features/admin-editor";
import type { ProjectImage } from "@/entities/project/model/projectImage";
import UiLabelsEditor from "@/features/admin-editor/UiLabelsEditor";
import type { UiLabelItem } from "@/features/admin-editor/UiLabelsEditor";
import { __ } from "@/shared/lib/i18n";
import { getThemeColor } from "@/shared/lib/theme";
import iconMap from "@/shared/lib/iconMap";
import { ICON_MAP } from "@/entities/resume/model/iconMap";
import { useMuiIconsModule } from "@/shared/lib/muiIconsLoader";

const ALL_CUSTOM_ICONS: Record<string, React.FC> = { ...iconMap, ...ICON_MAP };

function DomainIconPreview({ icon }: { icon: string }) {
    const muiModule = useMuiIconsModule();
    if (!icon) return null;
    const Custom = ALL_CUSTOM_ICONS[icon] as React.ComponentType<{ fontSize?: string }> | undefined;
    if (Custom) return <Custom fontSize="small" />;
    const Mui = muiModule?.[icon];
    if (Mui) return <Mui fontSize="small" />;
    // Reserve space while MUI icons are loading
    return <Box sx={{ width: 20, height: 20, flexShrink: 0 }} />;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Technology {
    id: number;
    category_id: number;
    name_en: string;
    name_ru: string;
    docs_link: string;
    icon: string;
    skill_level: number;
    experience_years: number;
    projects_count: number;
    color: string;
    sort_order: number;
}

interface TechnologyCategory {
    id: number;
    slug: string;
    sort_order: number;
    label_en: string;
    label_ru: string;
    technologies: Technology[];
}

interface Project {
    id: number;
    slug: string;
    name_en: string;
    name_ru: string;
    short_name_en: string;
    short_name_ru: string;
    description_en: string;
    description_ru: string;
    domain: string;
    rating: number;
    year: number;
    status: string;
    participating: string;
    dev_time_months: number;
    github_link: string;
    site_link: string;
    media_id: string;
    content_en: string;
    content_ru: string;
    cover_brightness: number;
    sort_order: number;
    technologies: Technology[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let _nextTempId = -1;
function nextTempId() {
    return _nextTempId--;
}

function blankProject(): Project {
    return {
        id: nextTempId(),
        slug: "",
        name_en: "",
        name_ru: "",
        short_name_en: "",
        short_name_ru: "",
        description_en: "",
        description_ru: "",
        domain: "",
        rating: 0,
        year: new Date().getFullYear(),
        status: "active",
        participating: "",
        dev_time_months: 0,
        github_link: "",
        site_link: "",
        media_id: "",
        content_en: "",
        content_ru: "",
        cover_brightness: 50,
        sort_order: 0,
        technologies: [],
    };
}

// ---------------------------------------------------------------------------
// Content editor with image picker
// ---------------------------------------------------------------------------

function ProjectContentEditor({
    project,
    images,
    onContentChange,
    onBlur,
    onImagesChange,
}: {
    project: Project;
    images: ProjectImage[];
    onContentChange: (field: string, html: string) => void;
    onBlur: () => void;
    onImagesChange: (images: ProjectImage[]) => void;
}) {
    const { lang, lk } = useLocalizedField();
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [markerModalOpen, setMarkerModalOpen] = useState(false);
    const [markerModalIndex, setMarkerModalIndex] = useState(0);

    const handleMarkerClick = useCallback(
        (slug: string) => {
            const idx = images.findIndex((img) => img.slug === slug);
            if (idx >= 0) {
                setMarkerModalIndex(idx);
                setMarkerModalOpen(true);
            }
        },
        [images],
    );

    const markerCtx = useMemo(
        () => ({ images, mediaId: project.media_id, onImageClick: handleMarkerClick }),
        [images, project.media_id, handleMarkerClick],
    );

    return (
        <Box sx={{ gridColumn: { md: "1 / -1" }, mt: 1 }}>
            <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: menuText, mb: 1 }}
            >
                {__("Content", lang)}
            </Typography>
            <ImageMarkerContext.Provider value={markerCtx}>
                <RichTextEditor
                    key={lang}
                    value={project[lk("content") as "content_en" | "content_ru"] ?? ""}
                    onChange={(html) => onContentChange(lk("content"), html)}
                    onBlur={onBlur}
                    extraNodes={[ImageMarkerNode]}
                    extraPlugins={<><ImageMarkerPlugin /><ImageDragPlugin /></>}
                    toolbarExtra={
                        <>
                            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                            <IconButton
                                size="small"
                                onClick={() => { dispatchSaveSelection(); setPickerOpen(true); }}
                                sx={{
                                    color: theme.palette.primary.main,
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    borderRadius: 1,
                                }}
                            >
                                <ImageIcon fontSize="small" />
                            </IconButton>
                        </>
                    }
                />
            </ImageMarkerContext.Provider>
            <ImagePickerModal
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                images={images}
                mediaId={project.media_id}
                onSelect={(slug) => dispatchImageInsert(slug)}
            />
            <ImageModal
                open={markerModalOpen}
                onClose={() => setMarkerModalOpen(false)}
                projectId={project.id}
                mediaId={project.media_id}
                images={images}
                initialIndex={markerModalIndex}
                mode="view"
                onImagesChange={onImagesChange}
            />
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Projects Tab
// ---------------------------------------------------------------------------

function ProjectsTab() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const { lang, lk, lv } = useLocalizedField();

    const {
        data: projects,
        setData: setProjects,
        loading,
        error,
        success,
        refetch,
    } = useAdminData<Project[]>({ url: "/api/projects" });

    const projectsRef = useRef<Project[] | null>(null);
    projectsRef.current = projects;

    const [techCategories, setTechCategories] = useState<TechnologyCategory[]>([]);
    const [projectDomains, setProjectDomains] = useState<ProjectDomain[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [projectImages, setProjectImages] = useState<Record<number, ProjectImage[]>>({});
    const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({});
    const [savingCount, setSavingCount] = useState(0);
    const [saveIndicator, setSaveIndicator] = useState<"hidden" | "saving" | "success">("hidden");
    const saveTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    const [localError, setLocalError] = useState("");
    const [localSuccess, setLocalSuccess] = useState("");

    useEffect(() => {
        fetch("/api/technologies")
            .then((r) => r.json())
            .then((cats: TechnologyCategory[]) => setTechCategories(cats))
            .catch(() => {});
        fetch("/api/project-domains")
            .then((r) => r.json())
            .then((d: ProjectDomain[]) => setProjectDomains(d))
            .catch(() => {});
    }, []);

    const fetchProjectImages = useCallback((id: number) => {
        setLoadingImages((prev) => ({ ...prev, [id]: true }));
        fetch(`/api/projects/${id}/images`)
            .then((r) => r.json())
            .then((imgs) => setProjectImages((prev) => ({ ...prev, [id]: Array.isArray(imgs) ? imgs : imgs.data ?? [] })))
            .catch(() => {})
            .finally(() => setLoadingImages((prev) => ({ ...prev, [id]: false })));
    }, []);

    const toggleExpand = (id: number) => {
        setExpandedId((prev) => {
            const next = prev === id ? null : id;
            if (next !== null && id > 0 && !projectImages[id]) {
                fetchProjectImages(id);
            }
            return next;
        });
    };

    const updateField = (id: number, field: keyof Project, value: unknown) => {
        setProjects((prev) =>
            prev ? prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)) : prev,
        );
    };

    const toggleTech = (projectId: number, tech: Technology) => {
        setProjects((prev) =>
            prev
                ? prev.map((p) => {
                      if (p.id !== projectId) return p;
                      const has = p.technologies.some((t) => t.id === tech.id);
                      return {
                          ...p,
                          technologies: has
                              ? p.technologies.filter((t) => t.id !== tech.id)
                              : [...p.technologies, tech],
                      };
                  })
                : prev,
        );
    };

    const handleSave = async (project: Project) => {
        setSavingCount((c) => c + 1);
        saveTimersRef.current.forEach(clearTimeout);
        saveTimersRef.current = [];
        setSaveIndicator("saving");
        setLocalError("");
        setLocalSuccess("");
        try {
            const { technologies, ...rest } = project;
            const technologyIds = technologies.map((t) => t.id);
            const isNew = project.id < 0;
            const url = isNew ? "/api/projects" : `/api/projects/${project.id}`;
            const method = isNew ? "POST" : "PUT";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...rest, technology_ids: technologyIds }),
            });
            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                throw new Error(errBody?.error || "Failed to save project");
            }
            if (isNew) {
                setLocalSuccess(__("Project created", lang));
                setTimeout(() => setLocalSuccess(""), 3000);
                refetch();
            }
        } catch (err) {
            setLocalError(err instanceof Error ? err.message : __("Save failed", lang));
        } finally {
            setSavingCount((c) => {
                const next = c - 1;
                if (next === 0) {
                    const t1 = setTimeout(() => {
                        setSaveIndicator("success");
                        const t2 = setTimeout(() => setSaveIndicator("hidden"), 1500);
                        saveTimersRef.current.push(t2);
                    }, 400);
                    saveTimersRef.current.push(t1);
                }
                return next;
            });
        }
    };

    // Auto-save for existing projects: reads from projectsRef (current at blur time)
    const autoSaveProject = (id: number) => {
        if (!projectsRef.current) return;
        const project = projectsRef.current.find((p) => p.id === id);
        if (!project || project.id < 0) return;
        handleSave(project);
    };

    // Auto-save with a computed project (for checkbox onChange before state updates)
    const autoSaveProjectWith = (project: Project) => {
        if (project.id < 0) return;
        handleSave(project);
    };

    const handleDelete = async (id: number) => {
        if (id < 0) {
            setProjects((prev) => (prev ? prev.filter((p) => p.id !== id) : prev));
            return;
        }
        if (!confirm(__("Delete this project?", lang))) return;
        try {
            const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error(__("Delete failed", lang));
            refetch();
        } catch (err) {
            setLocalError(err instanceof Error ? err.message : __("Delete failed", lang));
        }
    };

    const handleAdd = () => {
        const p = blankProject();
        setProjects((prev) => (prev ? [...prev, p] : [p]));
        setExpandedId(p.id);
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 48px)" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <AnimatePresence>
                {saveIndicator !== "hidden" && (
                    <motion.div
                        key="save-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "fixed",
                            top: 16,
                            right: 16,
                            zIndex: 1300,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {saveIndicator === "saving" ? (
                                <motion.div
                                    key="spinner"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ display: "flex" }}
                                >
                                    <CircularProgress size={20} color="inherit" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="check"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    style={{ display: "flex" }}
                                >
                                    <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 24 }} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
            {(error || localError) && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error || localError}
                </Alert>
            )}
            {(success || localSuccess) && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success || localSuccess}
                </Alert>
            )}

            <Button
                variant="outlined"
                color="regular"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{ mb: 2 }}
            >
                {__("Add Project", lang)}
            </Button>

            {(projects ?? []).map((project) => {
                const isExpanded = expandedId === project.id;
                const isNew = project.id < 0;
                return (
                    <Accordion
                        key={project.id}
                        expanded={isExpanded}
                        onChange={() => {}}
                        disableGutters
                        slotProps={{ transition: { unmountOnExit: true } }}
                        sx={{
                            mb: 1,
                            background: getThemeColor("titleBg", theme),
                            boxShadow: "none",
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: "6px !important",
                            overflow: "hidden",
                            "&:before": { display: "none" },
                            "& .MuiAccordionSummary-root": { minHeight: "42px", padding: "0 14px", cursor: "default" },
                            "& .MuiAccordionSummary-content": { margin: "8px 0", width: "100%" },
                            "& .MuiAccordionDetails-root": {
                                padding: "12px",
                                background: getThemeColor("layoutBackground", theme),
                                borderTop: `1px solid ${theme.palette.divider}`,
                            },
                        }}
                    >
                        <AccordionSummary>
                            <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 1 }} onClick={(e) => e.stopPropagation()}>
                                <IconButton size="small" onClick={() => toggleExpand(project.id)} sx={{ flexShrink: 0, color: getThemeColor("regularIcon", theme) }}>
                                    {isExpanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                                </IconButton>
                                {(() => {
                                    const dom = projectDomains.find((d) => d.name_en === project.domain);
                                    return dom?.icon ? (
                                        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, color: getThemeColor("regularIcon", theme) }}>
                                            <DomainIconPreview icon={dom.icon} />
                                        </Box>
                                    ) : null;
                                })()}
                                <Typography
                                    onClick={() => toggleExpand(project.id)}
                                    sx={{ flex: "1 1 auto", fontSize: "1rem", cursor: "pointer", userSelect: "none" }}
                                >
                                    {lv(project, "name") || "(untitled)"}
                                </Typography>
                                <IconButton size="small" onClick={() => handleDelete(project.id)} sx={{ flexShrink: 0, color: getThemeColor("tabIcon", theme), "&:hover": { color: theme.palette.error.main } }}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    label={__("Name", lang)}
                                    size="small"
                                    fullWidth
                                    value={lv(project, "name")}
                                    onChange={(e) => updateField(project.id, lk("name") as keyof Project, e.target.value)}
                                    onBlur={() => autoSaveProject(project.id)}
                                />
                                <TextField
                                    label={__("Short Name", lang)}
                                    size="small"
                                    fullWidth
                                    value={lv(project, "short_name")}
                                    onChange={(e) =>
                                        updateField(project.id, lk("short_name") as keyof Project, e.target.value)
                                    }
                                    onBlur={() => autoSaveProject(project.id)}
                                />
                                <TextField
                                    label={__("Slug", lang)}
                                    size="small"
                                    fullWidth
                                    value={project.slug ?? ""}
                                    onChange={(e) => updateField(project.id, "slug", e.target.value)}
                                    onBlur={() => autoSaveProject(project.id)}
                                />
                                <TextField
                                    label={__("Domain", lang)}
                                    size="small"
                                    fullWidth
                                    select
                                    value={project.domain ?? ""}
                                    onChange={(e) => {
                                        updateField(project.id, "domain", e.target.value);
                                        if (project.id >= 0) {
                                            autoSaveProjectWith({ ...project, domain: e.target.value });
                                        }
                                    }}
                                    SelectProps={{
                                        renderValue: (val) => {
                                            const dom = projectDomains.find((d) => d.name_en === val);
                                            if (!dom) return val as string || "—";
                                            return (
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    {dom.icon && <DomainIconPreview icon={dom.icon} />}
                                                    {lv(dom, "name")}
                                                </Box>
                                            );
                                        },
                                    }}
                                >
                                    <MenuItem value="">—</MenuItem>
                                    {projectDomains.map((d) => (
                                        <MenuItem key={d.id} value={d.name_en} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            {d.icon && <DomainIconPreview icon={d.icon} />}
                                            {lv(d, "name")}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label={__("Description", lang)}
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    value={lv(project, "description")}
                                    onChange={(e) =>
                                        updateField(project.id, lk("description") as keyof Project, e.target.value)
                                    }
                                    onBlur={() => autoSaveProject(project.id)}
                                    sx={{ gridColumn: { md: "1 / -1" } }}
                                />
                                <TextField
                                    label={__("Year", lang)}
                                    size="small"
                                    type="number"
                                    value={project.year ?? 0}
                                    onChange={(e) =>
                                        updateField(project.id, "year", Number(e.target.value))
                                    }
                                    onBlur={() => autoSaveProject(project.id)}
                                />
                                <TextField
                                    label={__("Rating", lang)}
                                    size="small"
                                    type="number"
                                    value={project.rating ?? 0}
                                    onChange={(e) =>
                                        updateField(project.id, "rating", Number(e.target.value))
                                    }
                                    onBlur={() => autoSaveProject(project.id)}
                                />
                                <TextField
                                    label={__("Status", lang)}
                                    size="small"
                                    fullWidth
                                    select
                                    value={project.status ?? ""}
                                    onChange={(e) => {
                                        updateField(project.id, "status", e.target.value);
                                        if (project.id >= 0) {
                                            autoSaveProjectWith({ ...project, status: e.target.value });
                                        }
                                    }}
                                >
                                    <MenuItem value="developing">{__("Developing", lang)}</MenuItem>
                                    <MenuItem value="completed">{__("Completed", lang)}</MenuItem>
                                </TextField>
                                <TextField
                                    label={__("Participating", lang)}
                                    size="small"
                                    fullWidth
                                    select
                                    value={project.participating ?? ""}
                                    onChange={(e) => {
                                        updateField(project.id, "participating", e.target.value);
                                        if (project.id >= 0) {
                                            autoSaveProjectWith({ ...project, participating: e.target.value });
                                        }
                                    }}
                                >
                                    <MenuItem value="team">{__("Team", lang)}</MenuItem>
                                    <MenuItem value="selfown">{__("Selfown", lang)}</MenuItem>
                                </TextField>
                                <TextField
                                    label={__("Dev Time (months)", lang)}
                                    size="small"
                                    type="number"
                                    value={project.dev_time_months ?? 0}
                                    onChange={(e) =>
                                        updateField(
                                            project.id,
                                            "dev_time_months",
                                            Number(e.target.value),
                                        )
                                    }
                                    onBlur={() => autoSaveProject(project.id)}
                                />
                                <TextField
                                    label={__("GitHub Link", lang)}
                                    size="small"
                                    fullWidth
                                    value={project.github_link ?? ""}
                                    onChange={(e) =>
                                        updateField(project.id, "github_link", e.target.value)
                                    }
                                    onBlur={() => autoSaveProject(project.id)}
                                />
                                <TextField
                                    label={__("Site Link", lang)}
                                    size="small"
                                    fullWidth
                                    value={project.site_link ?? ""}
                                    onChange={(e) =>
                                        updateField(project.id, "site_link", e.target.value)
                                    }
                                    onBlur={() => autoSaveProject(project.id)}
                                />
<TextField
                                    label={__("Cover Brightness", lang)}
                                    size="small"
                                    fullWidth
                                    select
                                    value={project.cover_brightness ?? ""}
                                    onChange={(e) => {
                                        updateField(project.id, "cover_brightness", e.target.value);
                                        if (project.id >= 0) {
                                            autoSaveProjectWith({ ...project, cover_brightness: e.target.value as unknown as number });
                                        }
                                    }}
                                >
                                    <MenuItem value="">{__("Light cover", lang)}</MenuItem>
                                    <MenuItem value="dark">{__("Dark cover", lang)}</MenuItem>
                                </TextField>

                                {/* Technologies checkboxes */}
                                <Box sx={{ gridColumn: { md: "1 / -1" } }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600, color: menuText, mb: 1 }}
                                    >
                                        {__("Technologies", lang)}
                                    </Typography>
                                    {techCategories.map((cat) => (
                                        <Box
                                            key={cat.id}
                                            component="fieldset"
                                            sx={{
                                                mb: 1.5,
                                                border: `1px solid ${theme.palette.divider}`,
                                                borderRadius: "4px",
                                                padding: "2px 20px 8px",
                                                "& > legend": {
                                                    fontSize: "0.75em",
                                                    fontWeight: 400,
                                                    color: theme.palette.text.secondary,
                                                    textTransform: "none",
                                                    letterSpacing: "0.00938em",
                                                    padding: "0 5px",
                                                },
                                            }}
                                        >
                                            <legend>{lang === "en" ? cat.label_en : cat.label_ru}</legend>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 0.5,
                                                }}
                                            >
                                                {cat.technologies.map((tech) => {
                                                    const checked = project.technologies.some(
                                                        (t) => t.id === tech.id,
                                                    );
                                                    return (
                                                        <FormControlLabel
                                                            key={tech.id}
                                                            control={
                                                                <Checkbox
                                                                    size="small"
                                                                    checked={checked}
                                                                    onChange={() => {
                                                                        if (isNew) {
                                                                            toggleTech(project.id, tech);
                                                                            return;
                                                                        }
                                                                        const newTechs = checked
                                                                            ? project.technologies.filter((t) => t.id !== tech.id)
                                                                            : [...project.technologies, tech];
                                                                        const newProject = { ...project, technologies: newTechs };
                                                                        toggleTech(project.id, tech);
                                                                        autoSaveProjectWith(newProject);
                                                                    }}
                                                                />
                                                            }
                                                            label={lang === "en" ? tech.name_en : tech.name_ru}
                                                            sx={{
                                                                gap: 0.5,
                                                                "& .MuiTypography-root": {
                                                                    fontSize: "0.85rem",
                                                                },
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Image grid */}
                                {!isNew && project.media_id && (
                                    <Box sx={{ gridColumn: { md: "1 / -1" } }}>
                                        <ProjectImageGrid
                                            projectId={project.id}
                                            mediaId={project.media_id}
                                            images={projectImages[project.id] ?? []}
                                            onImagesChange={(imgs) =>
                                                setProjectImages((prev) => ({ ...prev, [project.id]: imgs }))
                                            }
                                            loading={!!loadingImages[project.id]}
                                        />
                                    </Box>
                                )}

                                {/* Content editor */}
                                {!isNew && project.media_id && (
                                    <ProjectContentEditor
                                        project={project}
                                        images={projectImages[project.id] ?? []}
                                        onContentChange={(field, html) =>
                                            updateField(project.id, field as keyof Project, html)
                                        }
                                        onBlur={() => autoSaveProject(project.id)}
                                        onImagesChange={(imgs) =>
                                            setProjectImages((prev) => ({ ...prev, [project.id]: imgs }))
                                        }
                                    />
                                )}

                                {/* Create button only for new projects */}
                                {isNew && (
                                    <Box sx={{ gridColumn: { md: "1 / -1" }, display: "flex", gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            color="regular"
                                            onClick={() => handleSave(project)}
                                            disabled={savingCount > 0}
                                            startIcon={savingCount > 0 ? <CircularProgress size={16} /> : undefined}
                                        >
                                            {savingCount > 0 ? __("Creating...", lang) : __("Create Project", lang)}
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Box>
    );
}

// ---------------------------------------------------------------------------
// General Labels Tab
// ---------------------------------------------------------------------------

function GeneralLabelsTab() {
    const { lang } = useLocalizedField();
    const { data: labelsRaw, setData: setLabelsRaw, saving: labelsSaving, error: labelsError, success: labelsSuccess, save: labelsSave, loading } = useAdminData<UiLabelItem[]>({
        url: "/api/ui-labels",
    });

    const labelsItems = labelsRaw ?? [];

    const updateLabel = (id: number | string, field: string, value: string) => {
        setLabelsRaw((prev) => {
            if (!prev) return prev;
            return prev.map((item) => (item.id === id ? { ...item, [field]: value } : item));
        });
    };

    const saveLabels = (items: UiLabelItem[]) => {
        const categoryItems = items.filter((it) => it.category === "projects_general");
        labelsSave({ category: "projects_general", data: categoryItems });
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 200px)" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <AdminSection
            title={__("General Labels", lang)}
            saving={labelsSaving}
            error={labelsError}
            success={labelsSuccess}
        >
            <UiLabelsEditor
                category="projects_general"
                items={labelsItems}
                onUpdate={updateLabel}
                onSave={saveLabels}
            />
        </AdminSection>
    );
}

// ---------------------------------------------------------------------------
// References Tab
// ---------------------------------------------------------------------------

const REFERENCES_PURPLE = "#8174AB";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useSubTabIndicator(tab: number, extraDeps: any[] = []) {
    const tabsRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [style, setStyle] = useState({ left: 0, width: 0 });

    const measure = useCallback(() => {
        const container = tabsRef.current;
        if (!container) return;
        const activeTab = container.querySelectorAll(".MuiTab-root")[tab] as HTMLElement | null;
        const scroller = container.querySelector(".MuiTabs-scroller") as HTMLElement | null;
        if (activeTab && scroller) {
            const scrollerRect = scroller.getBoundingClientRect();
            const tabRect = activeTab.getBoundingClientRect();
            const left = tabRect.left - scrollerRect.left;
            const width = tabRect.width;
            setStyle((prev) => (prev.left === left && prev.width === width ? prev : { left, width }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab, ...extraDeps]);

    const callbackRef = useCallback((node: HTMLDivElement | null) => {
        tabsRef.current = node;
        if (node) setMounted(true);
    }, []);

    useLayoutEffect(measure, [measure]);
    useEffect(() => {
        if (mounted) measure();
    }, [mounted, measure]);

    return { callbackRef, style };
}

interface ProjectDomain {
    id: number;
    name_en: string;
    name_ru: string;
    icon: string;
    sort_order: number;
}

let _nextDomainTempId = -1;

function ReferencesTab() {
    const theme = useTheme();
    const { lang } = useLocalizedField();
    const [subTab, setSubTab] = useState(0);
    const { callbackRef, style: indicatorStyle } = useSubTabIndicator(subTab, [lang]);

    return (
        <Box>
            <Box sx={{ position: "relative", mt: 0, mb: 2 }}>
                <Tabs
                    ref={callbackRef}
                    value={subTab}
                    onChange={(_, v) => setSubTab(v)}
                    TabIndicatorProps={{ style: { display: "none" } }}
                    sx={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
                        "& .Mui-selected": { color: `${REFERENCES_PURPLE} !important` },
                    }}
                >
                    <Tab label={__("Domains", lang)} />
                </Tabs>
                <motion.div
                    animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        height: 2,
                        backgroundColor: REFERENCES_PURPLE,
                        pointerEvents: "none",
                    }}
                />
            </Box>

            {subTab === 0 && <DomainsSection />}
        </Box>
    );
}

function DomainsSection() {
    const theme = useTheme();
    const { lang, lk, lv } = useLocalizedField();

    const {
        data: domains,
        setData: setDomains,
        loading,
        error,
        refetch,
    } = useAdminData<ProjectDomain[]>({ url: "/api/project-domains" });

    const domainsRef = useRef<ProjectDomain[] | null>(null);
    domainsRef.current = domains;

    const [savingId, setSavingId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [localError, setLocalError] = useState("");
    const [localSuccess, setLocalSuccess] = useState("");

    const updateField = (id: number, field: keyof ProjectDomain, value: unknown) => {
        setDomains((prev) =>
            prev ? prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)) : prev,
        );
    };

    const handleSave = async (domain: ProjectDomain) => {
        setSavingId(domain.id);
        setLocalError("");
        setLocalSuccess("");
        try {
            const isNew = domain.id < 0;
            const res = await fetch("/api/project-domains", {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(domain),
            });
            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                throw new Error(errBody?.error || __("Save failed", lang));
            }
            if (isNew) {
                setLocalSuccess(__("Domain created", lang));
                setTimeout(() => setLocalSuccess(""), 3000);
                refetch();
            }
        } catch (err) {
            setLocalError(err instanceof Error ? err.message : __("Save failed", lang));
        } finally {
            setSavingId(null);
        }
    };

    const autoSave = (id: number) => {
        if (!domainsRef.current) return;
        const domain = domainsRef.current.find((d) => d.id === id);
        if (!domain || domain.id < 0) return;
        handleSave(domain);
    };

    const handleDelete = async (id: number) => {
        if (id < 0) {
            setDomains((prev) => (prev ? prev.filter((d) => d.id !== id) : prev));
            return;
        }
        if (!confirm(__("Delete this domain?", lang))) return;
        setDeletingId(id);
        setLocalError("");
        setLocalSuccess("");
        try {
            const res = await fetch("/api/project-domains", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) throw new Error(__("Delete failed", lang));
            refetch();
        } catch (err) {
            setLocalError(err instanceof Error ? err.message : __("Delete failed", lang));
        } finally {
            setDeletingId(null);
        }
    };

    const handleAdd = () => {
        const d: ProjectDomain = { id: _nextDomainTempId--, name_en: "", name_ru: "", icon: "", sort_order: 0 };
        setDomains((prev) => (prev ? [...prev, d] : [d]));
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 200px)" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {(error || localError) && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error || localError}
                </Alert>
            )}
            {localSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {localSuccess}
                </Alert>
            )}

            <Box sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: "6px", overflow: "hidden" }}>
                {(domains ?? []).map((domain, i) => {
                    const isNew = domain.id < 0;
                    const isSaving = savingId === domain.id;
                    const isDeleting = deletingId === domain.id;
                    return (
                        <Box
                            key={domain.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                padding: "6px 12px",
                                borderTop: i > 0 ? `1px solid ${theme.palette.divider}` : "none",
                            }}
                        >
                            <IconPickerButton value={domain.icon} onChange={(v) => { updateField(domain.id, "icon", v); if (!isNew) { const d = { ...domain, icon: v }; handleSave(d); } }} />
                            <TextField
                                size="small"
                                fullWidth
                                placeholder={__("Name", lang)}
                                value={lv(domain, "name")}
                                onChange={(e) => updateField(domain.id, lk("name") as keyof ProjectDomain, e.target.value)}
                                onBlur={() => autoSave(domain.id)}
                                sx={{ flex: "1 1 auto" }}
                            />
                            {(isSaving || isDeleting) && <CircularProgress size={14} />}
                            {isNew && (
                                <Button
                                    variant="outlined"
                                    color="regular"
                                    size="small"
                                    onClick={() => handleSave(domain)}
                                    disabled={isSaving}
                                >
                                    {isSaving ? __("Creating...", lang) : __("Create", lang)}
                                </Button>
                            )}
                            <IconButton size="small" onClick={() => handleDelete(domain.id)} sx={{ flexShrink: 0, color: getThemeColor("tabIcon", theme), "&:hover": { color: theme.palette.error.main } }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    );
                })}
            </Box>

            <Button
                variant="outlined"
                color="regular"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{ mt: 1.5 }}
            >
                {__("Add Domain", lang)}
            </Button>
        </Box>
    );
}

export default function AdminProjectsPage() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const { lang } = useLocalizedField();
    const [tab, setTab] = useState(0);

    return (
        <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <RocketLaunchIcon sx={{ color: theme.palette.primary.main, fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: menuText }}>
                    {__("Projects", lang)}
                </Typography>
            </Box>

            <AdminTabs
                value={tab}
                onChange={setTab}
                labels={["List", "References", "General labels"]}
                lang={lang}
                sx={{ mb: tab === 1 ? 0 : 3 }}
            />

            {tab === 0 && <ProjectsTab />}
            {tab === 1 && <ReferencesTab />}
            {tab === 2 && <GeneralLabelsTab />}
        </Box>
    );
}
