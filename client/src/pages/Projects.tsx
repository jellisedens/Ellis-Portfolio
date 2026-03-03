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
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Projects</h1>
        <p className="text-text-muted text-center mb-10">A collection of things I've built.</p>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          <button onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 text-sm rounded-full border transition-colors ${activeFilter === "all" ? "bg-charcoal text-white border-charcoal" : "text-text-muted border-border hover:border-charcoal"}`}>
            All
          </button>
          {projectTypes.map((type) => (
            <button key={type} onClick={() => setActiveFilter(type)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${activeFilter === type ? "bg-charcoal text-white border-charcoal" : "text-text-muted border-border hover:border-charcoal"}`}>
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
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${project.status === "Completed" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-text-muted text-sm mb-2">{project.summary}</p>
                <p className="text-text-light text-sm mb-4">{project.description}</p>
                <TechTags technologies={project.technologies} categories={categories} />
                <div className="flex gap-4 mt-4">
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">GitHub</a>}
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Live Site</a>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && <p className="text-center text-text-light py-8">No projects match this filter.</p>}
      </div>
    </div>
  );
}