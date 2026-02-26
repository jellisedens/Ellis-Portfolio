import SectionHeading from "../components/SectionHeading";

function About() {
  return (
    <section id="about" className="px-6 py-section">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="About Me"
          subtitle="A bit about my background and what drives me."
        />
        <p className="text-text-muted leading-relaxed">
          This section will contain your background, skills, and story.
          We&apos;ll build this out as the portfolio develops.
        </p>
      </div>
    </section>
  );
}

export default About;