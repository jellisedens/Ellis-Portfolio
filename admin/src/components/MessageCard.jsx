export default function MessageCard({ message, onView, onDelete }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow ${
        !message.read ? "border-l-4 border-blue-500" : ""
      }`}
      onClick={() => onView(message)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className={`text-sm ${!message.read ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}>
              {message.name}
            </p>
            {!message.read && (
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </div>
          <p className="text-xs text-gray-400">{message.email}</p>
          <p className="text-sm text-gray-500 mt-1">
            {message.message.length > 100 ? message.message.substring(0, 100) + "..." : message.message}
          </p>
          <p className="text-xs text-gray-400 mt-2">{formatDate(message.createdAt)}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(message._id);
          }}
          className="text-sm text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition-colors shrink-0 ml-4"
        >
          Delete
        </button>
      </div>
    </div>
  );
}