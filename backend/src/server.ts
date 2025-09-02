import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import healthCheckRoute from "./routes/healthcheck.routes";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import codeRoutes from "./routes/code.routes";

import { CORS_ORIGIN } from "./constants/env";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";

const app: Application = express();

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use('/api/health', healthCheckRoute);
app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/code', codeRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
