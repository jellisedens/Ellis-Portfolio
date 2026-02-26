import SectionHeading from "../components/SectionHeading";
import TestConnection from "../components/TestConnection";

function About() {
  return (
    <section id="about" className="px-6 py-section">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="About Me"
          subtitle="A bit about my background and what drives me."
        />
        <TestConnection />
      </div>
    </section>
  );
}

export default About;