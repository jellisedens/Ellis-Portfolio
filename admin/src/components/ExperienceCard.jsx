export default function ExperienceCard({ experience, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{experience.jobTitle}</h3>
          <p className="text-sm text-gray-600">{experience.company}</p>
          <p className="text-xs text-gray-400 mt-1">
            {experience.location} · {formatDate(experience.startDate)} — {formatDate(experience.endDate)}
          </p>
        </div>
        <div className="flex gap-2 shrink-0 ml-4">
          <button
            onClick={() => onEdit(experience)}
            className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(experience._id)}
            className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {!experience.visible && (
        <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Hidden</span>
      )}

      <p className="text-sm text-gray-500 mt-2">{experience.description}</p>

      {experience.highlights?.length > 0 && (
        <ul className="mt-2 space-y-1">
          {experience.highlights.map((h, i) => (
            <li key={i} className="text-sm text-gray-500 flex gap-2">
              <span className="text-gray-300">•</span>
              {h}
            </li>
          ))}
        </ul>
      )}

      {experience.technologies?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
          {experience.technologies.map((tech) => (
            <span
              key={tech._id}
              className="text-xs px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: tech.category?.color || "#6b7280" }}
            >
              {tech.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}