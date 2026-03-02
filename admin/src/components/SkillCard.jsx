export default function SkillCard({ skill, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ backgroundColor: skill.category?.color || "#6b7280" }}
        ></span>
        <div>
          <p className="font-medium text-gray-900">{skill.name}</p>
          <p className="text-sm text-gray-500">{skill.category?.name || "Uncategorized"}</p>
        </div>
        {!skill.visible && (
          <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Hidden</span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(skill)}
          className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(skill._id)}
          className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}