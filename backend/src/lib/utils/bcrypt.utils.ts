import bcrypt from "bcrypt";

const hashPassword = (password: string, saltRounds?: number) => bcrypt.hash(password, saltRounds || 10);

const isPasswordCorrect = (password: string, hashValue: string) => bcrypt.compare(password, hashValue).catch(() => false);

export { hashPassword, isPasswordCorrect };