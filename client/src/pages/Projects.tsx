import { useState } from "react";
import { useData } from "../context/DataContext";
import TechTags from "../components/TechTags";

export default function Projects() {
  const { projects, categories, loading } = useData();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const projectTypes = [...new Set(projects.map((p) => p.projectType))];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.projectType === activeFilter);

  if (loading) return <div className="py-20 text-center text-gray-500">Loading...</div>;

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Projects</h1>
        <p className="text-gray-500 text-center mb-10">A collection of things I've built.</p>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 text-sm rounded-full border transition-colors ${
              activeFilter === "all"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
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
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{project.summary}</p>
                <p className="text-sm text-gray-500 mb-3">{project.description}</p>
                <TechTags technologies={project.technologies} categories={categories} />
                <div className="flex gap-4 mt-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">GitHub</a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Live Site</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-400 py-8">No projects match this filter.</p>
        )}
      </div>
    </div>
  );
}