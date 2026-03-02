import { useState, useEffect } from "react";
import { get, del } from "../services/api";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await get("/projects");
      setProjects(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditing(project);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleSaved = () => {
    setShowModal(false);
    setEditing(null);
    fetchProjects();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await del(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
        {projects.length === 0 && (
          <p className="text-center text-gray-400 py-8">No projects yet.</p>
        )}
      </div>

      {showModal && (
        <ProjectModal project={editing} onClose={() => setShowModal(false)} onSaved={handleSaved} />
      )}
    </div>
  );
}