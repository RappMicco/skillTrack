export const getFilteredCompetency = (competency, competencyName) => {
  if (competencyName === "All") return competency;

  return competency.filter((item) => item.competencyName === competencyName);
};

export const getFilteredEmployees = (employees, search, group) => {
  const searchValue = search.trim().toLowerCase();

  return employees.filter((emp) => {
    const matchesSearch =
      !searchValue ||
      emp.fullName?.toLowerCase().includes(searchValue) ||
      emp.empId?.toLowerCase().includes(searchValue);
    const matchesGroup = group === "All" || emp.group === group;

    return matchesSearch && matchesGroup;
  });
};

export const buildCellMap = (cells) => {
  const map = {};
  cells.forEach((cell) => {
    map[`${cell.empId}_${cell.skill}`] = {
      matrixId: cell._id,
      proficiency: cell.proficiency,
      sequence: cell.sequence,
    };
  });
  return map;
};

export const getCompetencyNames = (competency) =>
  competency.map((item) => item.competencyName).sort();
