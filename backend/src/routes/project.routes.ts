import express from "express";

import { createProject, deleteProject, getProject, getProjects, updateProject, updateProjectName } from "../controllers/project.controllers";
import { protectRoute } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createProjectValidations } from "../validations/project.validations";

const router = express.Router();

router.post('/create', protectRoute, createProjectValidations, validate, createProject);

router.get('/', protectRoute, getProjects);

router.get('/:projectId', protectRoute, getProject);

router.post('/update/:projectId', protectRoute, updateProject);

router.delete('/delete/:projectId', protectRoute, deleteProject);

router.post('/update/project-name/:projectId', protectRoute, updateProjectName);

export default router;