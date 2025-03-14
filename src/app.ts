import express from "express";
import { PORT } from "./config/config";
import { connectMongo } from "./db/db";
import logRequest from "./middlewares/requestLogger";
import Handle404 from "./middlewares/404";
import handleError from "./middlewares/error";

const app = express();
connectMongo();

app.use(express.json());
app.use(logRequest);

app.get("/", (req, res) => {
  res.send("<h1>IPS' Radaur</h1>\nBackend is up and running :)");
});

app.use(Handle404);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
