import { useState, useEffect } from "react";
import { post, put } from "../services/api";
import Modal from "./Modal";

const emptyForm = {
  name: "",
  slug: "",
  color: "#2563eb",
  icon: "",
  displayOrder: 0,
  visible: true,
};

export default function CategoryModal({ category, onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        slug: category.slug,
        color: category.color || "#2563eb",
        icon: category.icon || "",
        displayOrder: category.displayOrder || 0,
        visible: category.visible,
      });
    } else {
      setForm(emptyForm);
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "displayOrder" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (category) {
        await put(`/categories/${category._id}`, form);
      } else {
        await post("/categories", form);
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
    <Modal title={category ? "Edit Category" : "New Category"} onClose={onClose}>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input type="text" name="slug" value={form.slug} onChange={handleChange} required placeholder="e.g. frontend" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex items-center gap-3">
              <input type="color" name="color" value={form.color} onChange={handleChange} className="w-10 h-10 rounded cursor-pointer border-0" />
              <input type="text" name="color" value={form.color} onChange={handleChange} className={`flex-1 ${inputClass}`} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
            <input type="text" name="icon" value={form.icon} onChange={handleChange} placeholder="e.g. monitor, server" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
            <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} className={inputClass} />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" name="visible" checked={form.visible} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
            <label className="text-sm font-medium text-gray-700">Visible</label>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            {saving ? "Saving..." : category ? "Update" : "Create"}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}