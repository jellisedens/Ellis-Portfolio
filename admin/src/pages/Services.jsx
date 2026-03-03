import { useState, useEffect } from "react";
import { get, del } from "../services/api";
import ServiceCard from "../components/ServiceCard";
import ServiceModal from "../components/ServiceModal";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await get("/services");
      setServices(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditing(service);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleSaved = () => {
    setShowModal(false);
    setEditing(null);
    fetchServices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await del(`/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Services</h2>
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Service
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
        {services.length === 0 && (
          <p className="text-center text-gray-400 py-8">No services yet.</p>
        )}
      </div>

      {showModal && (
        <ServiceModal service={editing} onClose={() => setShowModal(false)} onSaved={handleSaved} />
      )}
    </div>
  );
}