export const isEmail = (email: string) => {
  if (typeof email !== "string") return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isEmpty = (string: string) => {
  if (typeof string !== "string") return false;
  return string === "";
};

export const minLength = (string: string, length: number) => {
  if (typeof string !== "string") return false;
  return string.length >= length;
};

export const compareString = (str1: string, str2: string) => {
  if (typeof str1 !== "string" || typeof str2 !== "string") return false;
  return str1 === str2;
};

export const capitalizeFirstLetter = (string: string) => {
  if (typeof string !== "string") return false;
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

export const limitString = (string: string, limit = 21) => {
  if (typeof string !== "string") return false;

  if (string.length <= limit) return string;

  const shortedString = string.slice(0, limit) + "...";
  return shortedString;
};
