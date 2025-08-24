export interface APIResponseInterface {
  statusCode: number;
  data: object;
  message: string;
  success: boolean;
}

export interface APIErrorInterface {
  statusCode: number;
  data: null;
  message: string;
  success: boolean;
  errors: unknown[] | string;
  stack: string | undefined;
}
