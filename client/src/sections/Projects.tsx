import SectionHeading from "../components/SectionHeading";

function Projects() {
  return (
    <section id="projects" className="bg-surface px-6 py-section">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Projects"
          subtitle="Things I've built and am working on."
        />
        <p className="text-center text-text-muted">
          Project cards will go here. We&apos;ll build a reusable ProjectCard
          component and feed it data from the data layer.
        </p>
      </div>
    </section>
  );
}

export default Projects;