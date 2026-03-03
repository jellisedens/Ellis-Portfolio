import type { Skill, Category } from "../types";

interface Props {
  technologies: Skill[];
  categories: Category[];
}

export default function TechTags({ technologies, categories }: Props) {
  const grouped = categories
    .map((cat) => ({
      category: cat,
      techs: technologies.filter((t) => t.category?._id === cat._id),
    }))
    .filter((group) => group.techs.length > 0);

  if (grouped.length === 0) return null;

  return (
    <div className="space-y-2 mt-3 pt-3 border-t border-gray-100">
      {grouped.map(({ category, techs }) => (
        <div key={category._id}>
          <p className="text-xs font-medium text-gray-400 mb-1">{category.name}</p>
          <div className="flex flex-wrap gap-1.5">
            {techs.map((tech) => (
              <span
                key={tech._id}
                className="text-xs px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: category.color }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}