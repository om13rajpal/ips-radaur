import { NextFunction, Request, Response } from "express";

function logRequest(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.path} ${req.ip}`);
  next();
}

export default logRequest;
