import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error(`Missing Environment Variable for ${key}`);
  }

  return value;
};

const PORT = getEnv("PORT", "3000");
const PG_NAME = getEnv("DB_PGNAME");
const PG_USER = getEnv("DB_PGUSER");
const PG_PASSWORD = getEnv("DB_PGPASSWORD");
const PG_HOST = getEnv("DB_PGHOST");
const DB_DATABASE = getEnv("DB_DATABASE");
const CORS_ORIGIN = getEnv("CORS_ORIGIN");
const NODE_ENV = getEnv("NODE_ENV");
const CLOUD_NAME = getEnv("CLOUD_NAME");
const API_KEY = getEnv("API_KEY");
const API_SECRET = getEnv("API_SECRET");
const DATABSE_URL = `${PG_NAME}://${PG_USER}:${PG_PASSWORD}@${PG_HOST}/${DB_DATABASE}?sslmode=require&channel_binding=require`;
const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");
const ACCESS_TOKEN_EXPIRY = getEnv("ACCESS_TOKEN_EXPIRY");
const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET");
const REFRESH_TOKEN_EXPIRY = getEnv("REFRESH_TOKEN_EXPIRY");

export {
  PORT,
  PG_NAME,
  PG_USER,
  PG_PASSWORD,
  PG_HOST,
  DB_DATABASE,
  CORS_ORIGIN,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  DATABSE_URL,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  NODE_ENV
};
