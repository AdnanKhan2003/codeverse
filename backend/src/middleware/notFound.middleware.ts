import { NextFunction, Request, Response } from "express";

import { NOT_FOUND } from "../constants/http";
import { APIError } from "../lib/standardize/APIError";
import { asyncHandler } from "../lib/standardize/asyncHandler";

const notFoundHandler = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    throw new APIError(NOT_FOUND, `Path ${req.originalUrl} Doesn't Exist, Maybe there's some Typo`);
});

export { notFoundHandler };