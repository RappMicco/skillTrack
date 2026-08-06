const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getUpcomingData = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-upcoming-training`,
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

export const getPendingData = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-pending-training`,
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

export const getOngoingData = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-ongoing-training`,
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

export const getCompletedData = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-completed-training`,
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
