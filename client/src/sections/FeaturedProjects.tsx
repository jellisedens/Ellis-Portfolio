import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function FeaturedProjects() {
  const { projects, loading } = useData();

  if (loading) return null;

  const featured = projects.slice(0, 3);

  return (
    <section id="projects" className="py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center tracking-tight mb-14">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((project) => (
            <div
              key={project._id}
              className="rounded-lg border border-border p-8 hover:border-charcoal/20 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-3">{project.title}</h3>
              <p className="text-text text-sm leading-relaxed mb-5">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech._id}
                    className="text-xs px-2.5 py-1 rounded-md bg-surface-alt text-text-muted font-medium border-2"
                    style={{ borderColor: tech.category?.color || "var(--color-border)" }}
                  >
                    {tech.name}
                  </span>
                ))}
                {project.technologies.length > 6 && (
                  <span className="text-xs px-2.5 py-1 rounded-md bg-surface-alt text-text-muted font-medium border-2 border-border">
                    +{project.technologies.length - 6}
                  </span>
                )}
              </div>

              <div className="flex gap-4 pt-5 border-t border-border">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-muted font-medium underline hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-muted font-medium underline hover:text-primary transition-colors"
                  >
                    Live Site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="text-sm text-text-muted font-medium underline hover:text-primary transition-colors"
          >
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
}