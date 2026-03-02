export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{project.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{project.summary}</p>
        </div>
        <div className="flex gap-2 shrink-0 ml-4">
          <button
            onClick={() => onEdit(project)}
            className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
          project.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}>
          {project.status}
        </span>
        <span className="text-xs text-gray-400">{project.projectType}</span>
        {!project.visible && (
          <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Hidden</span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies?.map((tech) => (
          <span
            key={tech._id}
            className="text-xs px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: tech.category?.color || "#6b7280" }}
          >
            {tech.name}
          </span>
        ))}
      </div>

      {(project.githubUrl || project.liveUrl) && (
        <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
              Live Site
            </a>
          )}
        </div>
      )}
    </div>
  );
}