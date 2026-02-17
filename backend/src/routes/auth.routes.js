import express from "express";
import {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validations/auth.validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import rateLimiter from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Login admin and set httpOnly JWT cookie
 * @access  Public
 */
router.post(
  "/login",
  rateLimiter,
  validate(loginSchema),
  loginAdmin
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout admin and clear cookie
 * @access  Private
 */
router.post(
  "/logout",
  authMiddleware,
  logoutAdmin
);

/**
 * @route   GET /api/auth/me
 * @desc    Get currently authenticated admin
 * @access  Private
 */
router.get(
  "/me",
  authMiddleware,
  getCurrentAdmin
);

export default router;
