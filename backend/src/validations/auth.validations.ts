import { check } from "express-validator";

const signupValidation = [
  check("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full Name is Required")
    .isLength({ min: 3 })
    .withMessage("Full Name must be atleast 3 characters Long!"),
  check("email").isEmail().withMessage("Invalid Email ID").normalizeEmail(),
  check("password")
    .isAlphanumeric()
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 characters Long!")
];

const loginValidation = [
  check("email").isEmail().withMessage("Invalid Email ID").normalizeEmail(),
  check("password")
    .isAlphanumeric()
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 characters Long!"),
];

const refreshAccessTokenValidation = [
  check('refreshAccessToken')
  .exists().withMessage("Refresh Token is Required!")
  .isString().withMessage("Refresh Token must be String!")
  .notEmpty().withMessage("Refresh Token cannot be Empty!")
];

export { signupValidation, loginValidation, refreshAccessTokenValidation };
