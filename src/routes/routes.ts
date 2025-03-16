import { Router } from "express";
import { login, signUp } from "./user/auth";
import { employeeLogin, employeeSignUp } from "./employee/auth";
import { getEmployee, getEmployees } from "./employee/get";
const adminRouter = Router();
const employeeRouter = Router();

adminRouter.post("/signup", signUp);
adminRouter.post("/login", login);

employeeRouter.post("/signup", employeeSignUp);
employeeRouter.post("/login", employeeLogin);

employeeRouter.get("/all", getEmployees)
employeeRouter.get("/:id", getEmployee)

export { adminRouter, employeeRouter };
