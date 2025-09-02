import { APIResponseInterface } from "../../types/interfaces";

class APIResponse<T> implements APIResponseInterface<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: T, message: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { APIResponse };
