import { useState, useEffect } from "react";
import { get, post, put } from "../services/api";
import Modal from "./Modal";

const emptyForm = {
  company: "",
  jobTitle: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  highlights: "",
  technologies: [],
  visible: true,
};

export default function ExperienceModal({ experience, onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const toInputDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  useEffect(() => {
    fetchSkills();
    if (experience) {
      setForm({
        company: experience.company,
        jobTitle: experience.jobTitle,
        location: experience.location || "",
        startDate: toInputDate(experience.startDate),
        endDate: toInputDate(experience.endDate),
        description: experience.description,
        highlights: experience.highlights?.join("\n") || "",
        technologies: experience.technologies?.map((t) => t._id || t) || [],
        visible: experience.visible,
      });
    } else {
      setForm(emptyForm);
    }
  }, [experience]);

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

    const payload = {
      ...form,
      endDate: form.endDate || null,
      highlights: form.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
    };

    try {
      if (experience) {
        await put(`/experience/${experience._id}`, payload);
      } else {
        await post("/experience", payload);
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
    <Modal title={experience ? "Edit Experience" : "New Experience"} onClose={onClose}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input type="text" name="jobTitle" value={form.jobTitle} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input type="text" name="company" value={form.company} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Anderson, SC" className={inputClass} />
          </div>
          <div></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date (empty = current)</label>
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className={inputClass}></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (one per line)</label>
            <textarea name="highlights" value={form.highlights} onChange={handleChange} rows={5} placeholder="Built a REST API&#10;Led migration to React" className={inputClass}></textarea>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="visible" checked={form.visible} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
            <label className="text-sm font-medium text-gray-700">Visible</label>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
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
            {saving ? "Saving..." : experience ? "Update" : "Create"}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}