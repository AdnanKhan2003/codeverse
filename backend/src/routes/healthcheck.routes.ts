import express from "express";

import { healthCheck } from "../controllers/healthcheck.controllers";

const router = express.Router();

router.get('/', healthCheck);

export default router;