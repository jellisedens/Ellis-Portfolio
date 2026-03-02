import { useState, useEffect } from "react";
import { get, post, put } from "../services/api";
import Modal from "./Modal";

const emptyForm = {
  title: "",
  summary: "",
  description: "",
  technologies: [],
  projectType: "",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
  status: "Completed",
  visible: true,
};

const projectTypes = ["Full-Stack", "Frontend", "Backend", "Mobile"];
const statuses = ["Completed", "In Progress"];

export default function ProjectModal({ project, onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSkills();
    if (project) {
      setForm({
        title: project.title,
        summary: project.summary,
        description: project.description,
        technologies: project.technologies?.map((t) => t._id || t) || [],
        projectType: project.projectType,
        githubUrl: project.githubUrl || "",
        liveUrl: project.liveUrl || "",
        imageUrl: project.imageUrl || "",
        status: project.status,
        visible: project.visible,
      });
    } else {
      setForm(emptyForm);
    }
  }, [project]);

  const fetchSkills = async () => {
    try {
      const data = await get("/skills");
      setSkills(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTechToggle = (skillId) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.includes(skillId)
        ? prev.technologies.filter((id) => id !== skillId)
        : [...prev.technologies, skillId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (project) {
        await put(`/projects/${project._id}`, form);
      } else {
        await post("/projects", form);
      }
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    const catName = skill.category?.name || "Other";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(skill);
    return acc;
  }, {});

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <Modal title={project ? "Edit Project" : "New Project"} onClose={onClose}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
            <select name="projectType" value={form.projectType} onChange={handleChange} required className={inputClass}>
              <option value="">Select...</option>
              {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
            <input type="text" name="summary" value={form.summary} onChange={handleChange} required placeholder="One-line summary" className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={5} className={inputClass}></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
            <input type="text" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
            <input type="text" name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="visible" checked={form.visible} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
            <label className="text-sm font-medium text-gray-700">Visible</label>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
          {Object.entries(skillsByCategory).map(([catName, catSkills]) => (
            <div key={catName} className="mb-3">
              <p className="text-xs font-medium text-gray-400 uppercase mb-1">{catName}</p>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <button
                    key={skill._id}
                    type="button"
                    onClick={() => handleTechToggle(skill._id)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      form.technologies.includes(skill._id)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            {saving ? "Saving..." : project ? "Update" : "Create"}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}