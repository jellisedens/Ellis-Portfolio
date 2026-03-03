import { useData } from "../context/DataContext";

export default function Hero() {
  const { settings } = useData();

  return (
    <section className="bg-charcoal">
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-4">
          {settings.siteTitle}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          {settings.siteName}
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
          {settings.siteDescription}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/services" className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
            View Services
          </a>
          <a href="/projects" className="border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-medium hover:border-white/40 transition-colors">
            View My Work
          </a>
          <a href="/#contact" className="border border-white/20 text-white px-6 py-3 rounded-lg text-sm font-medium hover:border-white/40 transition-colors">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}