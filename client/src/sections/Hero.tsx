import { useData } from "../context/DataContext";

export default function Hero() {
  const { settings } = useData();

  return (
    <section className="bg-charcoal">
      <div className="max-w-3xl mx-auto px-4 py-36 md:py-44 text-center">
        <p className="text-text-inverse/70 text-sm font-medium mb-6">
          {settings.siteTitle}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-text-inverse tracking-tight leading-tight mb-8">
          {settings.siteName}
        </h1>
        <p className="text-xl text-text-inverse/70 max-w-xl mx-auto mb-12 leading-relaxed">
          {settings.siteDescription}
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/projects"
            className="bg-primary text-text-inverse px-7 py-3.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            View My Work
          </a>
          <a
            href="/#contact"
            className="border border-text-inverse/20 text-text-inverse px-7 py-3.5 rounded-lg text-sm font-medium hover:border-text-inverse/40 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}