import express from "express";

import { registerUser, loginUser } from "../controllers/auth.controllers";
import { loginValidation, signupValidation } from "../validations/auth.validations";

const router = express.Router();

router.post('/signup', signupValidation, registerUser);

router.post('/login', loginValidation, loginUser);

export default router;