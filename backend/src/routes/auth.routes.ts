import express from "express";

import { registerUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/auth.controllers";
import { loginValidation, refreshAccessTokenValidation, signupValidation } from "../validations/auth.validations";
import { upload } from "../middleware/multer.middleware";
import { validate } from "../middleware/validate.middleware";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post('/signup', upload, signupValidation, validate, registerUser);

router.post('/login', loginValidation, validate, loginUser);

router.post('/logout', protectRoute, logoutUser);

router.post('/refresh-token', protectRoute, refreshAccessTokenValidation, validate, refreshAccessToken);

export default router;