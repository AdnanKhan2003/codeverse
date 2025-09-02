import { AuthUser } from "../auth.types";
import { File } from "multer";

declare module "express-serve-static-core" {
    namespace Express {
        interface Request {
            user?: AuthUser
            file?: File
        }
    }
}

// export {};