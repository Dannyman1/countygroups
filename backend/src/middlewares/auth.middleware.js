import jwt from "jsonwebtoken";
import env from "../config/env.js";

export default function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    req.user = decoded; // { id, email, role }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
