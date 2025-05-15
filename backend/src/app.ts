import express from "express";
import LoadEnv, { PORT } from "./config/config";
import { connectMongo } from "./db/db";
import logRequest from "./middlewares/requestLogger";
import Handle404 from "./middlewares/404";
import handleError from "./middlewares/error";
import { adminRouter, attendanceRouter, employeeRouter } from "./routes/routes";
import cors from "cors"

LoadEnv();
connectMongo();
const app = express();

app.use(cors())
app.use(express.json());
app.use(logRequest);
app.use("/api/admin", adminRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/attendance", attendanceRouter)

app.get("/", (req, res) => {
  res.send("<h1>IPS' Radaur</h1>\nBackend is up and running :)");
});

app.use(Handle404);
app.use(handleError);

export default app;