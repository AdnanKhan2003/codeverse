import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../lib/standardize/asyncHandler";
import { APIResponse } from "../lib/standardize/APIResponse";
import { OK } from "../constants/http";

const healthCheck = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    return res
      .status(OK)
      .json(new APIResponse(OK, { status: "Healthy" }, "API is Working"));
  }
);

export { healthCheck };
