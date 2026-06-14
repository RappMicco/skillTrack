import { body } from "express-validator";
import { Employee } from "../models/employeesModel.js";
import { SkillProficiency } from "../models/skillProficiencyModel.js";

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

export const validateTrainingProvider = [
  body("trainingName")
    .customSanitizer(normalizeSpaces)
    .notEmpty()
    .withMessage("Training Name is required")
    .trim(),

  body("trainingProvider")
    .customSanitizer(normalizeSpaces)
    .notEmpty()
    .withMessage("Training provider is required")
    .trim(),
];

export const validateSkillCategory = [
  body("skillName").notEmpty().withMessage("Skill name is required!").trim(),
  body("category").notEmpty().withMessage("Category is required!").trim(),
];

export const validateSkillProficiency = [
  body("description").notEmpty().withMessage("Description is required!").trim(),
];
