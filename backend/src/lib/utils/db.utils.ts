import { neon } from "@neondatabase/serverless";
import {
  DATABSE_URL,
  DB_DATABASE,
  PG_HOST,
  PG_NAME,
  PG_PASSWORD,
  PG_USER,
} from "../../constants/env";

if (!DATABSE_URL) {
  throw new Error("Database Url is not defined in .env file");
}

const sql = neon(
  `${PG_NAME}://${PG_USER}:${PG_PASSWORD}@${PG_HOST}/${DB_DATABASE}?sslmode=require&channel_binding=require`
);

const initDB = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY NOT NULL,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        profilePic VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`CREATE TABLE IF NOT EXISTS projects(
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(255) NOT NULL,
      code VARCHAR(255),
      createdBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      projectLanguage VARCHAR(255) CHECK (projectLanguage IN("python", "javascript", "java", "cpp", "c", "go", "bash")),
      version VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    console.log("Database Initialized Successfully!");
  } catch(error) {
    console.log("DB Error: ", error)
  }
};

export { sql, initDB };