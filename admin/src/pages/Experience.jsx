import { useState, useEffect } from "react";
import { get, del } from "../services/api";
import ExperienceCard from "../components/ExperienceCard";
import ExperienceModal from "../components/ExperienceModal";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await get("/experience");
      setExperiences(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (experience) => {
    setEditing(experience);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleSaved = () => {
    setShowModal(false);
    setEditing(null);
    fetchExperiences();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;
    try {
      await del(`/experience/${id}`);
      fetchExperiences();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Experience</h2>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <ExperienceCard key={exp._id} experience={exp} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
        {experiences.length === 0 && (
          <p className="text-center text-gray-400 py-8">No experience entries yet.</p>
        )}
      </div>

      {showModal && (
        <ExperienceModal experience={editing} onClose={() => setShowModal(false)} onSaved={handleSaved} />
      )}
    </div>
  );
}