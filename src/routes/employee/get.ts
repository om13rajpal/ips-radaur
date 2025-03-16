import { Request, Response } from "express";
import employeeModel from "../../models/employee";

export async function getEmployees(req: Request, res: Response) {
  try {
    const users = await employeeModel.find({});
    res.json({
      status: true,
      message: "All employees",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function getEmployee(req: Request, res: Response) {
  const employeeId = req.params.id;

  try {
    const employee = await employeeModel.findById(employeeId);
    if (!employee) {
      res.status(404).json({
        status: false,
        message: "Employee not found",
      });
      return;
    }

    res.json({
      status: true,
      message: "Employee found",
      data: employee,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
}
