import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";

export default function Services() {
  const { services, skills, loading } = useData();

  if (loading) return <div className="py-20 text-center text-text-muted">Loading...</div>;

  const careerStart = new Date("2021-08-01");
  const yearsExperience = Math.floor((Date.now() - careerStart.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  return (
    <div>
      <div className="bg-charcoal py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-text-inverse">Let's Build Something Great Together</h1>
          <p className="text-text-inverse/60 max-w-2xl mx-auto mb-8">
            I help businesses grow with custom web development and data-driven digital marketing. Whether you need a new website, a marketing strategy, or both — I'd love to hear about it.
          </p>
          <Link to="/#contact" className="inline-block bg-primary text-text-inverse px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium">
            Get in Touch
          </Link>
          <div className="grid grid-cols-2 gap-6 mt-12 max-w-sm mx-auto">
            <div className="text-center">
              <p className="text-3xl font-bold text-text-inverse">{yearsExperience}+</p>
              <p className="text-sm text-text-inverse/60">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-text-inverse">{skills.length}+</p>
              <p className="text-sm text-text-inverse/60">Technologies</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">How I Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service._id} className="rounded-lg border border-border p-8 hover:border-charcoal/20 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-text-muted text-sm font-medium mb-3">{service.headline}</p>
                <p className="text-text text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">How I Work</h2>
          <div className="space-y-0">
            {[
              { step: "01", title: "Discovery", desc: "We discuss your goals, audience, and what success looks like." },
              { step: "02", title: "Strategy", desc: "I create a plan with clear deliverables, timeline, and milestones." },
              { step: "03", title: "Build", desc: "I execute with regular check-ins so you're never in the dark." },
              { step: "04", title: "Launch", desc: "We go live, measure results, and continuously improve." },
            ].map((item, index, arr) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{item.step}</span>
                  </div>
                  {index < arr.length - 1 && (
                    <div className="w-px flex-1 bg-border my-2" />
                  )}
                </div>
                <div className={`pt-2.5 ${index < arr.length - 1 ? "pb-10" : "pb-0"}`}>
                  <h3 className="text-lg font-semibold text-text mb-1">{item.title}</h3>
                  <p className="text-text leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3 text-text-inverse">Ready to Get Started?</h2>
          <p className="text-text-inverse/60 max-w-xl mx-auto mb-6">
            Every project starts with a conversation. Tell me what you're working on and I'll let you know how I can help.
          </p>
          <Link to="/#contact" className="inline-block bg-primary text-text-inverse px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium">
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}