import { useState, useEffect } from "react";
import { get, del } from "../services/api";
import EducationCard from "../components/EducationCard";
import EducationModal from "../components/EducationModal";

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const data = await get("/education");
      setEducation(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (edu) => {
    setEditing(edu);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleSaved = () => {
    setShowModal(false);
    setEditing(null);
    fetchEducation();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this education entry?")) return;
    try {
      await del(`/education/${id}`);
      fetchEducation();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Education</h2>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Education
        </button>
      </div>

      <div className="space-y-3">
        {education.map((edu) => (
          <EducationCard key={edu._id} education={edu} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
        {education.length === 0 && (
          <p className="text-center text-gray-400 py-8">No education entries yet.</p>
        )}
      </div>

      {showModal && (
        <EducationModal education={editing} onClose={() => setShowModal(false)} onSaved={handleSaved} />
      )}
    </div>
  );
}