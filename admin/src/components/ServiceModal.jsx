import { useState, useEffect } from "react";
import { get, post, put } from "../services/api";
import Modal from "./Modal";

const emptyForm = {
  title: "",
  slug: "",
  headline: "",
  description: "",
  icon: "",
  features: "",
  technologies: [],
  displayOrder: 0,
  featured: false,
  visible: true,
};

export default function ServiceModal({ service, onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSkills();
    if (service) {
      setForm({
        title: service.title,
        slug: service.slug,
        headline: service.headline,
        description: service.description,
        icon: service.icon || "",
        features: service.features?.join("\n") || "",
        technologies: service.technologies?.map((t) => t._id || t) || [],
        displayOrder: service.displayOrder || 0,
        featured: service.featured,
        visible: service.visible,
      });
    } else {
      setForm(emptyForm);
    }
  }, [service]);

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
      [name]: type === "checkbox" ? checked : name === "displayOrder" ? Number(value) : value,
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

    const payload = {
      ...form,
      features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
    };

    try {
      if (service) {
        await put(`/services/${service._id}`, payload);
      } else {
        await post("/services", payload);
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
    <Modal title={service ? "Edit Service" : "New Service"} onClose={onClose}>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input type="text" name="slug" value={form.slug} onChange={handleChange} required placeholder="e.g. web-development" className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
            <input type="text" name="headline" value={form.headline} onChange={handleChange} required placeholder="Client-facing problem statement" className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className={inputClass}></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
            <input type="text" name="icon" value={form.icon} onChange={handleChange} placeholder="e.g. code, trending-up" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
            <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
            <textarea name="features" value={form.features} onChange={handleChange} rows={6} placeholder="Custom React applications&#10;Node.js REST APIs&#10;MongoDB database design" className={inputClass}></textarea>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
              <label className="text-sm font-medium text-gray-700">Featured on Home</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="visible" checked={form.visible} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
              <label className="text-sm font-medium text-gray-700">Visible</label>
            </div>
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
            {saving ? "Saving..." : service ? "Update" : "Create"}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}