import { siteConfig } from "../data/portfolio";

function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="mb-2 text-sm font-medium tracking-wide text-primary uppercase">
          {siteConfig.title}
        </p>
        <h1 className="text-5xl font-bold text-text md:text-6xl">
          Hi, I&apos;m {siteConfig.name}
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          {siteConfig.description}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/projects" className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark transition-colors">
            View My Work
          </a>
          <a href="/resume" className="rounded-lg border border-secondary/30 px-6 py-3 text-sm font-medium text-text hover:border-primary hover:text-primary transition-colors">
            View Resume
          </a>
          <a href="/#contact" className="rounded-lg border border-secondary/30 px-6 py-3 text-sm font-medium text-text hover:border-primary hover:text-primary transition-colors">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;