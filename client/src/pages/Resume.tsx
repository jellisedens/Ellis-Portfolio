import { useState, type JSX } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useData } from "../context/DataContext";
import SkillsByCategory from "../components/SkillsByCategory";
import TechTags from "../components/TechTags";
import { Link } from "react-router-dom";

type SectionKey = "experience" | "skills" | "projects" | "education";

const sectionLabels: Record<SectionKey, { title: string }> = {
  experience: { title: "Experience" },
  skills: { title: "Skills & Technologies" },
  projects: { title: "Projects" },
  education: { title: "Education" },
};

export default function Resume() {
  const { skills, categories, experiences, education, projects, loading } = useData();

  const [activeSections, setActiveSections] = useState<SectionKey[]>([
    "experience", "skills", "projects", "education",
  ]);

  const [skillFilter, setSkillFilter] = useState<string>("all");
  const [eduFilter, setEduFilter] = useState<string>("all");

  const toggleSection = (section: SectionKey) => {
    setActiveSections((prev) => {
      const without = prev.filter((s) => s !== section);
      return [section, ...without];
    });
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Present";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const filteredSkills = skillFilter === "all"
    ? skills
    : skills.filter((s) => s.category?._id === skillFilter);

  const filteredCategories = skillFilter === "all"
    ? categories
    : categories.filter((c) => c._id === skillFilter);

  const eduTypes = [...new Set(education.map((e) => e.type))];
  const filteredEducation = eduFilter === "all"
    ? education
    : education.filter((e) => e.type === eduFilter);

  if (loading) return <div className="py-20 text-center text-text-muted">Loading...</div>;

  const sectionContent: Record<SectionKey, JSX.Element> = {
    experience: (
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-surface rounded-lg border border-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
              <span className="text-sm text-text-muted">
                {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
              </span>
            </div>
            <p className="text-primary font-medium mb-2">{exp.company} · {exp.location}</p>
            <p className="text-text text-sm mb-3">{exp.description}</p>
            {exp.highlights.length > 0 && (
              <ul className="space-y-1 mb-3">
                {exp.highlights.map((h: string, i: number) => (
                  <li key={i} className="text-sm text-text flex gap-2">
                    <span className="text-primary mt-0.5">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
            {exp.technologies.length > 0 && (
              <TechTags technologies={exp.technologies} categories={categories} />
            )}
          </div>
        ))}
      </div>
    ),

    skills: (
      <div>
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setSkillFilter("all")}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              skillFilter === "all"
                ? "bg-charcoal text-text-inverse border-charcoal"
                : "text-text border-border hover:border-charcoal"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSkillFilter(cat._id)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                skillFilter === cat._id
                  ? "bg-charcoal text-text-inverse border-charcoal"
                  : "text-text border-border hover:border-charcoal"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="bg-surface rounded-lg border border-border p-6">
          <SkillsByCategory skills={filteredSkills} categories={filteredCategories} />
        </div>
      </div>
    ),

    projects: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-surface rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                project.status === "Completed" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
              }`}>
                {project.status}
              </span>
            </div>
            <p className="text-text text-sm mb-3">{project.summary}</p>
            {project.technologies.length > 0 && (
              <TechTags technologies={project.technologies} categories={categories} />
            )}
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
        ))}
      </div>
    ),

    education: (
      <div>
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setEduFilter("all")}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              eduFilter === "all"
                ? "bg-charcoal text-text-inverse border-charcoal"
                : "text-text border-border hover:border-charcoal"
            }`}
          >
            All
          </button>
          {eduTypes.map((type) => (
            <button
              key={type}
              onClick={() => setEduFilter(type)}
              className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                eduFilter === type
                  ? "bg-charcoal text-text-inverse border-charcoal"
                  : "text-text border-border hover:border-charcoal"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEducation.map((edu) => (
            <div key={edu._id} className="bg-surface rounded-lg border border-border p-6">
              <span className="inline-block text-xs font-medium px-2 py-1 bg-primary-light text-primary-dark rounded-full mb-3">
                {edu.type}
              </span>
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <p className="text-primary font-medium">{edu.institution}</p>
              {edu.fieldOfStudy && <p className="text-sm text-text">{edu.fieldOfStudy}</p>}
              <p className="text-sm text-text-muted mt-2">
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div>
      <div className="bg-charcoal py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-text-inverse">Resume</h1>
          <p className="text-text-inverse/60 max-w-2xl mx-auto mb-8">
            A snapshot of my experience, skills, projects, and education. Click a section below to prioritize it.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/#contact" className="inline-block bg-primary text-text-inverse px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium">
            Get in Touch
          </Link>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <LayoutGroup>
            <div className="flex justify-center gap-3 mb-12 flex-wrap">
              {activeSections.map((section) => (
                <motion.button
                  key={section}
                  layoutId={`btn-${section}`}
                  onClick={() => toggleSection(section)}
                  className={`px-5 py-2 text-sm font-medium rounded-full border transition-colors capitalize ${
                    activeSections[0] === section
                      ? "bg-charcoal text-text-inverse border-charcoal"
                      : "text-text border-border hover:border-charcoal"
                  }`}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </LayoutGroup>

          <AnimatePresence mode="popLayout">
            {activeSections.map((section, index) => (
              <motion.div
                key={section}
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.05 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold">{sectionLabels[section].title}</h2>
                  <div className="flex-1 h-px bg-border ml-2"></div>
                </div>

                {sectionContent[section]}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}