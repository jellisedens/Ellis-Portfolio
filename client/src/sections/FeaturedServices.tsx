import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function FeaturedServices() {
  const { services, loading } = useData();

  if (loading) return null;

  const featured = services.filter((s) => s.featured);
  if (featured.length === 0) return null;

  return (
    <section id="services" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What I Can Do For You</h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Development expertise meets marketing strategy — digital experiences that look great and drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((service) => (
            <div key={service._id} className="rounded-lg border border-border p-8 hover:border-primary/30 hover:shadow-sm transition-all">
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-primary text-sm font-medium mb-3">{service.headline}</p>
              <p className="text-text-muted text-sm leading-relaxed">{service.description.substring(0, 150)}...</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}