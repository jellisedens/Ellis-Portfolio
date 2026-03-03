export default function ServiceCard({ service, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{service.title}</h3>
            {service.featured && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Featured</span>
            )}
            {!service.visible && (
              <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Hidden</span>
            )}
          </div>
          <p className="text-sm text-gray-500">{service.headline}</p>
        </div>
        <div className="flex gap-2 shrink-0 ml-4">
          <button
            onClick={() => onEdit(service)}
            className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(service._id)}
            className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{service.description.substring(0, 120)}...</p>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span>Order: {service.displayOrder}</span>
        <span>{service.features?.length || 0} features</span>
        <span>{service.slug}</span>
      </div>
    </div>
  );
}