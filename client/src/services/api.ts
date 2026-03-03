import type { DataResponse, Category, Skill, Project, Experience, Education, Service, SiteSettings } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Request failed: ${response.status}`);
  }

  return data as T;
}

export function getCategories() {
  return fetchAPI<DataResponse<Category>>("/api/categories");
}

export function getSkills() {
  return fetchAPI<DataResponse<Skill>>("/api/skills");
}

export function getProjects() {
  return fetchAPI<DataResponse<Project>>("/api/projects");
}

export function getExperience() {
  return fetchAPI<DataResponse<Experience>>("/api/experience");
}

export function getEducation() {
  return fetchAPI<DataResponse<Education>>("/api/education");
}

export function getServices() {
  return fetchAPI<DataResponse<Service>>("/api/services");
}

export function postMessage(body: { name: string; email: string; message: string }) {
  return fetch(`${API_URL}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => res.json());
}

export function getSettings() {
  return fetchAPI<{ success: boolean; data: SiteSettings }>("/api/settings");
}