import jwt from "jsonwebtoken";
import { Employee } from "../models/employeesModel.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token provided!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        message: "Not authorized, invalid token payload!",
      });
    }

    const user = await Employee.findById(decoded.id).select(
      "-password -isActive",
    );

    if (!user) {
      return res.status(401).json({
        message: "Not authorized, user not found!",
      });
    }

    if (user.group !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};
