import { JwtPayload } from "jsonwebtoken";

interface APIResponseInterface<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

interface APIErrorInterface {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
  errors: unknown[] | string;
  stack: string | undefined;
}

interface UserPayload extends JwtPayload {
  userId: string;
};

export { APIResponseInterface, APIErrorInterface, UserPayload };