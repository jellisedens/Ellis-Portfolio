import SectionHeading from "../components/SectionHeading";

function About() {
  return (
    <section id="about" className="px-6 py-section bg-surface">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="About Me"
          subtitle="A bit about my background and what drives me."
        />
        <p className="text-text-muted text-center">Content coming soon.</p>
      </div>
    </section>
  );
}

export default About;