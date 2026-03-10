import { useData } from "../context/DataContext";

export default function Education() {
  const { education, loading } = useData();

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Present";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  if (loading) return null;

  return (
    <section id="education" className="py-20 bg-surface-alt">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu) => (
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
              {edu.description && <p className="text-sm text-text mt-2">{edu.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}