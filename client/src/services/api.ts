import type { ApiResponse } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function fetchAPI<T = ApiResponse>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Request failed: ${response.status}`);
  }

  return data as T;
}

export function checkHealth(): Promise<ApiResponse> {
  return fetchAPI("/api/health");
}