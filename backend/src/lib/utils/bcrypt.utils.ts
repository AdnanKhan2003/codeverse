import bcrypt from "bcrypt";
import { DEFAULT_SALT_ROUNDS } from "../../constants/constants";

const hashPassword = (password: string, saltRounds?: number) => bcrypt.hash(password, saltRounds || DEFAULT_SALT_ROUNDS);

const comparePassword = (password: string, hashValue: string) => bcrypt.compare(password, hashValue).catch(() => false);

export { hashPassword, comparePassword };