import { Router } from "express";
import { login, signUp } from "./user/auth";
import { employeeLogin, employeeSignUp } from "./employee/auth";
import { getEmployee, getEmployees } from "./employee/get";
import attendanceHandler, { getAttendance } from "./attendance/attendance";
import { updateEmployee } from "./employee/update";

const adminRouter = Router();
const employeeRouter = Router();
const attendanceRouter = Router();

adminRouter.post("/signup", signUp);
adminRouter.post("/login", login);

employeeRouter.post("/signup", employeeSignUp);
employeeRouter.post("/login", employeeLogin);

employeeRouter.get("/all", getEmployees);
employeeRouter.get("/:id", getEmployee);

employeeRouter.put("/:id", updateEmployee);

attendanceRouter.post("/:id", attendanceHandler);
attendanceRouter.get("/:id", getAttendance);

export { adminRouter, employeeRouter, attendanceRouter };
