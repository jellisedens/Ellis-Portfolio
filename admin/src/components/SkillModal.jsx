import { useState, useEffect } from "react";
import { get, post, put } from "../services/api";
import Modal from "./Modal";

const emptyForm = {
  name: "",
  category: "",
  visible: true,
};

export default function SkillModal({ skill, onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (skill) {
      setForm({
        name: skill.name,
        category: skill.category?._id || skill.category,
        visible: skill.visible,
      });
    } else {
      setForm(emptyForm);
    }
  }, [skill]);

  const fetchCategories = async () => {
    try {
      const data = await get("/categories");
      setCategories(data.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (skill) {
        await put(`/skills/${skill._id}`, form);
      } else {
        await post("/skills", form);
      }
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <Modal title={skill ? "Edit Skill" : "New Skill"} onClose={onClose}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} required className={inputClass}>
              <option value="">Select...</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="visible" checked={form.visible} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
            <label className="text-sm font-medium text-gray-700">Visible</label>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            {saving ? "Saving..." : skill ? "Update" : "Create"}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}