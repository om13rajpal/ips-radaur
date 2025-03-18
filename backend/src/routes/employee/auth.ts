import { Request, Response } from "express";
import employee, { Employee } from "../../models/employee";
import { generateToken, TokenData } from "../../utils/generateToken";
import { comparePassword, hashPassword } from "../../utils/password";

export async function employeeSignUp(req: Request, res: Response) {
  const employeeBody: Employee = req.body;

  try {
    employeeBody.password = await hashPassword(employeeBody.password);
    const createEmployee = new employee(employeeBody);
    const savedEmployee = await createEmployee.save();

    if (!savedEmployee) {
      res.status(400).send("Employee not created");
      return;
    }

    const tokenData: TokenData = {
      id: savedEmployee._id,
      username: savedEmployee.name,
    };

    const token = generateToken(tokenData, 3600);

    res.status(201).json({
      status: true,
      message: "Employee created successfully",
      data: savedEmployee,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
}

export async function employeeLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const findEmployee = await employee.findOne({
      email: email,
    });

    if (!findEmployee) {
      res.status(404).send("Employee not found");
      return;
    }

    const isValidPassword = await comparePassword(
      password,
      findEmployee.password
    );
    if (!isValidPassword) {
      res.status(400).send("Invalid password");
      return;
    }

    const tokenData: TokenData = {
      id: findEmployee._id,
      username: findEmployee.name,
    };

    const token = generateToken(tokenData, 3600);

    res.status(200).json({
      status: true,
      message: "Employee login successful",
      data: findEmployee,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
}
