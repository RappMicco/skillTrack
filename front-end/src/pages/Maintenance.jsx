import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaintenanceSection } from "../components/MaintenanceSection.jsx";
import { EmployeeRegistrationSection } from "../components/EmployeeRegistrationSection.jsx";
import { SkillCompetencySection } from "../components/SkillCompetencySection.jsx";
import { SkillMatrixAssignmentSection } from "../components/SkillMatrixAssignmentSection.jsx";
import {
  fetchSkills,
  createSkill,
  updateSkill,
  fetchProficiencies,
  createProficiency,
  updateProficiency,
  fetchTrainingProviders,
  createTrainingProvider,
  updateTrainingProvider,
  fetchCompetencies,
  createCompetency,
  updateCompetency,
  fetchEmployeeList,
  registerEmployee,
  updateEmployee,
  fetchSkillCompetencies,
  createSkillCompetency,
  updateSkillCompetency,
  fetchSkillMatrixAssignments,
  createSkillMatrixAssignment,
  updateSkillMatrixAssignment,
} from "../features/maintenance/maintenanceThunk.js";
import { clearMaintenanceError } from "../features/maintenance/maintenanceSlice.js";

const tabs = [
  "Skills",
  "Proficiency Levels",
  "Training Providers",
  "Competencies",
  "Employees",
  "Skill Assignments",
  "Employee Skills",
];

export const Maintenance = () => {
  const dispatch = useDispatch();
  const {
    skills,
    proficiencies,
    trainingProviders,
    competencies,
    employees,
    skillCompetencies,
    skillMatrixAssignments,
    loading,
    saving,
    error,
  } = useSelector((state) => state.maintenance);

  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await Promise.all([
          dispatch(fetchSkills()),
          dispatch(fetchProficiencies()),
          dispatch(fetchTrainingProviders()),
          dispatch(fetchCompetencies()),
          dispatch(fetchEmployeeList()),
          dispatch(fetchSkillCompetencies()),
          dispatch(fetchSkillMatrixAssignments()),
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, [dispatch]);

  const competencyRows = useMemo(
    () =>
      competencies.map((item) => ({
        competencyId: item.competencyId,
        competency: item.competencyName,
        skillCount: item.skills?.length ?? 0,
      })),
    [competencies],
  );

  const handleCreateSkill = async (values) => {
    try {
      await dispatch(createSkill(values)).unwrap();
      await dispatch(fetchSkills());
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdateSkill = async (id, values) => {
    try {
      await dispatch(updateSkill({ id, ...values })).unwrap();
      await dispatch(fetchSkills());
      return true;
    } catch {
      return false;
    }
  };

  const handleCreateProficiency = async (values) => {
    try {
      await dispatch(createProficiency(values)).unwrap();
      await dispatch(fetchProficiencies());
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdateProficiency = async (id, values) => {
    try {
      await dispatch(updateProficiency({ id, ...values })).unwrap();
      await dispatch(fetchProficiencies());
      return true;
    } catch {
      return false;
    }
  };

  const handleCreateTrainingProvider = async (values) => {
    try {
      await dispatch(createTrainingProvider(values)).unwrap();
      await dispatch(fetchTrainingProviders());
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdateTrainingProvider = async (id, values) => {
    try {
      await dispatch(updateTrainingProvider({ id, ...values })).unwrap();
      await dispatch(fetchTrainingProviders());
      return true;
    } catch {
      return false;
    }
  };

  const handleCreateCompetency = async (values) => {
    try {
      await dispatch(createCompetency(values)).unwrap();
      await dispatch(fetchCompetencies());
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdateCompetency = async (id, values) => {
    try {
      await dispatch(updateCompetency({ id, ...values })).unwrap();
      await dispatch(fetchCompetencies());
      return true;
    } catch {
      return false;
    }
  };

  const handleRegisterEmployee = async (values) => {
    try {
      await dispatch(registerEmployee(values)).unwrap();
      await dispatch(fetchEmployeeList());
      return true;
    } catch {
      return false;
    }
  };

  const handleAssignSkillCompetency = async (values) => {
    try {
      await dispatch(createSkillCompetency(values)).unwrap();
      await dispatch(fetchSkillCompetencies());
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdateEmployee = async (id, values) => {
    try {
      await dispatch(updateEmployee({ id, ...values })).unwrap();
      await dispatch(fetchEmployeeList());
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdateSkillCompetency = async (id, values) => {
    try {
      await dispatch(updateSkillCompetency({ id, ...values })).unwrap();
      await dispatch(fetchSkillCompetencies());
      return true;
    } catch {
      return false;
    }
  };

  const handleAssignSkillMatrix = async (values) => {
    try {
      await dispatch(createSkillMatrixAssignment(values)).unwrap();
      await dispatch(fetchSkillMatrixAssignments());
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdateSkillMatrix = async (id, values) => {
    try {
      await dispatch(updateSkillMatrixAssignment({ id, ...values })).unwrap();
      await dispatch(fetchSkillMatrixAssignments());
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-[linear-gradient(to_right,#001A31_30%,#2A2C8D_100%)] rounded-[20px] px-4 py-3">
        <h1 className="text-md font-semibold text-[#E7EFF0]/70 tracking-wide">
          Maintenance
        </h1>
        <p className="text-xs text-[#E7EFF0]/40 tracking-wide">
          Keeping system data accurate and up-to-date
        </p>
      </div>

      {/* tabs */}
      <div className="flex item-center gap-1 p-1 overflow-x-auto rounded-xl bg-[#0F172A] border border-[#06B6D4]/13 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              dispatch(clearMaintenanceError());
            }}
            className={`shrink-0 flex items-center justify-center rounded-lg px-3 py-1.5 text-xs tracking-wider transition-colors duration-300
                        ${
                          activeTab === tab
                            ? "border border-[#06B6D4]/20 bg-[#06B6D4]/42 text-white"
                            : "cursor-pointer text-slate-500 shadow-md hover:bg-white/5 hover:text-slate-300"
                        }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Skills" && (
        <MaintenanceSection
          title="Skills"
          description="Skills tracked across the skill matrix, grouped by category."
          rows={skills}
          loading={loading}
          saving={saving}
          error={error}
          fields={[
            { key: "skillName", label: "Skill Name" },
            { key: "category", label: "Category" },
          ]}
          onCreate={handleCreateSkill}
          onUpdate={handleUpdateSkill}
          emptyMessage="No skills found."
        />
      )}

      {activeTab === "Proficiency Levels" && (
        <MaintenanceSection
          title="Proficiency Levels"
          description="Sequence is assigned automatically based on creation order."
          rows={proficiencies}
          loading={loading}
          saving={saving}
          error={error}
          readOnlyColumns={[{ key: "sequence", label: "Seq" }]}
          fields={[
            { key: "level", label: "Level" },
            { key: "description", label: "Description" },
          ]}
          onCreate={handleCreateProficiency}
          onUpdate={handleUpdateProficiency}
          emptyMessage="No proficiency levels found."
        />
      )}

      {activeTab === "Training Providers" && (
        <MaintenanceSection
          title="Training Providers"
          description="Trainings and the providers that deliver them."
          rows={trainingProviders}
          loading={loading}
          saving={saving}
          error={error}
          fields={[
            { key: "trainingName", label: "Training Name" },
            { key: "trainingProvider", label: "Provider" },
            { key: "trainingDescription", label: "Description" },
          ]}
          onCreate={handleCreateTrainingProvider}
          onUpdate={handleUpdateTrainingProvider}
          emptyMessage="No training providers found."
        />
      )}

      {activeTab === "Competencies" && (
        <MaintenanceSection
          title="Competencies"
          description="Competency groups used to organize skills in the skill matrix."
          rows={competencyRows}
          loading={loading}
          saving={saving}
          error={error}
          idKey="competencyId"
          readOnlyColumns={[{ key: "skillCount", label: "Skills" }]}
          fields={[{ key: "competency", label: "Competency Name" }]}
          onCreate={handleCreateCompetency}
          onUpdate={handleUpdateCompetency}
          emptyMessage="No competencies found."
        />
      )}

      {activeTab === "Employees" && (
        <EmployeeRegistrationSection
          rows={employees}
          loading={loading}
          saving={saving}
          error={error}
          onRegister={handleRegisterEmployee}
          onUpdate={handleUpdateEmployee}
        />
      )}

      {activeTab === "Skill Assignments" && (
        <SkillCompetencySection
          skills={skills}
          competencies={competencies}
          assignments={skillCompetencies}
          loading={loading}
          saving={saving}
          error={error}
          onAssign={handleAssignSkillCompetency}
          onUpdate={handleUpdateSkillCompetency}
        />
      )}

      {activeTab === "Employee Skills" && (
        <SkillMatrixAssignmentSection
          employees={employees}
          skills={skills}
          proficiencies={proficiencies}
          assignments={skillMatrixAssignments}
          loading={loading}
          saving={saving}
          error={error}
          onAssign={handleAssignSkillMatrix}
          onUpdate={handleUpdateSkillMatrix}
        />
      )}
    </div>
  );
};
