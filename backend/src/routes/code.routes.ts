import express from "express";
import { executeCode, getRuntimes } from "../controllers/code.controllers";
import { codeValidations } from "../validations/code.validations";
import { protectRoute } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";

const router = express.Router();

router.get('/runtimes', protectRoute, getRuntimes);

router.post('/execute-code', protectRoute, codeValidations, validate, executeCode);

export default router;