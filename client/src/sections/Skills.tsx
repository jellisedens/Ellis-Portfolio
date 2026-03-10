import { useData } from "../context/DataContext";

export default function Skills() {
  const { skills, categories, loading } = useData();

  if (loading) return null;

  const grouped = categories
    .map((cat) => ({
      category: cat,
      skills: skills.filter((s) => s.category?._id === cat._id),
    }))
    .filter((group) => group.skills.length > 0);

  return (
    <section id="skills" className="py-28">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center tracking-tight mb-14">
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grouped.map(({ category, skills: catSkills }) => (
            <div
              key={category._id}
              className="rounded-lg border border-border p-6"
            >
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-border">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="text-sm font-semibold text-text">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {catSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="text-xs px-2.5 py-1 rounded-md bg-surface-alt text-text-muted font-medium border-2"
                    style={{ borderColor: category.color }}
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