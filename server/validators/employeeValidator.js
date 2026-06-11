import { body } from "express-validator";

export const validateEmployeeId = [
  body("empId")
    .notEmpty()
    .withMessage("Employee ID is required!")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("Employee ID must be 6 characters")
    .matches(/^SP\d{4}$/)
    .withMessage("Invalid Employee ID format"),
];
