import { useState, useEffect } from "react";
import { getSkills, getCategories } from "../services/api";
import type { Skill, Category } from "../types";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, catsRes] = await Promise.all([getSkills(), getCategories()]);
        setSkills(skillsRes.data);
        setCategories(catsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return null;

  const skillsByCategory = categories
    .map((cat) => ({
      category: cat,
      skills: skills.filter((s) => s.category?._id === cat._id),
    }))
    .filter((group) => group.skills.length > 0);

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsByCategory.map(({ category, skills: catSkills }) => (
            <div key={category._id} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="px-3 py-1 text-sm rounded-full border"
                    style={{ borderColor: category.color, color: category.color }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}