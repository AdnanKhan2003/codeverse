import { RequestHandler } from "express";
import { DEFAULT_PROFILE_PIC } from "../constants/constants";
import { REFRESH_TOKEN_SECRET } from "../constants/env";
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "../constants/http";
import { APIError } from "../lib/standardize/APIError";
import { APIResponse } from "../lib/standardize/APIResponse";
import { asyncHandler } from "../lib/standardize/asyncHandler";
import { comparePassword, hashPassword } from "../lib/utils/bcrypt.utils";
import { uploadOnCloudinary } from "../lib/utils/cloudinary.utils";
import { sql } from "../lib/utils/db.utils";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../lib/utils/jwt.utils";
import { UserPayload } from "../types/interfaces";

const generateAccessTokenAndRefreshToken = async (userPayload: UserPayload) => {
  try {
    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    await sql`
            UPDATE users
            SET refreshToken = ${refreshToken}
            WHERE id = ${userPayload.userId}
        `;

    return { accessToken, refreshToken };
  } catch (error) {
    throw new APIError(INTERNAL_SERVER_ERROR, "Internal Server Error");
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  let profilePic;

  const [userExists] = await sql`
        SELECT * FROM users WHERE email = ${email}
    `;

  if (userExists) {
    throw new APIError(CONFLICT, "User with this Email Already Exists!");
  }

  if (req.file) {
    try {
      const uploadedProfilePic = await uploadOnCloudinary(req.file.path);
      profilePic = uploadedProfilePic?.secure_url;
    } catch (error) {
      throw new APIError(
        INTERNAL_SERVER_ERROR,
        "Failed to Upload Profile Picture Image"
      );
    }
  }

  const hashedPassword = await hashPassword(password);

  const [newUser] =
    await sql`INSERT INTO users (fullName, email, password, profilePic) VALUES (
        ${fullName},
        ${email},
        ${hashedPassword},
        ${profilePic ?? DEFAULT_PROFILE_PIC}
    )
    RETURNING id, fullName, email, profilePic, createdAt`;

  const userPayload: UserPayload = {
    userId: String(newUser.id)
  };

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(userPayload);

  return res
    .status(CREATED)
    .json(
      new APIResponse(
        CREATED,
        { user: newUser, accessToken, refreshToken },
        "User Signup Successful"
      )
    );
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const [user] = await sql`
        SELECT id, fullName, email, password, profilePic, createdAt FROM users
        WHERE email = ${email}
    `;

  if (!user) {
    throw new APIError(UNAUTHORIZED, "Invalid Email Or Password");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new APIError(UNAUTHORIZED, "Invalid Email or Password");
  }

  const userPayload: UserPayload = {
    userId: String(user.id)
  };

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(userPayload);

  res
    .status(OK)
    .json(
      new APIResponse(
        OK,
        { user, accessToken, refreshToken },
        "User Login Successful"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const { refreshToken: oldRefreshToken } = req.body;
  
  let decodedToken;

  try {
    decodedToken = verifyToken(oldRefreshToken, REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new APIError(FORBIDDEN, "Invalid or Expired Token");
  }

  const [user] = await sql`
        SELECT * FROM users
        WHERE refreshToken = ${oldRefreshToken}
    `;

  if (!user) {
    throw new APIError(NOT_FOUND, "User Not Authenticated");
  }

  const userPayload: UserPayload = {
    userId: String(user.id)
  };

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessTokenAndRefreshToken(userPayload);

  res
    .status(OK)
    .json(
      new APIResponse(
        OK,
        { accessToken, refreshToken: newRefreshToken },
        "New Refresh Token Generated"
      )
    );
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const id = req.user?.id;

  if(!id) {
    throw new APIError(BAD_REQUEST, "User ID is required for Logout");
  }

  await sql`
    UPDATE users
    SET refreshToken = NULL
    WHERE id = ${id}
  `;

  res.status(OK).json(
    new APIResponse(OK, null, "Logout Successful")
  );
});

const checkAuth = (asyncHandler(async (req, res, next) => {
  const id = req.user?.id;

  if(!id) {
    return new APIError(UNAUTHORIZED, "User Not Authenitcated!");
  }

  const [ user ] = await sql`
    SELECT 
    id, fullname, email, profilePic, refreshToken
    FROM users
    WHERE id = ${id}
  `;

  if(!user) {
    return new APIError(NOT_FOUND, "User Not Found");
  }

  res.status(OK).json(
    new APIResponse(OK, { user }, "User Authenticated")
  );
}));

export { loginUser, registerUser, refreshAccessToken, logoutUser, checkAuth };