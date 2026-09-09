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

export const getCompetencyData = async () => {
  const response = await fetch(`${VITE_API_URL}/dashboard/get-competency`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const getEmployees = async () => {
  const response = await fetch(`${VITE_API_URL}/dashboard/get-employees`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const getSkillProficiencyLevels = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-skill-proficiency`,
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

export const getSkillMatrixCells = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-skill-matrix-cells`,
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

export const createSkillMatrixEntry = async ({ empId, skill, proficiency }) => {
  const response = await fetch(`${VITE_API_URL}/admin/create-skill-matrix`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ empId, skill, proficiency }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const updateSkillMatrixEntry = async ({
  id,
  empId,
  skill,
  proficiency,
}) => {
  const response = await fetch(
    `${VITE_API_URL}/admin/update-skill-matrix/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ empId, skill, proficiency }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const getPublicSkillMatrixSummary = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-public-skill-summary`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const getPublicTrainingSummary = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-public-training-summary`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const getPublicLearningCourses = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-public-training-provider`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};
