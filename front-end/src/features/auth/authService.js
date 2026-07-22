const VITE_API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
  const response = await fetch(`${VITE_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const getMe = async () => {
  const response = await fetch(`${VITE_API_URL}/getMe`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const logOutUser = async () => {
  const response = await fetch(`${VITE_API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.message}`);
  }

  return response.json();
};
