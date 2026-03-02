export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  displayOrder: number;
  visible: boolean;
}

export interface Skill {
  _id: string;
  name: string;
  category: Category;
  visible: boolean;
}

export interface Project {
  _id: string;
  title: string;
  summary: string;
  description: string;
  technologies: Skill[];
  projectType: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  status: string;
  visible: boolean;
}

export interface Experience {
  _id: string;
  company: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  highlights: string[];
  technologies: Skill[];
  visible: boolean;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  type: string;
  startDate: string;
  endDate: string | null;
  description: string;
  visible: boolean;
}

export interface DataResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}