import { check } from "express-validator";
//  name, code, createdBy, verison
const createProjectValidations = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is Required")
    .isString()
    .withMessage("Name Must be a String"),
  check("code")
    .trim()
    .notEmpty()
    .withMessage("Code is Required")
    .isString()
    .withMessage("Code Must be a String"),
  check("projectLanguage")
    .trim()
    .notEmpty()
    .withMessage("Project Language is Required")
    .isString()
    .withMessage("Project Language Must be a String"),
  check("version")
    .optional()
    .trim()
    .isString()
    .withMessage("Name Must be a String"),
];

export { createProjectValidations };