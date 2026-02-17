import express from "express";
import {
  createHome,
  getAllHomes,
  getHomeById,
  updateHome,
  deleteHome,
} from "../controllers/home.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import uploadMiddleware from "../middlewares/upload.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import rateLimiter from "../middlewares/rateLimit.middleware.js";

import {
  createHomeSchema,
  updateHomeSchema,
} from "../validations/home.validation.js";

const router = express.Router();

/**
 * @route   GET /api/homes
 * @desc    Get all homes (public)
 * @access  Public
 */
router.get("/", getAllHomes);

/**
 * @route   GET /api/homes/:id
 * @desc    Get single home by ID
 * @access  Public
 */
router.get("/:id", getHomeById);

/**
 * @route   POST /api/homes
 * @desc    Create a new home listing
 * @access  Private (Admin)
 */
router.post(
  "/",
  authMiddleware,
  rateLimiter,
  uploadMiddleware.array("images", 5),
  validate(createHomeSchema),
  createHome
);

/**
 * @route   PUT /api/homes/:id
 * @desc    Update a home listing
 * @access  Private (Admin)
 */
router.put(
  "/:id",
  authMiddleware,
  rateLimiter,
  uploadMiddleware.array("images", 5),
  validate(updateHomeSchema),
  updateHome
);

/**
 * @route   DELETE /api/homes/:id
 * @desc    Delete a home listing
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  authMiddleware,
  rateLimiter,
  deleteHome
);

export default router;
