export default function CategoryCard({ category, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: category.color }}
        ></div>
        <div>
          <p className="font-medium text-gray-900">{category.name}</p>
          <p className="text-sm text-gray-500">{category.slug} · Order: {category.displayOrder}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(category)}
          className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(category._id)}
          className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}