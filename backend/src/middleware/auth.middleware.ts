import { ACCESS_TOKEN_SECRET } from "../constants/env";
import { UNAUTHORIZED } from "../constants/http";
import { APIError } from "../lib/standardize/APIError";
import { asyncHandler } from "../lib/standardize/asyncHandler";
import { sql } from "../lib/utils/db.utils";
import { verifyToken } from "../lib/utils/jwt.utils";
import { AuthUser } from "../types/auth.types";
import { UserPayload } from "../types/interfaces";

const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.trim().replace("Bearer", "");

  if (!token) {
    throw new APIError(UNAUTHORIZED, "Unauthorized Request");
  }

  let decodedToken : UserPayload;

  try {
    const payload = verifyToken(token, ACCESS_TOKEN_SECRET);
    if(typeof payload === "string") {
        throw new APIError(UNAUTHORIZED, "Unauthorized Request");
    }
    decodedToken = payload as UserPayload;
  } catch (error) {
    throw new APIError(UNAUTHORIZED, "Invalid Token");
  }

  if(!decodedToken) {
    throw new APIError(UNAUTHORIZED, "Invalid Token");
  }

  const users = await sql`
    SELECT id, fullName, email, profilePic, createdAt
    FROM users
    WHERE id = ${Number(decodedToken.userId)}
  ` as AuthUser[];

  const user = users[0];

  if(!user) {
    throw new APIError(UNAUTHORIZED, "User Not Found!");
  }

  req.user = user;
  next();
});

export { protectRoute };
