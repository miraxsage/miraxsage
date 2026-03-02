"use client";

import { useState, useEffect, useRef } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Card,
    CardContent,
    Tabs,
    Tab,
    useTheme,
    IconButton,
    Collapse,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Slider,
    Chip,
    Alert,
    CircularProgress,
    alpha,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import CodeIcon from "@mui/icons-material/Code";
import { useAdminData, useLocalizedField, AdminSection } from "@/features/admin-editor";
import UiLabelsEditor from "@/features/admin-editor/UiLabelsEditor";
import type { UiLabelItem } from "@/features/admin-editor/UiLabelsEditor";
import { __ } from "@/shared/lib/i18n";
import { getThemeColor } from "@/shared/lib/theme";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Technology {
    id: number;
    category_id: number;
    name: string;
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
    images_count: number;
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
        images_count: 0,
        cover_brightness: 50,
        sort_order: 0,
        technologies: [],
    };
}

function blankTechnology(categoryId: number): Technology {
    return {
        id: nextTempId(),
        category_id: categoryId,
        name: "",
        docs_link: "",
        icon: "",
        skill_level: 50,
        experience_years: 0,
        projects_count: 0,
        color: "#888888",
        sort_order: 0,
    };
}

// ---------------------------------------------------------------------------
// Projects Tab
// ---------------------------------------------------------------------------

function ProjectsTab() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const regularText = getThemeColor("regularText", theme);
    const barBg = getThemeColor("barBackground", theme);
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
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [savingId, setSavingId] = useState<number | null>(null);
    const [localError, setLocalError] = useState("");
    const [localSuccess, setLocalSuccess] = useState("");

    useEffect(() => {
        fetch("/api/technologies")
            .then((r) => r.json())
            .then((cats: TechnologyCategory[]) => setTechCategories(cats))
            .catch(() => {});
    }, []);

    const toggleExpand = (id: number) => {
        setExpandedId((prev) => (prev === id ? null : id));
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
        setSavingId(project.id);
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
            setSavingId(null);
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
                const isSaving = savingId === project.id;
                const isNew = project.id < 0;
                return (
                    <Card
                        key={project.id}
                        elevation={0}
                        sx={{
                            mb: 1.5,
                            border: `1px solid ${theme.palette.divider}`,
                            background: barBg,
                        }}
                    >
                        <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                            {/* Header row */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 1,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                                    <Typography sx={{ fontWeight: 600, color: menuText }}>
                                        {lv(project, "name") || "(untitled)"}
                                    </Typography>
                                    {project.slug && (
                                        <Chip
                                            label={project.slug}
                                            size="small"
                                            sx={{ fontSize: "0.75rem" }}
                                        />
                                    )}
                                    {project.year > 0 && (
                                        <Typography variant="body2" sx={{ color: regularText }}>
                                            {project.year}
                                        </Typography>
                                    )}
                                    {project.status && (
                                        <Chip
                                            label={project.status}
                                            size="small"
                                            color={project.status === "active" ? "success" : "default"}
                                            sx={{ fontSize: "0.7rem" }}
                                        />
                                    )}
                                    {isSaving && <CircularProgress size={14} />}
                                </Box>
                                <Box sx={{ display: "flex", gap: 0.5 }}>
                                    <IconButton size="small" onClick={() => toggleExpand(project.id)}>
                                        {isExpanded ? (
                                            <ExpandLessIcon fontSize="small" />
                                        ) : (
                                            <EditIcon fontSize="small" />
                                        )}
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(project.id)}
                                        sx={{ color: theme.palette.error.main }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* Expanded editor */}
                            <Collapse in={isExpanded}>
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                                        gap: 2,
                                    }}
                                >
                                    <TextField
                                        label={__("Slug", lang)}
                                        size="small"
                                        fullWidth
                                        value={project.slug ?? ""}
                                        onChange={(e) => updateField(project.id, "slug", e.target.value)}
                                        onBlur={() => autoSaveProject(project.id)}
                                    />
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
                                        label={__("Domain", lang)}
                                        size="small"
                                        fullWidth
                                        value={project.domain ?? ""}
                                        onChange={(e) => updateField(project.id, "domain", e.target.value)}
                                        onBlur={() => autoSaveProject(project.id)}
                                    />
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
                                        value={project.status ?? ""}
                                        onChange={(e) =>
                                            updateField(project.id, "status", e.target.value)
                                        }
                                        onBlur={() => autoSaveProject(project.id)}
                                    />
                                    <TextField
                                        label={__("Participating", lang)}
                                        size="small"
                                        fullWidth
                                        value={project.participating ?? ""}
                                        onChange={(e) =>
                                            updateField(project.id, "participating", e.target.value)
                                        }
                                        onBlur={() => autoSaveProject(project.id)}
                                    />
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
                                        label={__("Images Count", lang)}
                                        size="small"
                                        type="number"
                                        value={project.images_count ?? 0}
                                        onChange={(e) =>
                                            updateField(
                                                project.id,
                                                "images_count",
                                                Number(e.target.value),
                                            )
                                        }
                                        onBlur={() => autoSaveProject(project.id)}
                                    />
                                    <TextField
                                        label={__("Cover Brightness", lang)}
                                        size="small"
                                        type="number"
                                        value={project.cover_brightness ?? 50}
                                        onChange={(e) =>
                                            updateField(
                                                project.id,
                                                "cover_brightness",
                                                Number(e.target.value),
                                            )
                                        }
                                        onBlur={() => autoSaveProject(project.id)}
                                    />
                                    <TextField
                                        label={__("Sort Order", lang)}
                                        size="small"
                                        type="number"
                                        value={project.sort_order ?? 0}
                                        onChange={(e) =>
                                            updateField(
                                                project.id,
                                                "sort_order",
                                                Number(e.target.value),
                                            )
                                        }
                                        onBlur={() => autoSaveProject(project.id)}
                                    />

                                    {/* Technologies checkboxes */}
                                    <Box sx={{ gridColumn: { md: "1 / -1" } }}>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: 600, color: menuText, mb: 1 }}
                                        >
                                            {__("Technologies", lang)}
                                        </Typography>
                                        {techCategories.map((cat) => (
                                            <Box key={cat.id} sx={{ mb: 1.5 }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: regularText,
                                                        textTransform: "uppercase",
                                                        letterSpacing: 0.5,
                                                    }}
                                                >
                                                    {lang === "en" ? cat.label_en : cat.label_ru}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                        gap: 0.5,
                                                        mt: 0.5,
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
                                                                label={tech.name}
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

                                    {/* Create button only for new projects */}
                                    {isNew && (
                                        <Box sx={{ gridColumn: { md: "1 / -1" }, display: "flex", gap: 1 }}>
                                            <Button
                                                variant="outlined"
                                                color="regular"
                                                onClick={() => handleSave(project)}
                                                disabled={isSaving}
                                                startIcon={isSaving ? <CircularProgress size={16} /> : undefined}
                                            >
                                                {isSaving ? __("Creating...", lang) : __("Create Project", lang)}
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            </Collapse>
                        </CardContent>
                    </Card>
                );
            })}
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Technologies Tab
// ---------------------------------------------------------------------------

function TechnologiesTab() {
    const theme = useTheme();
    const menuText = getThemeColor("menuText", theme);
    const barBg = getThemeColor("barBackground", theme);
    const { lang } = useLocalizedField();

    const {
        data: categories,
        loading,
        error,
        refetch,
    } = useAdminData<TechnologyCategory[]>({ url: "/api/technologies" });

    const [editingTech, setEditingTech] = useState<Technology | null>(null);
    const [localError, setLocalError] = useState("");
    const [localSuccess, setLocalSuccess] = useState("");
    const [saving, setSaving] = useState(false);

    const allCategories = categories ?? [];

    const handleStartEdit = (tech: Technology) => {
        setEditingTech({ ...tech });
    };

    const handleAddTech = (categoryId: number) => {
        setEditingTech(blankTechnology(categoryId));
    };

    const handleCancelEdit = () => {
        setEditingTech(null);
    };

    const handleSaveTech = async (techData?: Technology) => {
        const t = techData ?? editingTech;
        if (!t) return;
        setSaving(true);
        setLocalError("");
        setLocalSuccess("");
        try {
            const isNew = t.id < 0;
            const res = await fetch("/api/technologies", {
                method: isNew ? "POST" : "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(t),
            });
            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                throw new Error(errBody?.error || __("Save failed", lang));
            }
            if (isNew) {
                setLocalSuccess(__("Technology created", lang));
                setTimeout(() => setLocalSuccess(""), 3000);
                setEditingTech(null);
                refetch();
            }
        } catch (err) {
            setLocalError(err instanceof Error ? err.message : __("Save failed", lang));
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteTech = async (id: number) => {
        if (!confirm(__("Delete this technology?", lang))) return;
        try {
            const res = await fetch("/api/technologies", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) throw new Error(__("Delete failed", lang));
            refetch();
        } catch (err) {
            setLocalError(err instanceof Error ? err.message : __("Delete failed", lang));
        }
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

            {allCategories.map((cat) => (
                <Box key={cat.id} sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1.5,
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: menuText }}>
                            {lang === "en" ? cat.label_en : cat.label_ru}
                        </Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            color="regular"
                            startIcon={<AddIcon />}
                            onClick={() => handleAddTech(cat.id)}
                        >
                            {__("Add Technology", lang)}
                        </Button>
                    </Box>

                    {cat.technologies.map((tech) => (
                        <Card
                            key={tech.id}
                            elevation={0}
                            sx={{
                                mb: 1,
                                border: `1px solid ${theme.palette.divider}`,
                                background: barBg,
                            }}
                        >
                            <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                                {editingTech && editingTech.id === tech.id ? (
                                    <TechEditForm
                                        tech={editingTech}
                                        setTech={setEditingTech}
                                        categories={allCategories}
                                        onSave={handleSaveTech}
                                        onClose={handleCancelEdit}
                                        saving={saving}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                                flex: 1,
                                            }}
                                        >
                                            {tech.icon && (
                                                <Box
                                                    component="span"
                                                    sx={{ fontSize: "1.1rem", lineHeight: 1 }}
                                                >
                                                    {tech.icon}
                                                </Box>
                                            )}
                                            <Typography
                                                sx={{ fontWeight: 500, color: menuText, fontSize: "0.9rem" }}
                                            >
                                                {tech.name}
                                            </Typography>
                                            <Chip
                                                label={`Skill: ${tech.skill_level}%`}
                                                size="small"
                                                sx={{ fontSize: "0.7rem" }}
                                            />
                                            <Chip
                                                label={`${tech.experience_years}y exp`}
                                                size="small"
                                                sx={{ fontSize: "0.7rem" }}
                                            />
                                            {tech.color && (
                                                <Box
                                                    sx={{
                                                        width: 14,
                                                        height: 14,
                                                        borderRadius: "50%",
                                                        background: tech.color,
                                                        border: `1px solid ${theme.palette.divider}`,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                        <Box sx={{ display: "flex", gap: 0.5 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleStartEdit(tech)}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDeleteTech(tech.id)}
                                                sx={{ color: theme.palette.error.main }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    {/* Inline new technology form */}
                    {editingTech && editingTech.id < 0 && editingTech.category_id === cat.id && (
                        <Card
                            elevation={0}
                            sx={{
                                mb: 1,
                                border: `1px dashed ${theme.palette.primary.main}`,
                                background: alpha(theme.palette.primary.main, 0.03),
                            }}
                        >
                            <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                                <TechEditForm
                                    tech={editingTech}
                                    setTech={setEditingTech}
                                    categories={allCategories}
                                    onSave={handleSaveTech}
                                    onClose={handleCancelEdit}
                                    saving={saving}
                                />
                            </CardContent>
                        </Card>
                    )}
                </Box>
            ))}
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Technology Edit Form (shared between edit & add)
// ---------------------------------------------------------------------------

function TechEditForm({
    tech,
    setTech,
    categories,
    onSave,
    onClose,
    saving,
}: {
    tech: Technology;
    setTech: (t: Technology | null) => void;
    categories: TechnologyCategory[];
    onSave: (techData?: Technology) => void;
    onClose: () => void;
    saving: boolean;
}) {
    const { lang } = useLocalizedField();
    const isNew = tech.id < 0;

    const update = (field: keyof Technology, value: unknown) => {
        setTech({ ...tech, [field]: value });
    };

    const updateAndSave = (field: keyof Technology, value: unknown) => {
        if (isNew) {
            update(field, value);
            return;
        }
        const newTech = { ...tech, [field]: value };
        setTech(newTech);
        onSave(newTech);
    };

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
                gap: 1.5,
                alignItems: "start",
            }}
        >
            <TextField
                label={__("Name", lang)}
                size="small"
                fullWidth
                value={tech.name ?? ""}
                onChange={(e) => update("name", e.target.value)}
                onBlur={() => !isNew && onSave()}
            />
            <FormControl size="small" fullWidth>
                <InputLabel>{__("Category", lang)}</InputLabel>
                <Select
                    value={tech.category_id}
                    label={__("Category", lang)}
                    onChange={(e) => updateAndSave("category_id", Number(e.target.value))}
                >
                    {categories.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                            {lang === "en" ? c.label_en : c.label_ru}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label={__("Docs Link", lang)}
                size="small"
                fullWidth
                value={tech.docs_link ?? ""}
                onChange={(e) => update("docs_link", e.target.value)}
                onBlur={() => !isNew && onSave()}
            />
            <TextField
                label={__("Icon", lang)}
                size="small"
                fullWidth
                value={tech.icon ?? ""}
                onChange={(e) => update("icon", e.target.value)}
                onBlur={() => !isNew && onSave()}
            />
            <Box>
                <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
                    {__("Skill Level", lang)}: {tech.skill_level}%
                </Typography>
                <Slider
                    value={tech.skill_level}
                    onChange={(_, val) => update("skill_level", val as number)}
                    onChangeCommitted={(_, val) => updateAndSave("skill_level", val as number)}
                    min={0}
                    max={100}
                    size="small"
                />
            </Box>
            <TextField
                label={__("Experience (years)", lang)}
                size="small"
                type="number"
                fullWidth
                value={tech.experience_years ?? 0}
                onChange={(e) => update("experience_years", Number(e.target.value))}
                onBlur={() => !isNew && onSave()}
            />
            <TextField
                label={__("Projects Count", lang)}
                size="small"
                type="number"
                fullWidth
                value={tech.projects_count ?? 0}
                onChange={(e) => update("projects_count", Number(e.target.value))}
                onBlur={() => !isNew && onSave()}
            />
            <TextField
                label={__("Color", lang)}
                size="small"
                fullWidth
                value={tech.color ?? ""}
                onChange={(e) => update("color", e.target.value)}
                onBlur={() => !isNew && onSave()}
                InputProps={{
                    startAdornment: (
                        <Box
                            sx={{
                                width: 16,
                                height: 16,
                                borderRadius: "50%",
                                background: tech.color || "#888",
                                mr: 1,
                                flexShrink: 0,
                            }}
                        />
                    ),
                }}
            />
            <TextField
                label={__("Sort Order", lang)}
                size="small"
                type="number"
                fullWidth
                value={tech.sort_order ?? 0}
                onChange={(e) => update("sort_order", Number(e.target.value))}
                onBlur={() => !isNew && onSave()}
            />
            <Box
                sx={{
                    gridColumn: { sm: "1 / -1" },
                    display: "flex",
                    gap: 1,
                    mt: 0.5,
                }}
            >
                {isNew ? (
                    <>
                        <Button
                            variant="outlined"
                            color="regular"
                            size="small"
                            onClick={() => onSave()}
                            disabled={saving}
                            startIcon={saving ? <CircularProgress size={14} /> : undefined}
                        >
                            {saving ? __("Creating...", lang) : __("Create", lang)}
                        </Button>
                        <Button variant="outlined" color="regular" size="small" onClick={onClose}>
                            {__("Cancel", lang)}
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="outlined"
                        color="regular"
                        size="small"
                        startIcon={saving ? <CircularProgress size={14} /> : <DoneIcon />}
                        onClick={onClose}
                        disabled={saving}
                    >
                        {saving ? __("Saving...", lang) : __("Done", lang)}
                    </Button>
                )}
            </Box>
        </Box>
    );
}

// ---------------------------------------------------------------------------
// Main Page
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
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
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
                    {__("Projects & Technologies", lang)}
                </Typography>
            </Box>

            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{
                    mb: 3,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
                }}
            >
                <Tab label={__("Projects", lang)} icon={<RocketLaunchIcon />} iconPosition="start" />
                <Tab label={__("Technologies", lang)} icon={<CodeIcon />} iconPosition="start" />
                <Tab label={__("General Labels", lang)} />
            </Tabs>

            {tab === 0 && <ProjectsTab />}
            {tab === 1 && <TechnologiesTab />}
            {tab === 2 && <GeneralLabelsTab />}
        </Box>
    );
}
