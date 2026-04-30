const API_URL = import.meta.env.VITE_API_URL + "/api";

/* GENERIC FETCH (WITH AUTO TOKEN) */
export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {}),
      },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "API error");
    }

    return data;
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
};