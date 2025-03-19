import { Request, Response } from "express";
import employeeModel from "../../models/employee";

export async function updateEmployee(req: Request, res: Response) {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedUser = await employeeModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({
        status: false,
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      status: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error,
    });
  }
}
