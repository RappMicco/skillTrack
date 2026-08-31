import { createSlice } from "@reduxjs/toolkit";
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
  fetchSkillMatrixAssignments,
  createSkillMatrixAssignment,
  updateSkillMatrixAssignment,
  fetchEmployeeList,
  registerEmployee,
  updateEmployee,
  fetchSkillCompetencies,
  createSkillCompetency,
  updateSkillCompetency,
  fetchStatusTraining,
  assignTraining,
} from "./maintenanceThunk.js";

const initialState = {
  skills: [],
  proficiencies: [],
  trainingProviders: [],
  competencies: [],
  employees: [],
  skillCompetencies: [],
  skillMatrixAssignments: [],
  statusTraining: [],
  loading: false,
  saving: false,
  error: null,
};

const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    clearMaintenanceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // skills
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload?.data || [];
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSkill.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createSkill.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateSkill.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // proficiencies
      .addCase(fetchProficiencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProficiencies.fulfilled, (state, action) => {
        state.loading = false;
        state.proficiencies = action.payload?.data || [];
      })
      .addCase(fetchProficiencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProficiency.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createProficiency.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(createProficiency.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateProficiency.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateProficiency.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(updateProficiency.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // training providers
      .addCase(fetchTrainingProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.trainingProviders = action.payload?.data || [];
      })
      .addCase(fetchTrainingProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTrainingProvider.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createTrainingProvider.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(createTrainingProvider.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateTrainingProvider.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateTrainingProvider.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(updateTrainingProvider.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // competencies
      .addCase(fetchCompetencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompetencies.fulfilled, (state, action) => {
        state.loading = false;
        state.competencies = action.payload?.data || [];
      })
      .addCase(fetchCompetencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCompetency.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createCompetency.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(createCompetency.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateCompetency.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateCompetency.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(updateCompetency.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // skill matrix (employee skills)
      .addCase(fetchSkillMatrixAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillMatrixAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.skillMatrixAssignments = action.payload?.data || [];
      })
      .addCase(fetchSkillMatrixAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSkillMatrixAssignment.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createSkillMatrixAssignment.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(createSkillMatrixAssignment.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateSkillMatrixAssignment.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateSkillMatrixAssignment.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(updateSkillMatrixAssignment.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // employees
      .addCase(fetchEmployeeList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeList.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload?.data || [];
      })
      .addCase(fetchEmployeeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerEmployee.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(registerEmployee.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // skill competency
      .addCase(fetchSkillCompetencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillCompetencies.fulfilled, (state, action) => {
        state.loading = false;
        state.skillCompetencies = action.payload?.data || [];
      })
      .addCase(fetchSkillCompetencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSkillCompetency.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createSkillCompetency.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(createSkillCompetency.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateSkillCompetency.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateSkillCompetency.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(updateSkillCompetency.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // assign training
      .addCase(fetchStatusTraining.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatusTraining.fulfilled, (state, action) => {
        state.loading = false;
        state.statusTraining = action.payload?.summary || [];
      })
      .addCase(fetchStatusTraining.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(assignTraining.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(assignTraining.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(assignTraining.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      });
  },
});

export const { clearMaintenanceError } = maintenanceSlice.actions;

export default maintenanceSlice.reducer;
