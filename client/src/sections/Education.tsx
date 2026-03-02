import { useState, useEffect } from "react";
import { getEducation } from "../services/api";
import type { Education as EducationType } from "../types";

export default function Education() {
  const [education, setEducation] = useState<EducationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEducation();
        setEducation(res.data);
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
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Education</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div key={edu._id} className="bg-white rounded-lg shadow-sm p-6">
              <span className="inline-block text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full mb-3">
                {edu.type}
              </span>
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <p className="text-blue-600 font-medium">{edu.institution}</p>
              {edu.fieldOfStudy && (
                <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
              )}
              <p className="text-sm text-gray-400 mt-2">
                {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
              </p>
              {edu.description && (
                <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}