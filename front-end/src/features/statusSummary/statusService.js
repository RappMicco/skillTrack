const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getTrainingSummary = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-training-summary`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
