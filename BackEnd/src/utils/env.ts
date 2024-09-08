import dotenv from "dotenv";

dotenv.config();

function getEnvValue(
  key: string,
  defaultValue: string | number
): string | number {
  try {
    const value = process.env[key];
    if (!value) {
      return defaultValue;
    }
    return value;
  } catch (error) {
    return defaultValue;
  }
}

export const PORT = getEnvValue("PORT", 3000);
export const API_BASE_URL = getEnvValue(
  "API_BASE_URL",
  "https://api.github.com"
);
