import { CONFLICT } from "../constants/http";
import { APIError } from "../lib/standardize/APIError";
import { asyncHandler } from "../lib/standardize/asyncHandler";
import { sql } from "../lib/utils/db.utils";

const registerUser = asyncHandler(async (req, res, next) => {
    const { fullName, email, password, profilePic } = req.body;

    const doesUserExists = await sql`
        SELECT * FROM users WHERE email = ${email}
    `

    if(doesUserExists) {
        throw new APIError(CONFLICT, "User with this Email Already Exists!");
    }

    
});

const loginUser = asyncHandler((req, res, next) => {
    
});

export { loginUser, registerUser };
