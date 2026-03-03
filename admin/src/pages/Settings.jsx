import { useState, useEffect } from "react";
import { get, put } from "../services/api";

const colorFields = [
  { key: "colorPrimary", label: "Primary" },
  { key: "colorPrimaryDark", label: "Primary Dark" },
  { key: "colorPrimaryLight", label: "Primary Light" },
  { key: "colorAccent", label: "Accent" },
  { key: "colorCharcoal", label: "Charcoal (Dark BG)" },
  { key: "colorCharcoalLight", label: "Charcoal Light" },
  { key: "colorBackground", label: "Background" },
  { key: "colorSurface", label: "Surface (Cards)" },
  { key: "colorSurfaceAlt", label: "Surface Alt (Sections)" },
  { key: "colorText", label: "Text" },
  { key: "colorTextMuted", label: "Text Muted" },
  { key: "colorTextLight", label: "Text Light" },
  { key: "colorTextInverse", label: "Text Inverse" },
];

const fontOptions = [
  "Inter",
  "Source Code Pro",
  "DM Sans",
  "Poppins",
  "Work Sans",
  "Fira Code",
  "JetBrains Mono",
  "IBM Plex Mono",
  "Roboto",
  "Open Sans",
];

export default function Settings() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await get("/settings");
      setForm(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await put("/settings", form);
      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <p className="text-gray-500">Loading...</p>;

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Site Settings</h2>
        {saved && <span className="text-green-600 text-sm font-medium">Settings saved!</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Identity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Site Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input type="text" name="siteName" value={form.siteName} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
              <input type="text" name="siteTitle" value={form.siteTitle} onChange={handleChange} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Description</label>
              <textarea name="siteDescription" value={form.siteDescription} onChange={handleChange} rows={3} className={inputClass}></textarea>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
              <input type="url" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/..." className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input type="url" name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} placeholder="https://linkedin.com/in/..." className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
              <input type="url" name="twitterUrl" value={form.twitterUrl} onChange={handleChange} placeholder="https://twitter.com/..." className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
              <input type="url" name="websiteUrl" value={form.websiteUrl} onChange={handleChange} placeholder="https://..." className={inputClass} />
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Theme Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {colorFields.map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fonts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Typography</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading Font</label>
              <select name="fontHeading" value={form.fontHeading} onChange={handleChange} className={inputClass}>
                {fontOptions.map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: form.fontHeading }}>
                Preview: The quick brown fox jumps over the lazy dog
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body Font</label>
              <select name="fontBody" value={form.fontBody} onChange={handleChange} className={inputClass}>
                {fontOptions.map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: form.fontBody }}>
                Preview: The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}