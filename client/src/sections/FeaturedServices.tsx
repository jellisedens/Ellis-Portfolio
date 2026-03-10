import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function FeaturedServices() {
  const { services, loading } = useData();

  if (loading) return null;

  const featured = services.filter((s) => s.featured);
  if (featured.length === 0) return null;

  return (
    <section id="services" className="py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What I Can Do For You</h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Development expertise meets marketing strategy — digital experiences that look great and drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((service) => (
            <div
              key={service._id}
              className="rounded-lg border border-border p-10 hover:border-charcoal/20 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-text-muted text-sm font-medium mb-4">{service.headline}</p>
              <p className="text-text text-sm leading-relaxed">
                {service.description.length > 180
                  ? service.description.substring(0, 180).replace(/\s+\S*$/, "") + "…"
                  : service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="text-sm text-text-muted font-medium underline hover:text-primary transition-colors"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}