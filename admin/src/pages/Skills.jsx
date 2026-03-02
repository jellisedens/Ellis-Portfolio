import { useState, useEffect } from "react";
import { get, del } from "../services/api";
import SkillCard from "../components/SkillCard";
import SkillModal from "../components/SkillModal";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await get("/skills");
      setSkills(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setEditing(skill);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleSaved = () => {
    setShowModal(false);
    setEditing(null);
    fetchSkills();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await del(`/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Skills</h2>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Skill
        </button>
      </div>

      <div className="space-y-3">
        {skills.map((skill) => (
          <SkillCard key={skill._id} skill={skill} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
        {skills.length === 0 && (
          <p className="text-center text-gray-400 py-8">No skills yet.</p>
        )}
      </div>

      {showModal && (
        <SkillModal skill={editing} onClose={() => setShowModal(false)} onSaved={handleSaved} />
      )}
    </div>
  );
}