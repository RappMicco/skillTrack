import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Employee } from "../models/employeesModel.js";

export const checkEmployeeId = async (req, res) => {
  try {
    const { empId } = req.body;

    const employee = await Employee.findOne({ empId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee ID not found!",
      });
    }

    const token = jwt.sign(
      {
        id: employee._id,
        empId: employee.empId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Employee ID is valid!",
      token,
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
