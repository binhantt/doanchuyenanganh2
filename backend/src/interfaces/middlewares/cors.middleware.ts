import { APP_CONFIG } from "../../infrastructure/config/constants";

export const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  // Cho phép origin
  if (origin && (APP_CONFIG.CORS_ORIGIN.includes(origin) || APP_CONFIG.CORS_ORIGIN.includes("*"))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Nếu là preflight OPTIONS request → trả ngay 204
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
};
