import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getSkills, getCategories, getExperience, getEducation, getProjects, getServices, getSettings } from "../services/api";
import type { Skill, Category, Experience, Education, Project, Service, SiteSettings } from "../types";

const SETTINGS_CACHE_KEY = "portfolio-settings";

const defaultSettings: SiteSettings = {
  _id: "",
  siteName: "Ellis Eden",
  siteTitle: "Full-Stack Developer & Digital Marketer",
  siteDescription: "I build fast, scalable web applications and drive growth through data-driven digital marketing. From React and Node.js to HubSpot and analytics — I bridge the gap between development and marketing.",
  githubUrl: "https://github.com/jellisedens",
  linkedinUrl: "",
  twitterUrl: "",
  websiteUrl: "",
  colorPrimary: "#2563eb",
  colorPrimaryDark: "#1d4ed8",
  colorPrimaryLight: "#dbeafe",
  colorAccent: "#2563eb",
  colorCharcoal: "#1c1c1c",
  colorCharcoalLight: "#252525",
  colorBackground: "#ffffff",
  colorSurface: "#ffffff",
  colorSurfaceAlt: "#f9fafb",
  colorText: "#1a1a1a",
  colorTextMuted: "#6b7280",
  colorTextLight: "#9ca3af",
  colorTextInverse: "#ffffff",
  fontHeading: "DM Sans",
  fontBody: "Inter",
};

function getCachedSettings(): SiteSettings {
  try {
    const cached = localStorage.getItem(SETTINGS_CACHE_KEY);
    if (cached) return JSON.parse(cached);
  } catch {
    // Invalid cache, use defaults
  }
  return defaultSettings;
}

function cacheSettings(settings: SiteSettings) {
  try {
    localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(settings));
  } catch {
    // Storage full or unavailable
  }
}

function applyTheme(settings: SiteSettings) {
  const root = document.documentElement;

  root.style.setProperty("--color-primary", settings.colorPrimary);
  root.style.setProperty("--color-primary-dark", settings.colorPrimaryDark);
  root.style.setProperty("--color-primary-light", settings.colorPrimaryLight);
  root.style.setProperty("--color-accent", settings.colorAccent);
  root.style.setProperty("--color-charcoal", settings.colorCharcoal);
  root.style.setProperty("--color-charcoal-light", settings.colorCharcoalLight);
  root.style.setProperty("--color-background", settings.colorBackground);
  root.style.setProperty("--color-surface", settings.colorSurface);
  root.style.setProperty("--color-surface-alt", settings.colorSurfaceAlt);
  root.style.setProperty("--color-text", settings.colorText);
  root.style.setProperty("--color-text-muted", settings.colorTextMuted);
  root.style.setProperty("--color-text-light", settings.colorTextLight);
  root.style.setProperty("--color-text-inverse", settings.colorTextInverse);

  const headingFont = `"${settings.fontHeading}", ui-monospace, monospace`;
  const bodyFont = `"${settings.fontBody}", ui-sans-serif, system-ui, sans-serif`;
  root.style.setProperty("--font-mono", headingFont);
  root.style.setProperty("--font-sans", bodyFont);

  const fontLink = document.getElementById("dynamic-fonts") as HTMLLinkElement;
  const fontUrl = `https://fonts.googleapis.com/css2?family=${settings.fontHeading.replace(/ /g, "+")}:wght@400;500;600;700&family=${settings.fontBody.replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap`;

  if (fontLink) {
    fontLink.href = fontUrl;
  } else {
    const link = document.createElement("link");
    link.id = "dynamic-fonts";
    link.rel = "stylesheet";
    link.href = fontUrl;
    document.head.appendChild(link);
  }
}

// Apply cached theme IMMEDIATELY — before React renders
const cachedSettings = getCachedSettings();
applyTheme(cachedSettings);

interface DataContextType {
  skills: Skill[];
  categories: Category[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  services: Service[];
  settings: SiteSettings;
  loading: boolean;
  hasInitialized: boolean;
}

const DataContext = createContext<DataContextType>({
  skills: [],
  categories: [],
  experiences: [],
  education: [],
  projects: [],
  services: [],
  settings: cachedSettings,
  loading: true,
  hasInitialized: false,
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(cachedSettings);
  const [loading, setLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [skillsRes, catsRes, expRes, eduRes, projRes, servRes, settingsRes] = await Promise.all([
          getSkills(),
          getCategories(),
          getExperience(),
          getEducation(),
          getProjects(),
          getServices(),
          getSettings(),
        ]);
        setSkills(skillsRes.data);
        setCategories(catsRes.data);
        setExperiences(expRes.data);
        setEducation(eduRes.data);
        setProjects(projRes.data);
        setServices(servRes.data);
        setSettings(settingsRes.data);

        // Update cache and apply fresh theme
        cacheSettings(settingsRes.data);
        applyTheme(settingsRes.data);
      } catch (err) {
        console.error("Failed to load portfolio data:", err);
      } finally {
        setLoading(false);
        setHasInitialized(true);
      }
    };
    fetchAll();
  }, []);

  return (
    <DataContext.Provider value={{ skills, categories, experiences, education, projects, services, settings, loading, hasInitialized }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}