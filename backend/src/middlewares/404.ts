import { NextFunction, Request, Response } from "express";

function Handle404(req: Request, res: Response, next: NextFunction) {
    res.status(404).send("404 Not Found")
}

export default Handle404;