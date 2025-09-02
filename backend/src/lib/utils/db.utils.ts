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
        profilePic VARCHAR(255) DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        refreshToken TEXT,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`CREATE TABLE IF NOT EXISTS projects(
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(255) NOT NULL,
      code VARCHAR(255),
      createdBy INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      projectLanguage VARCHAR(255) CHECK (projectLanguage IN('python', 'javascript', 'java', 'cpp', 'c', 'go', 'bash')),
      version VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT NOW(),
      updatedAt TIMESTAMP DEFAULT NOW()
    )`;
    console.log("Database Initialized Successfully!");
  } catch(error) {
    console.log("DB Error: ", error)
  }
};

export { sql, initDB };