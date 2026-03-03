import { useData } from "../context/DataContext";

export default function Services() {
  const { services, skills, loading } = useData();

  if (loading) return <div className="py-20 text-center text-text-muted">Loading...</div>;

  const careerStart = new Date("2021-08-01");
  const yearsExperience = Math.floor((Date.now() - careerStart.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  return (
    <div>
      <div className="bg-charcoal py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Let's Build Something Great Together</h1>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            I help businesses grow with custom web development and data-driven digital marketing. Whether you need a new website, a marketing strategy, or both — I'd love to hear about it.
          </p>
          <a href="/#contact" className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium">
            Start a Conversation
          </a>
          <div className="grid grid-cols-2 gap-6 mt-12 max-w-sm mx-auto">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{yearsExperience}+</p>
              <p className="text-sm text-white/40">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{skills.length}+</p>
              <p className="text-sm text-white/40">Technologies</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">How I Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service._id} className="rounded-lg border border-border p-8 hover:border-primary/30 hover:shadow-sm transition-all">
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-primary text-sm font-medium mb-3">{service.headline}</p>
                <p className="text-text-muted text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-surface-alt">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">How I Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We discuss your goals, audience, and what success looks like." },
              { step: "02", title: "Strategy", desc: "I create a plan with clear deliverables, timeline, and milestones." },
              { step: "03", title: "Build", desc: "I execute with regular check-ins so you're never in the dark." },
              { step: "04", title: "Launch", desc: "We go live, measure results, and continuously improve." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <p className="text-3xl font-bold text-primary/20 mb-2">{item.step}</p>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3 text-white">Ready to Get Started?</h2>
          <p className="text-white/60 max-w-xl mx-auto mb-6">
            Every project starts with a conversation. Tell me what you're working on and I'll let you know how I can help.
          </p>
          <a href="/#contact" className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium">
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}