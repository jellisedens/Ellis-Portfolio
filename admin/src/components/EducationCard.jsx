export default function EducationCard({ education, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{education.degree}</p>
        <p className="text-sm text-gray-600">{education.institution}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{education.type}</span>
          <span className="text-xs text-gray-400">
            {formatDate(education.startDate)} — {formatDate(education.endDate)}
          </span>
          {!education.visible && (
            <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Hidden</span>
          )}
        </div>
      </div>
      <div className="flex gap-2 shrink-0 ml-4">
        <button
          onClick={() => onEdit(education)}
          className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(education._id)}
          className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}