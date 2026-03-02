const API_URL = "http://localhost:3001/api";

export async function apiRequest(endpoint, options = {}) {
  const token = sessionStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const res = await fetch(`${API_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export function get(endpoint) {
  return apiRequest(endpoint);
}

export function post(endpoint, body) {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function put(endpoint, body) {
  return apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function del(endpoint) {
  return apiRequest(endpoint, {
    method: "DELETE",
  });
}