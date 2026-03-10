import { useState } from "react";
import { useData } from "../context/DataContext";
import TechTags from "../components/TechTags";

export default function Projects() {
  const { projects, categories, loading } = useData();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const projectTypes = [...new Set(projects.map((p) => p.projectType))];
  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.projectType === activeFilter);

  if (loading) return <div className="py-20 text-center text-text-muted">Loading...</div>;

  return (
    <div>
      <div className="bg-charcoal py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-text-inverse">Projects</h1>
          <p className="text-text-inverse/60 max-w-2xl mx-auto mb-8">
            A collection of things I've built — from full-stack web applications to marketing technology platforms.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-primary text-text-inverse px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium text-sm"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                activeFilter === "all"
                  ? "bg-charcoal text-text-inverse border-charcoal"
                  : "text-text border-border hover:border-charcoal"
              }`}
            >
              All
            </button>
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                  activeFilter === type
                    ? "bg-charcoal text-text-inverse border-charcoal"
                    : "text-text border-border hover:border-charcoal"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div key={project._id} className="rounded-lg border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        project.status === "Completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-text text-sm mb-2">{project.summary}</p>
                  <p className="text-text text-sm mb-4">{project.description}</p>
                  <TechTags technologies={project.technologies} categories={categories} />
                  <div className="flex gap-4 mt-4">
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
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="text-center text-text-muted py-8">No projects match this filter.</p>
          )}
        </div>
      </div>
    </div>
  );
}