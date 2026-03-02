import { useState, useEffect } from "react";
import { getExperience } from "../services/api";
import type { Experience as ExperienceType } from "../types";

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExperience();
        setExperiences(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Present";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  if (loading) return null;

  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp._id} className="relative pl-8 border-l-2 border-gray-200">
              <div className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-xl font-semibold">{exp.jobTitle}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  </span>
                </div>

                <p className="text-blue-600 font-medium mb-2">{exp.company} · {exp.location}</p>
                <p className="text-gray-600 mb-3">{exp.description}</p>

                {exp.highlights.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-blue-400 mt-1">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech._id}
                      className="text-xs px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: tech.category?.color || "#6b7280" }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}