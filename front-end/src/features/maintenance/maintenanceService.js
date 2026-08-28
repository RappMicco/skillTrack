const VITE_API_URL = import.meta.env.VITE_API_URL;

// ==================== Skills ====================
export const getSkillList = async () => {
  const response = await fetch(`${VITE_API_URL}/dashboard/get-skill-category`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const createSkillEntry = async ({ skillName, category }) => {
  const response = await fetch(`${VITE_API_URL}/admin/create-skill-category`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skillName, category }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const updateSkillEntry = async ({ id, skillName, category }) => {
  const response = await fetch(
    `${VITE_API_URL}/admin/update-skill-category/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skillName, category }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

// ==================== Skill Proficiency ====================
export const getProficiencyList = async () => {
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

export const createProficiencyEntry = async ({ level, description }) => {
  const response = await fetch(
    `${VITE_API_URL}/admin/create-skill-proficiency`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, description }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const updateProficiencyEntry = async ({ id, level, description }) => {
  const response = await fetch(
    `${VITE_API_URL}/admin/update-skill-proficiency/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, description }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

// ==================== Training Providers ====================
export const getTrainingProviderList = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-training-provider`,
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

export const createTrainingProviderEntry = async ({
  trainingName,
  trainingProvider,
  trainingDescription,
}) => {
  const response = await fetch(`${VITE_API_URL}/admin/create-training`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      trainingName,
      trainingProvider,
      trainingDescription,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const updateTrainingProviderEntry = async ({
  id,
  trainingName,
  trainingProvider,
  trainingDescription,
}) => {
  const response = await fetch(
    `${VITE_API_URL}/admin/update-training-provider/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trainingName,
        trainingProvider,
        trainingDescription,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

// ==================== Employees ====================
export const getEmployeeList = async () => {
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

export const registerEmployeeEntry = async ({
  empId,
  password,
  firstName,
  lastName,
  empLevel,
  group,
}) => {
  const response = await fetch(`${VITE_API_URL}/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      empId,
      password,
      firstName,
      lastName,
      empLevel,
      group,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const updateEmployeeEntry = async ({
  id,
  empId,
  password,
  firstName,
  lastName,
  empLevel,
  group,
}) => {
  const payload = { empId, firstName, lastName, empLevel, group };
  if (password) payload.password = password;

  const response = await fetch(`${VITE_API_URL}/update/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

// ==================== Skill Competency ====================
export const getSkillCompetencyList = async () => {
  const response = await fetch(
    `${VITE_API_URL}/dashboard/get-skill-competency`,
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

export const createSkillCompetencyEntry = async ({
  competencyId,
  skillId,
}) => {
  const response = await fetch(
    `${VITE_API_URL}/admin/create-skill-competency`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ competencyId, skillId }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const updateSkillCompetencyEntry = async ({
  id,
  competencyId,
  skillId,
}) => {
  const response = await fetch(
    `${VITE_API_URL}/admin/update-skill-competency/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ competencyId, skillId }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

// ==================== Competencies ====================
export const getCompetencyList = async () => {
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

export const createCompetencyEntry = async ({ competency }) => {
  const response = await fetch(`${VITE_API_URL}/admin/create-competency`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ competency }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};

export const updateCompetencyEntry = async ({ id, competency }) => {
  const response = await fetch(
    `${VITE_API_URL}/admin/update-competency/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ competency }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw { response: { data } };
  }

  return data;
};
