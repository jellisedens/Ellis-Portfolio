import type { Skill, Category } from "../types";

interface Props {
  skills: Skill[];
  categories: Category[];
}

export default function SkillsByCategory({ skills, categories }: Props) {
  const grouped = categories
    .map((cat) => ({
      category: cat,
      skills: skills.filter((s) => s.category?._id === cat._id),
    }))
    .filter((group) => group.skills.length > 0);

  return (
    <div className="space-y-4">
      {grouped.map(({ category, skills: catSkills }) => (
        <div key={category._id}>
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            <h4 className="text-sm font-semibold text-text">{category.name}</h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {catSkills.map((skill) => (
              <span
                key={skill._id}
                className="px-3 py-1 text-sm rounded-md bg-surface-alt text-text-muted font-medium border-2"
                style={{ borderColor: category.color }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}