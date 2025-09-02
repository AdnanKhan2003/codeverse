import { APIErrorInterface } from "../../types/interfaces";

class APIError extends Error implements APIErrorInterface {
  statusCode: number;
  data: null;
  success: boolean;
  errors: unknown[] | string;
  stack: string | undefined;

  constructor(
    statusCode: number,
    message: string,
    errors: unknown[] | string = "",
    stack: string | undefined = ""
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { APIError };
