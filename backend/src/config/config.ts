import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, "../.env");

dotenv.config({
  path: envPath
});

export var PORT : string;
export var MONGO_URI : string;
export var JWT_SECRET : string;
export var EMAIL : string;
export var EMAIL_PASSWORD : string;

function LoadEnv(){
  PORT = process.env.PORT || "3000";
  MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ips-radaur";
  JWT_SECRET = process.env.JWT_SECRET || "secret"
  EMAIL = process.env.EMAIL || "";
  EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
}

export default LoadEnv