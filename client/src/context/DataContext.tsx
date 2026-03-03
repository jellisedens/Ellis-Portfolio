import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getSkills, getCategories, getExperience, getEducation, getProjects } from "../services/api";
import type { Skill, Category, Experience, Education, Project } from "../types";

interface DataContextType {
  skills: Skill[];
  categories: Category[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  loading: boolean;
}

const DataContext = createContext<DataContextType>({
  skills: [],
  categories: [],
  experiences: [],
  education: [],
  projects: [],
  loading: true,
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [skillsRes, catsRes, expRes, eduRes, projRes] = await Promise.all([
          getSkills(),
          getCategories(),
          getExperience(),
          getEducation(),
          getProjects(),
        ]);
        setSkills(skillsRes.data);
        setCategories(catsRes.data);
        setExperiences(expRes.data);
        setEducation(eduRes.data);
        setProjects(projRes.data);
      } catch (err) {
        console.error("Failed to load portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <DataContext.Provider value={{ skills, categories, experiences, education, projects, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}