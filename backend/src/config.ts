import dotenv from "dotenv";
dotenv.config();

function getEnv(name: string, fallback?: string) {
  const value = process.env[name] || fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: getEnv("DATABASE_URL"),
  jwtSecret: getEnv("JWT_SECRET"),
  adminPassword: getEnv("ADMIN_PASSWORD"),
  clientUrl: getEnv("CLIENT_URL", "http://localhost:5173"),
};