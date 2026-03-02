import { useState, useEffect } from "react";
import { post, put } from "../services/api";
import Modal from "./Modal";

const emptyForm = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  type: "",
  startDate: "",
  endDate: "",
  description: "",
  visible: true,
};

const typeOptions = ["Degree", "Bootcamp", "Certification", "Course"];

export default function EducationModal({ education, onClose, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const toInputDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  useEffect(() => {
    if (education) {
      setForm({
        institution: education.institution,
        degree: education.degree,
        fieldOfStudy: education.fieldOfStudy || "",
        type: education.type,
        startDate: toInputDate(education.startDate),
        endDate: toInputDate(education.endDate),
        description: education.description || "",
        visible: education.visible,
      });
    } else {
      setForm(emptyForm);
    }
  }, [education]);

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

    const payload = {
      ...form,
      endDate: form.endDate || null,
    };

    try {
      if (education) {
        await put(`/education/${education._id}`, payload);
      } else {
        await post("/education", payload);
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
    <Modal title={education ? "Edit Education" : "New Education"} onClose={onClose}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
            <input type="text" name="institution" value={form.institution} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree / Credential</label>
            <input type="text" name="degree" value={form.degree} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
            <input type="text" name="fieldOfStudy" value={form.fieldOfStudy} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select name="type" value={form.type} onChange={handleChange} required className={inputClass}>
              <option value="">Select...</option>
              {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
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
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass}></textarea>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="visible" checked={form.visible} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
            <label className="text-sm font-medium text-gray-700">Visible</label>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            {saving ? "Saving..." : education ? "Update" : "Create"}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}