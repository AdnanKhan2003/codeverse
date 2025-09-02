import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { APIError } from "../lib/standardize/APIError";
import { BAD_REQUEST } from "../constants/http";

const validate = (req: Request, res: Response, next: NextFunction) => {   
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => err.msg);
        return next(new APIError(BAD_REQUEST, extractedErrors.join(", ")));
    }

    next();
};

export { validate };