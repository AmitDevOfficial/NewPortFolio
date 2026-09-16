import { useState } from "react";
import "./admin.css";
import { builtInImages, builtInImageOptions, resolveProjectImage } from "../../data/projectsData";
import { loadProjects, saveProjects, resetProjects } from "../../utils/projectsStore";
import { defaultResume, getResumeSource } from "../../data/resumeData";
import { loadResume, saveResume, resetResume } from "../../utils/resumeStore";
import { builtInBrandImages, builtInBrandImageOptions, resolveBrandImage } from "../../data/brandsData";
import { loadBrands, saveBrands, resetBrands } from "../../utils/brandsStore";
import { builtInAboutImages, builtInAboutImageOptions, resolveAboutImage } from "../../data/aboutData";
import { loadAbout, saveAbout, resetAbout } from "../../utils/aboutStore";
import { builtInToolImages, builtInToolImageOptions, resolveToolImage } from "../../data/toolsData";
import { loadTools, saveTools, resetTools } from "../../utils/toolsStore";
import { loadHero, saveHero, resetHero } from "../../utils/heroStore";
import { builtInHeroImages, builtInHeroImageOptions, resolveHeroImage } from "../../data/heroData";
import { loadContact, saveContact, resetContact } from "../../utils/contactStore";
import { publishSection } from "../../utils/publish";

const ADMIN_PASSWORD = "amit@admin123";

function useSaveToast() {
    const [visible, setVisible] = useState(false);
    const trigger = () => {
        setVisible(true);
        setTimeout(() => setVisible(false), 1200);
    };
    return [visible, trigger];
}

function SaveToast({ visible }) {
    if (!visible) return null;
    return <div className="adminToast">Saved</div>;
}

function emptyProject() {
    return {
        id: `project-${Date.now()}`,
        tag: "",
        title: "",
        desc: "",
        tags: [],
        imgKey: "portfolioOne",
        imgUrl: "",
        link: "",
        featured: false
    };
}

function emptyBrand() {
    return {
        id: `brand-${Date.now()}`,
        imgKey: "brand01",
        imgUrl: "",
        alt: ""
    };
}

function emptyTool() {
    return {
        id: `tool-${Date.now()}`,
        imgKey: "html",
        imgUrl: "",
        label: ""
    };
}

function AdminLogin({ onSuccess }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            window.sessionStorage.setItem("admin_authed", "true");
            window.sessionStorage.setItem("admin_key", password);
            onSuccess();
        } else {
            setError("Wrong password.");
        }
    };

    return (
        <div className="adminLoginWrap">
            <form className="adminLoginCard" onSubmit={submit}>
                <h2>Admin Login</h2>
                <p>Enter the admin password to manage the Featured Work section.</p>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                />
                {error && <span className="adminError">{error}</span>}
                <button type="submit" className="adminBtnPrimary">Login</button>
            </form>
        </div>
    );
}

function ProjectEditor({ project, index, total, onChange, onDelete, onMove }) {

    const initialMode = project.imgUrl
        ? (project.imgUrl.startsWith("data:") ? "upload" : "url")
        : "gallery";
    const [imageMode, setImageMode] = useState(initialMode);
    const [uploadError, setUploadError] = useState("");
    const [tagsText, setTagsText] = useState(project.tags.join(", "));

    const update = (field, value) => {
        onChange({ ...project, [field]: value });
    };

    const handleTagsChange = (e) => {
        const text = e.target.value;
        setTagsText(text);
        update("tags", text.split(",").map((t) => t.trim()).filter(Boolean));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (file.size > 1.5 * 1024 * 1024) {
            setUploadError("Please choose an image under 1.5MB (it gets stored as text, large files bloat the site).");
            return;
        }
        setUploadError("");
        const reader = new FileReader();
        reader.onload = () => {
            onChange({ ...project, imgUrl: reader.result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="adminProjectCard">
            <div className="adminProjectHeader">
                <span>Project {index + 1}</span>
                <div className="adminProjectHeaderActions">
                    <button type="button" onClick={() => onMove(-1)} disabled={index === 0}>↑</button>
                    <button type="button" onClick={() => onMove(1)} disabled={index === total - 1}>↓</button>
                    <button type="button" className="adminDeleteBtn" onClick={onDelete}>Delete</button>
                </div>
            </div>

            <label>
                Category tag
                <input type="text" value={project.tag} onChange={(e) => update("tag", e.target.value)} placeholder="e.g. WordPress Development" />
            </label>

            <label>
                Title
                <input type="text" value={project.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Business & Portfolio Websites" />
            </label>

            <label>
                Description
                <textarea value={project.desc} onChange={(e) => update("desc", e.target.value)} rows={3} placeholder="Short description of this project type" />
            </label>

            <label>
                Tags (comma separated)
                <input
                    type="text"
                    value={tagsText}
                    onChange={handleTagsChange}
                    placeholder="WordPress, PHP, SEO"
                />
            </label>

            <label>
                Project link (optional — clicking the card opens this in a new tab)
                <input
                    type="text"
                    value={project.link || ""}
                    onChange={(e) => update("link", e.target.value)}
                    placeholder="https://example.com/project"
                />
            </label>

            <div className="adminImageSection">
                <span className="adminImageSectionLabel">Project image</span>

                <div className="adminImageTabs">
                    <button type="button" className={imageMode === "gallery" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("gallery")}>Gallery</button>
                    <button type="button" className={imageMode === "upload" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("upload")}>Upload from PC</button>
                    <button type="button" className={imageMode === "url" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("url")}>Image URL</button>
                </div>

                {imageMode === "gallery" && (
                    <div className="adminImageGallery">
                        {builtInImageOptions.map((opt) => (
                            <button
                                type="button"
                                key={opt.key}
                                className={(!project.imgUrl && project.imgKey === opt.key) ? "adminGalleryThumb active" : "adminGalleryThumb"}
                                onClick={() => onChange({ ...project, imgKey: opt.key, imgUrl: "" })}
                            >
                                <img src={builtInImages[opt.key]} alt={opt.label} />
                                <span>{opt.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                {imageMode === "upload" && (
                    <div className="adminImageUpload">
                        <input type="file" accept="image/*" onChange={handleFileUpload} />
                        <span className="adminUploadHint">Uploaded images are stored as embedded data (no server) — keep them small (under 1.5MB).</span>
                        {uploadError && <span className="adminError">{uploadError}</span>}
                    </div>
                )}

                {imageMode === "url" && (
                    <label>
                        Image URL
                        <input type="text" value={project.imgUrl.startsWith("data:") ? "" : project.imgUrl} onChange={(e) => update("imgUrl", e.target.value)} placeholder="https://example.com/image.jpg" />
                    </label>
                )}

                <div className="adminImagePreview">
                    <span>Current image:</span>
                    <img src={resolveProjectImage(project)} alt="Selected preview" />
                </div>
            </div>

            <label className="adminCheckboxLabel">
                <input type="checkbox" checked={project.featured} onChange={(e) => update("featured", e.target.checked)} />
                Always show (featured card, not hidden behind "More Projects")
            </label>
        </div>
    );
}

function BrandEditor({ brand, index, total, onChange, onDelete, onMove }) {

    const initialMode = brand.imgUrl
        ? (brand.imgUrl.startsWith("data:") ? "upload" : "url")
        : "gallery";
    const [imageMode, setImageMode] = useState(initialMode);
    const [uploadError, setUploadError] = useState("");

    const update = (field, value) => {
        onChange({ ...brand, [field]: value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (file.size > 1.5 * 1024 * 1024) {
            setUploadError("Please choose an image under 1.5MB (it gets stored as text, large files bloat the site).");
            return;
        }
        setUploadError("");
        const reader = new FileReader();
        reader.onload = () => {
            onChange({ ...brand, imgUrl: reader.result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="adminProjectCard">
            <div className="adminProjectHeader">
                <span>Logo {index + 1}</span>
                <div className="adminProjectHeaderActions">
                    <button type="button" onClick={() => onMove(-1)} disabled={index === 0}>↑</button>
                    <button type="button" onClick={() => onMove(1)} disabled={index === total - 1}>↓</button>
                    <button type="button" className="adminDeleteBtn" onClick={onDelete}>Delete</button>
                </div>
            </div>

            <label>
                Label (alt text)
                <input type="text" value={brand.alt} onChange={(e) => update("alt", e.target.value)} placeholder="e.g. University of Toronto" />
            </label>

            <div className="adminImageSection">
                <span className="adminImageSectionLabel">Logo image</span>

                <div className="adminImageTabs">
                    <button type="button" className={imageMode === "gallery" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("gallery")}>Gallery</button>
                    <button type="button" className={imageMode === "upload" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("upload")}>Upload from PC</button>
                    <button type="button" className={imageMode === "url" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("url")}>Image URL</button>
                </div>

                {imageMode === "gallery" && (
                    <div className="adminImageGallery">
                        {builtInBrandImageOptions.map((opt) => (
                            <button
                                type="button"
                                key={opt.key}
                                className={(!brand.imgUrl && brand.imgKey === opt.key) ? "adminGalleryThumb active" : "adminGalleryThumb"}
                                onClick={() => onChange({ ...brand, imgKey: opt.key, imgUrl: "" })}
                            >
                                <img src={builtInBrandImages[opt.key]} alt={opt.label} />
                                <span>{opt.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                {imageMode === "upload" && (
                    <div className="adminImageUpload">
                        <input type="file" accept="image/*" onChange={handleFileUpload} />
                        <span className="adminUploadHint">Uploaded images are stored as embedded data (no server) — keep them small (under 1.5MB).</span>
                        {uploadError && <span className="adminError">{uploadError}</span>}
                    </div>
                )}

                {imageMode === "url" && (
                    <label>
                        Image URL
                        <input type="text" value={brand.imgUrl.startsWith("data:") ? "" : brand.imgUrl} onChange={(e) => update("imgUrl", e.target.value)} placeholder="https://example.com/logo.png" />
                    </label>
                )}

                <div className="adminImagePreview">
                    <span>Current image:</span>
                    <img src={resolveBrandImage(brand)} alt="Selected preview" />
                </div>
            </div>
        </div>
    );
}

function ToolEditor({ tool, index, total, onChange, onDelete, onMove }) {

    const initialMode = tool.imgUrl
        ? (tool.imgUrl.startsWith("data:") ? "upload" : "url")
        : "gallery";
    const [imageMode, setImageMode] = useState(initialMode);
    const [uploadError, setUploadError] = useState("");

    const update = (field, value) => {
        onChange({ ...tool, [field]: value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (file.size > 1.5 * 1024 * 1024) {
            setUploadError("Please choose an image under 1.5MB (it gets stored as text, large files bloat the site).");
            return;
        }
        setUploadError("");
        const reader = new FileReader();
        reader.onload = () => {
            onChange({ ...tool, imgUrl: reader.result });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="adminProjectCard">
            <div className="adminProjectHeader">
                <span>Tool {index + 1}</span>
                <div className="adminProjectHeaderActions">
                    <button type="button" onClick={() => onMove(-1)} disabled={index === 0}>↑</button>
                    <button type="button" onClick={() => onMove(1)} disabled={index === total - 1}>↓</button>
                    <button type="button" className="adminDeleteBtn" onClick={onDelete}>Delete</button>
                </div>
            </div>

            <label>
                Label
                <input type="text" value={tool.label} onChange={(e) => update("label", e.target.value)} placeholder="e.g. React JS" />
            </label>

            <div className="adminImageSection">
                <span className="adminImageSectionLabel">Tool icon</span>

                <div className="adminImageTabs">
                    <button type="button" className={imageMode === "gallery" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("gallery")}>Gallery</button>
                    <button type="button" className={imageMode === "upload" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("upload")}>Upload from PC</button>
                    <button type="button" className={imageMode === "url" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("url")}>Image URL</button>
                </div>

                {imageMode === "gallery" && (
                    <div className="adminImageGallery">
                        {builtInToolImageOptions.map((opt) => (
                            <button
                                type="button"
                                key={opt.key}
                                className={(!tool.imgUrl && tool.imgKey === opt.key) ? "adminGalleryThumb active" : "adminGalleryThumb"}
                                onClick={() => onChange({ ...tool, imgKey: opt.key, imgUrl: "" })}
                            >
                                <img src={builtInToolImages[opt.key]} alt={opt.label} />
                                <span>{opt.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                {imageMode === "upload" && (
                    <div className="adminImageUpload">
                        <input type="file" accept="image/*" onChange={handleFileUpload} />
                        <span className="adminUploadHint">Uploaded images are stored as embedded data (no server) — keep them small (under 1.5MB).</span>
                        {uploadError && <span className="adminError">{uploadError}</span>}
                    </div>
                )}

                {imageMode === "url" && (
                    <label>
                        Image URL
                        <input type="text" value={tool.imgUrl.startsWith("data:") ? "" : tool.imgUrl} onChange={(e) => update("imgUrl", e.target.value)} placeholder="https://example.com/icon.png" />
                    </label>
                )}

                <div className="adminImagePreview">
                    <span>Current image:</span>
                    <img src={resolveToolImage(tool)} alt="Selected preview" />
                </div>
            </div>
        </div>
    );
}

const SECTIONS = [
    { key: "hero", label: "Hero Intro" },
    { key: "about", label: "About" },
    { key: "featuredWork", label: "Featured Work" },
    { key: "brands", label: "Trusted Technologies" },
    { key: "tools", label: "Tools I Use" },
    { key: "resume", label: "Resume" },
    { key: "contact", label: "Contact" }
];

function ContactPanel() {
    const [contact, setContact] = useState(() => loadContact());
    const [status, setStatus] = useState("");
    const [exportOpen, setExportOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [toastVisible, triggerToast] = useSaveToast();

    const handleSave = async () => {
        saveContact(contact);
        triggerToast();
        setStatus("Publishing...");
        try {
            await publishSection("contact", contact);
            setStatus("Published! It will be live for every visitor on every device in about a minute.");
        } catch (e) {
            setStatus(`Saved in this browser only — publishing failed: ${e.message}`);
        }
    };

    const handleReset = () => {
        resetContact();
        setContact(loadContact());
        setStatus("Reset to the default email.");
    };

    const exportCode = `export const defaultContact = ${JSON.stringify(contact, null, 4)};`;

    const copyExport = async () => {
        try {
            await navigator.clipboard.writeText(exportCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            setStatus("Could not copy automatically — please select and copy the text manually.");
        }
    };

    return (
        <>
            <div className="adminTopBar">
                <h2>Contact</h2>
            </div>

            <p className="adminHint">
                Save &amp; Publish previews the contact email instantly here, then commits it straight to the live site — every visitor on every device sees it within about a minute, no manual redeploy needed.
                Export Code below is just a manual backup if publishing ever fails.
            </p>

            {status && <div className="adminStatus">{status}</div>}

            <div className="adminActions">
                <button className="adminBtnPrimary" onClick={handleSave}>Save &amp; Publish</button>
                <SaveToast visible={toastVisible} />
                <button className="adminBtnGhost" onClick={handleReset}>Reset to Defaults</button>
                <button className="adminBtnGhost" onClick={() => setExportOpen((v) => !v)}>{exportOpen ? "Hide Export Code" : "Export Code"}</button>
            </div>

            {exportOpen && (
                <div className="adminExportPanel">
                    <textarea readOnly value={exportCode} rows={4} />
                    <button className="adminBtnPrimary" onClick={copyExport}>{copied ? "Copied!" : "Copy to Clipboard"}</button>
                </div>
            )}

            <div className="adminProjectCard">
                <label>
                    Contact email (used in the "Have a project in mind?" button and the footer icon)
                    <input type="text" value={contact.email} onChange={(e) => setContact({ email: e.target.value })} placeholder="you@example.com" />
                </label>
            </div>
        </>
    );
}

function HeroPanel() {
    const [hero, setHero] = useState(() => loadHero());
    const [imageMode, setImageMode] = useState(() => (loadHero().imgUrl ? (loadHero().imgUrl.startsWith("data:") ? "upload" : "url") : "gallery"));
    const [uploadError, setUploadError] = useState("");
    const [status, setStatus] = useState("");
    const [exportOpen, setExportOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [toastVisible, triggerToast] = useSaveToast();

    const update = (field, value) => {
        setHero((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (file.size > 1.5 * 1024 * 1024) {
            setUploadError("Please choose an image under 1.5MB (it gets stored as text, large files bloat the site).");
            return;
        }
        setUploadError("");
        const reader = new FileReader();
        reader.onload = () => {
            update("imgUrl", reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        saveHero(hero);
        triggerToast();
        setStatus("Publishing...");
        try {
            await publishSection("hero", hero);
            setStatus("Published! It will be live for every visitor on every device in about a minute.");
        } catch (e) {
            setStatus(`Saved in this browser only — publishing failed: ${e.message}`);
        }
    };

    const handleReset = () => {
        resetHero();
        setHero(loadHero());
        setImageMode("gallery");
        setStatus("Reset to the default intro text and image.");
    };

    const exportCode = `export const defaultHero = ${JSON.stringify(hero, null, 4)};`;

    const copyExport = async () => {
        try {
            await navigator.clipboard.writeText(exportCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            setStatus("Could not copy automatically — please select and copy the text manually.");
        }
    };

    return (
        <>
            <div className="adminTopBar">
                <h2>Hero Intro</h2>
            </div>

            <p className="adminHint">
                Save &amp; Publish previews the hero paragraph instantly here, then commits it straight to the live site — every visitor on every device sees it within about a minute, no manual redeploy needed.
                Export Code below is just a manual backup if publishing ever fails.
            </p>

            {status && <div className="adminStatus">{status}</div>}

            <div className="adminActions">
                <button className="adminBtnPrimary" onClick={handleSave}>Save &amp; Publish</button>
                <SaveToast visible={toastVisible} />
                <button className="adminBtnGhost" onClick={handleReset}>Reset to Defaults</button>
                <button className="adminBtnGhost" onClick={() => setExportOpen((v) => !v)}>{exportOpen ? "Hide Export Code" : "Export Code"}</button>
            </div>

            {exportOpen && (
                <div className="adminExportPanel">
                    <textarea readOnly value={exportCode} rows={6} />
                    <button className="adminBtnPrimary" onClick={copyExport}>{copied ? "Copied!" : "Copy to Clipboard"}</button>
                </div>
            )}

            <div className="adminProjectCard">
                <label>
                    Intro paragraph (shown under the typewriter role in the hero section)
                    <textarea
                        value={hero.paragraph}
                        onChange={(e) => update("paragraph", e.target.value)}
                        rows={5}
                    />
                </label>

                <div className="adminImageSection">
                    <span className="adminImageSectionLabel">Hero image (right side)</span>

                    <div className="adminImageTabs">
                        <button type="button" className={imageMode === "gallery" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("gallery")}>Gallery</button>
                        <button type="button" className={imageMode === "upload" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("upload")}>Upload from PC</button>
                        <button type="button" className={imageMode === "url" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("url")}>Image URL</button>
                    </div>

                    {imageMode === "gallery" && (
                        <div className="adminImageGallery">
                            {builtInHeroImageOptions.map((opt) => (
                                <button
                                    type="button"
                                    key={opt.key}
                                    className={(!hero.imgUrl && hero.imgKey === opt.key) ? "adminGalleryThumb active" : "adminGalleryThumb"}
                                    onClick={() => setHero((prev) => ({ ...prev, imgKey: opt.key, imgUrl: "" }))}
                                >
                                    <img src={builtInHeroImages[opt.key]} alt={opt.label} />
                                    <span>{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {imageMode === "upload" && (
                        <div className="adminImageUpload">
                            <input type="file" accept="image/*" onChange={handleFileUpload} />
                            <span className="adminUploadHint">Uploaded images are stored as embedded data (no server) — keep them small (under 1.5MB).</span>
                            {uploadError && <span className="adminError">{uploadError}</span>}
                        </div>
                    )}

                    {imageMode === "url" && (
                        <label>
                            Image URL
                            <input type="text" value={hero.imgUrl.startsWith("data:") ? "" : hero.imgUrl} onChange={(e) => update("imgUrl", e.target.value)} placeholder="https://example.com/photo.png" />
                        </label>
                    )}

                    <div className="adminImagePreview">
                        <span>Current image:</span>
                        <img src={resolveHeroImage(hero)} alt="Selected preview" />
                    </div>
                </div>
            </div>
        </>
    );
}

function FeaturedWorkPanel() {
    const [projects, setProjects] = useState(() => loadProjects());
    const [status, setStatus] = useState("");
    const [exportOpen, setExportOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [toastVisible, triggerToast] = useSaveToast();

    const updateProject = (index, updated) => {
        setProjects((prev) => prev.map((p, i) => (i === index ? updated : p)));
    };

    const deleteProject = (index) => {
        setProjects((prev) => prev.filter((_, i) => i !== index));
    };

    const moveProject = (index, dir) => {
        setProjects((prev) => {
            const next = [...prev];
            const target = index + dir;
            if (target < 0 || target >= next.length) return prev;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    };

    const addProject = () => {
        setProjects((prev) => [...prev, emptyProject()]);
    };

    const handleSave = async () => {
        saveProjects(projects);
        triggerToast();
        setStatus("Publishing...");
        try {
            await publishSection("featuredWork", projects);
            setStatus("Published! It will be live for every visitor on every device in about a minute.");
        } catch (e) {
            setStatus(`Saved in this browser only — publishing failed: ${e.message}`);
        }
    };

    const handleReset = () => {
        resetProjects();
        setProjects(loadProjects());
        setStatus("Reset to default projects.");
    };

    const exportCode = `export const defaultProjects = ${JSON.stringify(projects, null, 4)};`;

    const copyExport = async () => {
        try {
            await navigator.clipboard.writeText(exportCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            setStatus("Could not copy automatically — please select and copy the text manually.");
        }
    };

    return (
        <>
            <div className="adminTopBar">
                <h2>Featured Work</h2>
            </div>

            <p className="adminHint">
                Save &amp; Publish previews these projects instantly here, then commits them straight to the live site — every visitor on every device sees it within about a minute, no manual redeploy needed.
                Export Code below is just a manual backup if publishing ever fails.
            </p>

            {status && <div className="adminStatus">{status}</div>}

            <div className="adminActions">
                <button className="adminBtnPrimary" onClick={handleSave}>Save &amp; Publish</button>
                <SaveToast visible={toastVisible} />
                <button className="adminBtnGhost" onClick={handleReset}>Reset to Defaults</button>
                <button className="adminBtnGhost" onClick={() => setExportOpen((v) => !v)}>{exportOpen ? "Hide Export Code" : "Export Code"}</button>
            </div>

            {exportOpen && (
                <div className="adminExportPanel">
                    <textarea readOnly value={exportCode} rows={12} />
                    <button className="adminBtnPrimary" onClick={copyExport}>{copied ? "Copied!" : "Copy to Clipboard"}</button>
                </div>
            )}

            <div className="adminProjectsList">
                {projects.map((project, i) => (
                    <ProjectEditor
                        key={project.id}
                        project={project}
                        index={i}
                        total={projects.length}
                        onChange={(updated) => updateProject(i, updated)}
                        onDelete={() => deleteProject(i)}
                        onMove={(dir) => moveProject(i, dir)}
                    />
                ))}
            </div>

            <button className="adminBtnGhost adminAddBtn" onClick={addProject}>+ Add New Project</button>
        </>
    );
}

function BrandsPanel() {
    const [brands, setBrands] = useState(() => loadBrands());
    const [status, setStatus] = useState("");
    const [exportOpen, setExportOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [toastVisible, triggerToast] = useSaveToast();

    const updateBrand = (index, updated) => {
        setBrands((prev) => prev.map((b, i) => (i === index ? updated : b)));
    };

    const deleteBrand = (index) => {
        setBrands((prev) => prev.filter((_, i) => i !== index));
    };

    const moveBrand = (index, dir) => {
        setBrands((prev) => {
            const next = [...prev];
            const target = index + dir;
            if (target < 0 || target >= next.length) return prev;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    };

    const addBrand = () => {
        setBrands((prev) => [...prev, emptyBrand()]);
    };

    const handleSave = async () => {
        saveBrands(brands);
        triggerToast();
        setStatus("Publishing...");
        try {
            await publishSection("brands", brands);
            setStatus("Published! It will be live for every visitor on every device in about a minute.");
        } catch (e) {
            setStatus(`Saved in this browser only — publishing failed: ${e.message}`);
        }
    };

    const handleReset = () => {
        resetBrands();
        setBrands(loadBrands());
        setStatus("Reset to default logos.");
    };

    const exportCode = `export const defaultBrands = ${JSON.stringify(brands, null, 4)};`;

    const copyExport = async () => {
        try {
            await navigator.clipboard.writeText(exportCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            setStatus("Could not copy automatically — please select and copy the text manually.");
        }
    };

    return (
        <>
            <div className="adminTopBar">
                <h2>Trusted Technologies</h2>
            </div>

            <p className="adminHint">
                Save &amp; Publish previews these brands instantly here, then commits them straight to the live site — every visitor on every device sees it within about a minute, no manual redeploy needed.
                Export Code below is just a manual backup if publishing ever fails.
            </p>

            {status && <div className="adminStatus">{status}</div>}

            <div className="adminActions">
                <button className="adminBtnPrimary" onClick={handleSave}>Save &amp; Publish</button>
                <SaveToast visible={toastVisible} />
                <button className="adminBtnGhost" onClick={handleReset}>Reset to Defaults</button>
                <button className="adminBtnGhost" onClick={() => setExportOpen((v) => !v)}>{exportOpen ? "Hide Export Code" : "Export Code"}</button>
            </div>

            {exportOpen && (
                <div className="adminExportPanel">
                    <textarea readOnly value={exportCode} rows={12} />
                    <button className="adminBtnPrimary" onClick={copyExport}>{copied ? "Copied!" : "Copy to Clipboard"}</button>
                </div>
            )}

            <div className="adminProjectsList">
                {brands.map((brand, i) => (
                    <BrandEditor
                        key={brand.id}
                        brand={brand}
                        index={i}
                        total={brands.length}
                        onChange={(updated) => updateBrand(i, updated)}
                        onDelete={() => deleteBrand(i)}
                        onMove={(dir) => moveBrand(i, dir)}
                    />
                ))}
            </div>

            <button className="adminBtnGhost adminAddBtn" onClick={addBrand}>+ Add New Logo</button>
        </>
    );
}

function ToolsPanel() {
    const [tools, setTools] = useState(() => loadTools());
    const [status, setStatus] = useState("");
    const [exportOpen, setExportOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [toastVisible, triggerToast] = useSaveToast();

    const updateTool = (index, updated) => {
        setTools((prev) => prev.map((t, i) => (i === index ? updated : t)));
    };

    const deleteTool = (index) => {
        setTools((prev) => prev.filter((_, i) => i !== index));
    };

    const moveTool = (index, dir) => {
        setTools((prev) => {
            const next = [...prev];
            const target = index + dir;
            if (target < 0 || target >= next.length) return prev;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    };

    const addTool = () => {
        setTools((prev) => [...prev, emptyTool()]);
    };

    const handleSave = async () => {
        saveTools(tools);
        triggerToast();
        setStatus("Publishing...");
        try {
            await publishSection("tools", tools);
            setStatus("Published! It will be live for every visitor on every device in about a minute.");
        } catch (e) {
            setStatus(`Saved in this browser only — publishing failed: ${e.message}`);
        }
    };

    const handleReset = () => {
        resetTools();
        setTools(loadTools());
        setStatus("Reset to default tools.");
    };

    const exportCode = `export const defaultTools = ${JSON.stringify(tools, null, 4)};`;

    const copyExport = async () => {
        try {
            await navigator.clipboard.writeText(exportCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            setStatus("Could not copy automatically — please select and copy the text manually.");
        }
    };

    return (
        <>
            <div className="adminTopBar">
                <h2>Tools I Use</h2>
            </div>

            <p className="adminHint">
                Save &amp; Publish previews these tools instantly here, then commits them straight to the live site — every visitor on every device sees it within about a minute, no manual redeploy needed.
                Export Code below is just a manual backup if publishing ever fails.
            </p>

            {status && <div className="adminStatus">{status}</div>}

            <div className="adminActions">
                <button className="adminBtnPrimary" onClick={handleSave}>Save &amp; Publish</button>
                <SaveToast visible={toastVisible} />
                <button className="adminBtnGhost" onClick={handleReset}>Reset to Defaults</button>
                <button className="adminBtnGhost" onClick={() => setExportOpen((v) => !v)}>{exportOpen ? "Hide Export Code" : "Export Code"}</button>
            </div>

            {exportOpen && (
                <div className="adminExportPanel">
                    <textarea readOnly value={exportCode} rows={12} />
                    <button className="adminBtnPrimary" onClick={copyExport}>{copied ? "Copied!" : "Copy to Clipboard"}</button>
                </div>
            )}

            <div className="adminProjectsList">
                {tools.map((tool, i) => (
                    <ToolEditor
                        key={tool.id}
                        tool={tool}
                        index={i}
                        total={tools.length}
                        onChange={(updated) => updateTool(i, updated)}
                        onDelete={() => deleteTool(i)}
                        onMove={(dir) => moveTool(i, dir)}
                    />
                ))}
            </div>

            <button className="adminBtnGhost adminAddBtn" onClick={addTool}>+ Add New Tool</button>
        </>
    );
}

function AboutPanel() {
    const [about, setAbout] = useState(() => loadAbout());
    const [imageMode, setImageMode] = useState(() => (loadAbout().imgUrl ? (loadAbout().imgUrl.startsWith("data:") ? "upload" : "url") : "gallery"));
    const [uploadError, setUploadError] = useState("");
    const [status, setStatus] = useState("");
    const [exportOpen, setExportOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [toastVisible, triggerToast] = useSaveToast();

    const update = (field, value) => {
        setAbout((prev) => ({ ...prev, [field]: value }));
    };

    const updateParagraph = (index, value) => {
        setAbout((prev) => ({ ...prev, paragraphs: prev.paragraphs.map((p, i) => (i === index ? value : p)) }));
    };

    const addParagraph = () => {
        setAbout((prev) => ({ ...prev, paragraphs: [...prev.paragraphs, ""] }));
    };

    const deleteParagraph = (index) => {
        setAbout((prev) => ({ ...prev, paragraphs: prev.paragraphs.filter((_, i) => i !== index) }));
    };

    const moveParagraph = (index, dir) => {
        setAbout((prev) => {
            const next = [...prev.paragraphs];
            const target = index + dir;
            if (target < 0 || target >= next.length) return prev;
            [next[index], next[target]] = [next[target], next[index]];
            return { ...prev, paragraphs: next };
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (file.size > 1.5 * 1024 * 1024) {
            setUploadError("Please choose an image under 1.5MB (it gets stored as text, large files bloat the site).");
            return;
        }
        setUploadError("");
        const reader = new FileReader();
        reader.onload = () => {
            update("imgUrl", reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        saveAbout(about);
        triggerToast();
        setStatus("Publishing...");
        try {
            await publishSection("about", about);
            setStatus("Published! It will be live for every visitor on every device in about a minute.");
        } catch (e) {
            setStatus(`Saved in this browser only — publishing failed: ${e.message}`);
        }
    };

    const handleReset = () => {
        resetAbout();
        setAbout(loadAbout());
        setImageMode("gallery");
        setStatus("Reset to default About content.");
    };

    const exportCode = `export const defaultAbout = ${JSON.stringify(about, null, 4)};`;

    const copyExport = async () => {
        try {
            await navigator.clipboard.writeText(exportCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            setStatus("Could not copy automatically — please select and copy the text manually.");
        }
    };

    return (
        <>
            <div className="adminTopBar">
                <h2>About</h2>
            </div>

            <p className="adminHint">
                Save &amp; Publish previews the About section instantly here, then commits it straight to the live site — every visitor on every device sees it within about a minute, no manual redeploy needed.
                Export Code below is just a manual backup if publishing ever fails.
            </p>

            {status && <div className="adminStatus">{status}</div>}

            <div className="adminActions">
                <button className="adminBtnPrimary" onClick={handleSave}>Save &amp; Publish</button>
                <SaveToast visible={toastVisible} />
                <button className="adminBtnGhost" onClick={handleReset}>Reset to Defaults</button>
                <button className="adminBtnGhost" onClick={() => setExportOpen((v) => !v)}>{exportOpen ? "Hide Export Code" : "Export Code"}</button>
            </div>

            {exportOpen && (
                <div className="adminExportPanel">
                    <textarea readOnly value={exportCode} rows={10} />
                    <button className="adminBtnPrimary" onClick={copyExport}>{copied ? "Copied!" : "Copy to Clipboard"}</button>
                </div>
            )}

            <div className="adminProjectCard">
                <label>
                    Tag (small label above heading)
                    <input type="text" value={about.tag} onChange={(e) => update("tag", e.target.value)} placeholder="About Me" />
                </label>

                <label>
                    Heading
                    <input type="text" value={about.heading} onChange={(e) => update("heading", e.target.value)} placeholder="Inquisitive and passionate about emerging technology." />
                </label>

                <div className="adminImageSection">
                    <span className="adminImageSectionLabel">Paragraphs</span>
                    {about.paragraphs.map((para, i) => (
                        <div className="adminParagraphRow" key={i}>
                            <textarea value={para} onChange={(e) => updateParagraph(i, e.target.value)} rows={3} />
                            <div className="adminProjectHeaderActions">
                                <button type="button" onClick={() => moveParagraph(i, -1)} disabled={i === 0}>↑</button>
                                <button type="button" onClick={() => moveParagraph(i, 1)} disabled={i === about.paragraphs.length - 1}>↓</button>
                                <button type="button" className="adminDeleteBtn" onClick={() => deleteParagraph(i)}>Delete</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="adminBtnGhost" onClick={addParagraph}>+ Add Paragraph</button>
                </div>

                <div className="adminImageSection">
                    <span className="adminImageSectionLabel">About photo</span>

                    <div className="adminImageTabs">
                        <button type="button" className={imageMode === "gallery" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("gallery")}>Gallery</button>
                        <button type="button" className={imageMode === "upload" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("upload")}>Upload from PC</button>
                        <button type="button" className={imageMode === "url" ? "adminImageTab active" : "adminImageTab"} onClick={() => setImageMode("url")}>Image URL</button>
                    </div>

                    {imageMode === "gallery" && (
                        <div className="adminImageGallery">
                            {builtInAboutImageOptions.map((opt) => (
                                <button
                                    type="button"
                                    key={opt.key}
                                    className={(!about.imgUrl && about.imgKey === opt.key) ? "adminGalleryThumb active" : "adminGalleryThumb"}
                                    onClick={() => setAbout((prev) => ({ ...prev, imgKey: opt.key, imgUrl: "" }))}
                                >
                                    <img src={builtInAboutImages[opt.key]} alt={opt.label} />
                                    <span>{opt.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {imageMode === "upload" && (
                        <div className="adminImageUpload">
                            <input type="file" accept="image/*" onChange={handleFileUpload} />
                            <span className="adminUploadHint">Uploaded images are stored as embedded data (no server) — keep them small (under 1.5MB).</span>
                            {uploadError && <span className="adminError">{uploadError}</span>}
                        </div>
                    )}

                    {imageMode === "url" && (
                        <label>
                            Image URL
                            <input type="text" value={about.imgUrl.startsWith("data:") ? "" : about.imgUrl} onChange={(e) => update("imgUrl", e.target.value)} placeholder="https://example.com/photo.jpg" />
                        </label>
                    )}

                    <div className="adminImagePreview">
                        <span>Current image:</span>
                        <img src={resolveAboutImage(about)} alt="Selected preview" />
                    </div>
                </div>
            </div>
        </>
    );
}

function ResumePanel() {
    const [resume, setResume] = useState(() => loadResume());
    const [mode, setMode] = useState(() => getResumeSource(loadResume()));
    const [status, setStatus] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [exportOpen, setExportOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [toastVisible, triggerToast] = useSaveToast();

    const handleFileUpload = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (file.type !== "application/pdf") {
            setUploadError("Please choose a PDF file.");
            return;
        }
        if (file.size > 3 * 1024 * 1024) {
            setUploadError("Please choose a PDF under 3MB (it gets stored as text, large files bloat the site).");
            return;
        }
        setUploadError("");
        const reader = new FileReader();
        reader.onload = () => {
            setResume({ url: reader.result, fileName: file.name });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        saveResume(resume);
        triggerToast();
        setStatus("Publishing...");
        try {
            await publishSection("resume", resume);
            setStatus("Published! It will be live for every visitor on every device in about a minute.");
        } catch (e) {
            setStatus(`Saved in this browser only — publishing failed: ${e.message}`);
        }
    };

    const handleReset = () => {
        resetResume();
        setResume(defaultResume);
        setMode(getResumeSource(defaultResume));
        setStatus("Reset to the default resume file.");
    };

    const exportCode = `export const defaultResume = ${JSON.stringify(resume, null, 4)};`;

    const copyExport = async () => {
        try {
            await navigator.clipboard.writeText(exportCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            setStatus("Could not copy automatically — please select and copy the text manually.");
        }
    };

    return (
        <>
            <div className="adminTopBar">
                <h2>Resume</h2>
            </div>

            <p className="adminHint">
                Save &amp; Publish previews the "Download Resume" buttons instantly here, then commits the change straight to the live site — every visitor on every device sees it within about a minute, no manual redeploy needed.
                Export Code below is just a manual backup if publishing ever fails.
            </p>

            {status && <div className="adminStatus">{status}</div>}

            <div className="adminActions">
                <button className="adminBtnPrimary" onClick={handleSave}>Save &amp; Publish</button>
                <SaveToast visible={toastVisible} />
                <button className="adminBtnGhost" onClick={handleReset}>Reset to Defaults</button>
                <button className="adminBtnGhost" onClick={() => setExportOpen((v) => !v)}>{exportOpen ? "Hide Export Code" : "Export Code"}</button>
            </div>

            {exportOpen && (
                <div className="adminExportPanel">
                    <textarea readOnly value={exportCode} rows={8} />
                    <button className="adminBtnPrimary" onClick={copyExport}>{copied ? "Copied!" : "Copy to Clipboard"}</button>
                </div>
            )}

            <div className="adminProjectCard">
                <div className="adminImageSection">
                    <span className="adminImageSectionLabel">Resume file</span>

                    <div className="adminImageTabs">
                        <button type="button" className={mode === "default" ? "adminImageTab active" : "adminImageTab"} onClick={() => { setMode("default"); setResume(defaultResume); }}>Default File</button>
                        <button type="button" className={mode === "upload" ? "adminImageTab active" : "adminImageTab"} onClick={() => setMode("upload")}>Upload from PC</button>
                        <button type="button" className={mode === "url" ? "adminImageTab active" : "adminImageTab"} onClick={() => setMode("url")}>PDF URL</button>
                    </div>

                    {mode === "upload" && (
                        <div className="adminImageUpload">
                            <input type="file" accept="application/pdf" onChange={handleFileUpload} />
                            <span className="adminUploadHint">Uploaded PDFs are stored as embedded data (no server) — keep them small (under 3MB).</span>
                            {uploadError && <span className="adminError">{uploadError}</span>}
                        </div>
                    )}

                    {mode === "url" && (
                        <label>
                            PDF URL
                            <input
                                type="text"
                                value={resume.url.startsWith("data:") || resume.url.startsWith("/Resume/") ? "" : resume.url}
                                onChange={(e) => setResume({ url: e.target.value, fileName: resume.fileName || "resume.pdf" })}
                                placeholder="https://example.com/resume.pdf"
                            />
                        </label>
                    )}

                    <label>
                        Downloaded file name
                        <input
                            type="text"
                            value={resume.fileName}
                            onChange={(e) => setResume({ ...resume, fileName: e.target.value })}
                            placeholder="Amit-Vishwakarma-Resume.pdf"
                        />
                    </label>

                    <div className="adminImagePreview">
                        <span>Current file:</span>
                        <a href={resume.url} target="_blank" rel="noopener noreferrer" className="adminViewSiteLink">{resume.fileName || "View PDF"} ↗</a>
                    </div>
                </div>
            </div>
        </>
    );
}

function Dashboard({ onLogout }) {
    const [activeSection, setActiveSection] = useState("featuredWork");

    return (
        <div className="adminLayout">
            <aside className="adminSidebar">
                <div className="adminSidebarTitle">Admin Panel</div>
                <nav className="adminSidebarNav">
                    {SECTIONS.map((section) => (
                        <button
                            key={section.key}
                            className={activeSection === section.key ? "adminSidebarLink active" : "adminSidebarLink"}
                            onClick={() => setActiveSection(section.key)}
                        >
                            {section.label}
                        </button>
                    ))}
                </nav>
                <div className="adminSidebarFooter">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="adminViewSiteLink">View Site ↗</a>
                    <button className="adminSidebarLogout" onClick={onLogout}>Logout</button>
                </div>
            </aside>

            <main className="adminMain">
                {activeSection === "hero" && <HeroPanel />}
                {activeSection === "about" && <AboutPanel />}
                {activeSection === "featuredWork" && <FeaturedWorkPanel />}
                {activeSection === "brands" && <BrandsPanel />}
                {activeSection === "tools" && <ToolsPanel />}
                {activeSection === "resume" && <ResumePanel />}
                {activeSection === "contact" && <ContactPanel />}
            </main>
        </div>
    );
}

export default function AdminDashboard() {
    const [authed, setAuthed] = useState(() => window.sessionStorage.getItem("admin_authed") === "true");

    if (!authed) {
        return <AdminLogin onSuccess={() => setAuthed(true)} />;
    }

    const logout = () => {
        window.sessionStorage.removeItem("admin_authed");
        setAuthed(false);
    };

    return <Dashboard onLogout={logout} />;
}
