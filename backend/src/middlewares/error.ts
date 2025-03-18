import { Request, Response, NextFunction } from "express";

function handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    res.status(500).send("Internal Server Error");
}

export default handleError