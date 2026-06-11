import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
  const erros = validateResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.message,
      })),
    });
  }
};
