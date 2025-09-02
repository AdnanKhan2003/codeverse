import { check } from "express-validator";

const codeValidations = [
  check("language")
    .isString()
    .withMessage("Language Must be a String")
    .trim()
    .notEmpty()
    .withMessage("Language is Required"),
  check("version").optional().isString().withMessage("Version Must be a String").trim(),
  check("code")
    .isString()
    .withMessage("Code Must be a String")
    .trim()
    .notEmpty()
    .withMessage("Code is Required"),
];

export { codeValidations };
