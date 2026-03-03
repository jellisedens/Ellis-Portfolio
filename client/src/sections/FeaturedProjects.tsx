import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import TechTags from "../components/TechTags";

export default function FeaturedProjects() {
  const { projects, categories, loading } = useData();

  if (loading) return null;

  const featured = projects.slice(0, 3);

  return (
    <section id="projects" className="py-20 bg-surface-alt">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((project) => (
            <div key={project._id} className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    project.status === "Completed" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-text-muted text-sm mb-4">{project.summary}</p>
                <TechTags technologies={project.technologies} categories={categories} />
                <div className="flex gap-4 mt-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">GitHub</a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Live Site</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/projects" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}