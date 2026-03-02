import { useState, useEffect } from "react";
import { get } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [categories, skills, projects, experience, education, messages] =
          await Promise.all([
            get("/categories"),
            get("/skills"),
            get("/projects"),
            get("/experience"),
            get("/education"),
            get("/messages"),
          ]);

        setStats({
          categories: categories.count,
          skills: skills.count,
          projects: projects.count,
          experience: experience.count,
          education: education.count,
          messages: messages.count,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>;

  const cards = [
    { label: "Categories", count: stats?.categories || 0, color: "bg-purple-500" },
    { label: "Skills", count: stats?.skills || 0, color: "bg-blue-500" },
    { label: "Projects", count: stats?.projects || 0, color: "bg-green-500" },
    { label: "Experience", count: stats?.experience || 0, color: "bg-orange-500" },
    { label: "Education", count: stats?.education || 0, color: "bg-cyan-500" },
    { label: "Messages", count: stats?.messages || 0, color: "bg-pink-500" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-3xl font-bold mt-1">{card.count}</p>
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-lg opacity-80`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}