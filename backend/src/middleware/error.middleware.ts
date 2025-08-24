import { NextFunction, Request, Response } from "express";

import { APIError } from "../lib/standardize/APIError";
import { INTERNAL_SERVER_ERROR } from "../constants/http";

const errorHandler = (error: APIError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || INTERNAL_SERVER_ERROR;
    const message = error.message || "Something Went Wrong!";
    const success = error.success || false;
    const status = "error";

    return res.status(statusCode).json({
        message,
        success,
        status
    });
};

export { errorHandler };