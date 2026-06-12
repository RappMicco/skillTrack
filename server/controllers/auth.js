import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Employee } from "../models/employeesModel.js";

export const checkEmployeeId = async (req, res) => {
  try {
    const { empId, password } = req.body;

    const employee = await Employee.findOne({ empId });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Invalid employee ID / password!",
      });
    }

    if (!employee.isActive) {
      return res.status(404).json({
        success: false,
        message: "Invalid employee id!",
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID / password!",
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

    setToken;

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error!",
    });
  }
};

export const registerEmployee = async (req, res) => {
  try {
    const { empId, password, firstName, lastName, empLevel, group } = req.body;

    const existingUser = await Employee.findOne({ empId });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Employee id is already registered!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Employee.create({
      empId,
      password,
      firstName,
      lastName,
      empLevel,
      group,
    });
  } catch (error) {}
};
