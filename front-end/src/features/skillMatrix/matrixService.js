const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getSkillMatrixSummary = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-skillMatrix-summary`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};
