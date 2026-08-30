import { body } from "express-validator";
import { Employee } from "../models/employeesModel.js";

const normalizeSpaces = (value) => {
  return value.trim().replace(/\s+/g, " ");
};

export const validateEmployeeId = [
  body("empId").notEmpty().withMessage("Employee ID is required!"),
  body("password").notEmpty().withMessage("Password is required!"),
];

export const validateRegistration = [
  body("empId")
    .notEmpty()
    .withMessage("Employee ID is required!")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("Employee ID must be 6 characters!")
    .matches(/^SP\d{4}$/)
    .withMessage("Invalid Employee ID format!"),

  body("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters!")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter!")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number!"),

  body("firstName")
    .customSanitizer(normalizeSpaces)
    .notEmpty()
    .withMessage("First name is required!")
    .matches(/[A-Z]/)
    .withMessage("First name must contain at least one uppercase letter!")
    .custom(async (value) => {
      const employee = await Employee.findOne({ firstName: value });

      if (employee) {
        throw new Error(`${employee.firstName} already exist!`);
      }

      return true;
    }),

  body("lastName")
    .customSanitizer(normalizeSpaces)
    .notEmpty()
    .withMessage("First name is required!")
    .matches(/[A-Z]/)
    .withMessage("Last name must contain at least one uppercase letter!")
    .custom(async (value) => {
      const employee = await Employee.findOne({ lastName: value });

      if (employee) {
        throw new Error(`${employee.lastName} already exist!`);
      }

      return true;
    }),

  body("empLevel")
    .notEmpty()
    .withMessage("Employee level is required!")
    .matches(/[A-Z]/)
    .withMessage("Employee level must contain at least one uppercase letter!")
    .matches(/[0-9]/)
    .withMessage("Employee level must contain at least one number!"),

  body("group").notEmpty().withMessage("Group is required!"),
];

export const validateUpdateEmployee = [
  body("empId")
    .notEmpty()
    .withMessage("Employee ID is required!")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("Employee ID must be 6 characters!")
    .matches(/^SP\d{4}$/)
    .withMessage("Invalid Employee ID format!"),

  body("password")
    .optional({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters!")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter!")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number!"),

  body("firstName")
    .customSanitizer(normalizeSpaces)
    .notEmpty()
    .withMessage("First name is required!")
    .matches(/[A-Z]/)
    .withMessage("First name must contain at least one uppercase letter!"),

  body("lastName")
    .customSanitizer(normalizeSpaces)
    .notEmpty()
    .withMessage("First name is required!")
    .matches(/[A-Z]/)
    .withMessage("Last name must contain at least one uppercase letter!"),

  body("empLevel")
    .notEmpty()
    .withMessage("Employee level is required!")
    .matches(/[A-Z]/)
    .withMessage("Employee level must contain at least one uppercase letter!")
    .matches(/[0-9]/)
    .withMessage("Employee level must contain at least one number!"),

  body("group").notEmpty().withMessage("Group is required!"),
];

export const validateTrainingProvider = [
  body("trainingName")
    .customSanitizer(normalizeSpaces)
    .notEmpty()
    .withMessage("Training Name is required!")
    .trim(),

  body("trainingProvider")
    .customSanitizer(normalizeSpaces)
    .notEmpty()
    .withMessage("Training provider is required!")
    .trim(),

  body("trainingDescription")
    .customSanitizer(normalizeSpaces)
    .notEmpty()
    .withMessage("Training description is required!")
    .trim(),
];

export const validateSkillCategory = [
  body("skillName").notEmpty().withMessage("Skill name is required!").trim(),
  body("category").notEmpty().withMessage("Category is required!").trim(),
];

export const validateSkillProficiency = [
  body("description").notEmpty().withMessage("Description is required!").trim(),
];

export const validateSkillMatrix = [
  body("empId")
    .notEmpty()
    .withMessage("Employee id is required!")
    .isMongoId()
    .withMessage("Invalid employee id!"),
  body("skill")
    .notEmpty()
    .withMessage("Skill is required!")
    .isMongoId()
    .withMessage("Invalid skill id!"),
  body("proficiency")
    .notEmpty()
    .withMessage("Proficiency is required!")
    .isMongoId()
    .withMessage("Invalid proficiency id!"),
];

export const validateAssignTraining = [
  body("empId").notEmpty().withMessage("Employee name is required!"),

  body("trainingId").notEmpty().withMessage("Training name is required!"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required!")
    .custom((value, { req }) => {
      const startDate = new Date(value);
      const endDate = new Date(req.body.endDate);

      if (req.body.endDate && startDate > endDate) {
        throw new Error("Start Date cannot be greater than end date!");
      }

      return true;
    }),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required!")
    .custom((value, { req }) => {
      const endDate = new Date(value);
      const startDate = new Date(req.body.startDate);

      if (req.body.startDate && endDate < startDate) {
        throw new Error("End Date cannot be less than start date!");
      }

      return true;
    }),

  body("statusId").notEmpty().withMessage("Status is required!"),
];

export const validateCompetency = [
  body("competency").notEmpty().withMessage("Competency name is required!"),
];

export const validateSkillCompetency = [
  body("competencyId").notEmpty().withMessage("Competency is required!"),
  body("skillId").notEmpty().withMessage("Skill is required!"),
];
