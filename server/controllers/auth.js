import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Employee } from "../models/employeesModel.js";

export const checkEmployeeId = async (req, res) => {
  try {
    const { empId, password } = req.body;

    const employee = await Employee.findOne({ empId }).select("+password");

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

    const employeeData = await Employee.findById(employee._id).select(
      "-password",
    );

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid employee ID / password!",
      });
    }
    //create token
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
    //create cookies to store token
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      data: employeeData,
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
      password: hashedPassword,
      firstName,
      lastName,
      empLevel,
      group,
    });

    res.status(201).json({
      success: true,
      message: `${empId} added successfully!`,
    });
  } catch (error) {
    console.error("Register error: ", error);
    return res.status(500).json({
      message: "Server error during registration!",
      error: error.message,
    });
  }
};

export const updateEmployeeData = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee details updated successfully!",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Update error: ", error);
    return res.status(500).json({
      success: false,
      message: "Server error during updating employee data!",
      error: error.message,
    });
  }
};
