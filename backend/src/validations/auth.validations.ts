import { check } from "express-validator";

const signupValidation = [
  check("fullName").trim().not().isEmpty().isLength({ min: 3 }),
  check("email").isEmail().normalizeEmail(),
  check("password").isAlphanumeric().isLength({ min: 5 }),
  check("profilePic").trim().not().isEmpty(),
];

const loginValidation = [
  check("email").isEmail().normalizeEmail(),
  check("password").isAlphanumeric().isLength({ min: 5 }),
];

export { signupValidation, loginValidation };