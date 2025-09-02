import { CREATED, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import { APIError } from "../lib/standardize/APIError";
import { APIResponse } from "../lib/standardize/APIResponse";
import { asyncHandler } from "../lib/standardize/asyncHandler";
import { sql } from "../lib/utils/db.utils";

const createProject = asyncHandler(async (req, res, next) => {
    const { name, code, projectLanguage, version } = req.body;
    const createdBy = Number(req.user?.id);

    console.log(name, code, projectLanguage, version, createdBy);
    
    if(!createdBy) {
        throw new APIError(UNAUTHORIZED, "User Not Authorized");
    }

    const [ newProject ] = await sql`
        INSERT INTO projects
        (name, code, createdBy, projectLanguage, version)
        VALUES
        (${name}, ${code}, ${createdBy}, ${projectLanguage}, ${version})
        RETURNING *
    `;

    if(!newProject) {
        throw new APIError(NOT_FOUND, "Failed to Create New Project!");
    }

    res.status(CREATED).json(
        new APIResponse(CREATED, newProject, "New Project Created Successfully!")
    );
});

const getProjects = asyncHandler(async (req, res, next) => {
    const createdBy = Number(req.user?.id);

    if(!createdBy) {
        throw new APIError(UNAUTHORIZED, "User Not Authorized");
    }

    const allProjects = await sql`
        SELECT * FROM projects
        WHERE createdBy = ${createdBy}
    `;

    res.status(OK).json(
        new APIResponse(OK, allProjects, "All Projects Fetched Successfully!")
    );
});

const getProject = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;
    const createdBy = req.user?.id;

    if(!createdBy) {
        throw new APIError(UNAUTHORIZED, "User Not Authorized");
    }

    const [ fetchedProject ] = await sql`
        SELECT * FROM projects
        WHERE id = ${projectId} AND createdBy = ${createdBy}
    `;

    if(!fetchedProject) {
        throw new APIError(NOT_FOUND, "Project Not Found or Failed to Get Project");
    }

    res.status(OK).json(
        new APIResponse(OK, fetchedProject, "Project Fetched Successfully!")
    );
});

const updateProject = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;
    const { code } = req.body;
    const createdBy = req.user?.id;

    if(!createdBy) {
        throw new APIError(UNAUTHORIZED, "User Not Authorized");
    }

    const [ updatedProject ] = await sql`
        UPDATE projects
        SET code = ${code}
        WHERE id = ${projectId} AND createdBy = ${createdBy}
        RETURNING *
    `;

    if(!updateProject) {
        throw new APIError(NOT_FOUND, "Project Not Found or Failed to Update Project");
    }

    res.status(OK).json(
        new APIResponse(OK, updatedProject, "Project Updated Sucessfully")
    );
});

const deleteProject = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;
    const createdBy = req.user?.id;

    if(!createdBy) {
        throw new APIError(UNAUTHORIZED, "User Not Authorized");
    }

    await sql`
        DELETE FROM projects
        WHERE id = ${projectId} AND createdBy = ${createdBy}
    `;

    res.status(OK).json(
        new APIResponse(OK, null, "Project Deleted Successfully!")
    );
});

const updateProjectName = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;
    const { name } = req.body;
    const createdBy = req.user?.id;

    if(!createdBy) {
        throw new APIError(UNAUTHORIZED, "User Not Authorized");
    }

    const [ updatedProjectName ] = await sql`
        UPDATE projects
        SET name = ${name}
        WHERE id = ${projectId} AND createdBy = ${createdBy}
        RETURNING *
    `;

    if(!updatedProjectName) {
        throw new APIError(NOT_FOUND, "Project Not Found or Failed to Update Project Name");
    }

    res.status(OK).json(
        new APIResponse(OK, updatedProjectName, "Project Name Updated Sucessfully!")
    );
});

export { createProject, getProjects, getProject, updateProject, deleteProject, updateProjectName };