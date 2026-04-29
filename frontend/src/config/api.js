const API_URL = import.meta.env.VITE_API_URL;

/* GENERIC FETCH */
export const apiFetch = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
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