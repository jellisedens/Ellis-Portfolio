import type { Skill, Category } from "../types";

interface Props {
  technologies: Skill[];
  categories?: Category[];
}

export default function TechTags({ technologies, categories = [] }: Props) {
  if (technologies.length === 0) return null;

  if (categories.length > 0) {
    const grouped = categories
      .map((cat) => ({
        category: cat,
        techs: technologies.filter((t) => t.category?._id === cat._id),
      }))
      .filter((group) => group.techs.length > 0);

    return (
      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-border">
        {grouped.flatMap((group) => {
          return group.techs.map((tech) => (
            <span
              key={tech._id}
              className="text-xs px-2.5 py-1 rounded-md bg-surface-alt text-text-muted font-medium border-2"
              style={{ borderColor: group.category.color }}
            >
              {tech.name}
            </span>
          ));
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
      {technologies.map((tech) => (
        <span
          key={tech._id}
          className="text-xs px-2.5 py-1 rounded-md bg-surface-alt text-text-muted font-medium"
        >
          {tech.name}
        </span>
      ))}
    </div>
  );
}