import { useData } from "../context/DataContext";
import SkillsByCategory from "../components/SkillsByCategory";

export default function Skills() {
  const { skills, categories, loading } = useData();

  if (loading) return null;

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <SkillsByCategory skills={skills} categories={categories} />
        </div>
      </div>
    </section>
  );
}