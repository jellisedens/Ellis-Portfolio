import { useState, useEffect } from "react";
import { get, put, del } from "../services/api";
import MessageCard from "../components/MessageCard";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await get("/messages");
      setMessages(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleView = (msg) => {
    setSelected(msg);
    if (!msg.read) {
      put(`/messages/${msg._id}`, { read: true }).then(fetchMessages);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await del(`/messages/${id}`);
      setSelected(null);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Messages</h2>
      </div>

      {selected && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Message from {selected.name}</h3>
            <button
              onClick={() => setSelected(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              Close
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium text-gray-700">From:</span> {selected.name}</p>
            <p><span className="font-medium text-gray-700">Email:</span> {selected.email}</p>
            <p><span className="font-medium text-gray-700">Received:</span> {formatDate(selected.createdAt)}</p>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">{selected.message}</p>
          </div>
          <div className="mt-4 flex gap-3">
            
              <a href={`mailto:${selected.email}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Reply via Email
            </a>
            <button
              onClick={() => handleDelete(selected._id)}
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {messages.map((msg) => (
          <MessageCard
            key={msg._id}
            message={msg}
            onView={handleView}
            onDelete={handleDelete}
          />
        ))}
        {messages.length === 0 && (
          <p className="text-center text-gray-400 py-8">No messages yet.</p>
        )}
      </div>
    </div>
  );
}