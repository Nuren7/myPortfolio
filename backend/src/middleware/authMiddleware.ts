import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export function checkAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
}