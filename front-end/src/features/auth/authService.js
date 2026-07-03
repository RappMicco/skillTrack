const VITE_API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
  const response = await fetch(`${VITE_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("No data ");
  }
};
