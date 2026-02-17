import Home from "../models/Home.model.js";
import cloudinary from "../config/cloudinary.js";

/**
 * POST /api/homes
 */
export async function createHome(req, res, next) {
  try {
    const uploadedImages = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload_stream(
          { folder: "homes" },
          async (error, result) => {
            if (error) throw error;
            uploadedImages.push(result.secure_url);
          }
        );

        cloudinary.uploader.upload_stream().end(file.buffer);
      }
    }

    const home = await Home.create({
      ...req.body,
      images: uploadedImages,
      createdBy: req.user.id,
    });

    res.status(201).json(home);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/homes
 */
export async function getAllHomes(req, res, next) {
  try {
    const homes = await Home.find().sort({ createdAt: -1 });
    res.status(200).json(homes);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/homes/:id
 */
export async function getHomeById(req, res, next) {
  try {
    const home = await Home.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }
    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/homes/:id
 */
export async function updateHome(req, res, next) {
  try {
    const updatedData = { ...req.body };

    if (req.files && req.files.length > 0) {
      const uploadedImages = [];

      for (const file of req.files) {
        const result = await cloudinary.uploader.upload_stream(
          { folder: "homes" },
          async (error, result) => {
            if (error) throw error;
            uploadedImages.push(result.secure_url);
          }
        );

        cloudinary.uploader.upload_stream().end(file.buffer);
      }

      updatedData.images = uploadedImages;
    }

    const home = await Home.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    res.status(200).json(home);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/homes/:id
 */
export async function deleteHome(req, res, next) {
  try {
    const home = await Home.findByIdAndDelete(req.params.id);

    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    res.status(200).json({ message: "Home deleted successfully" });
  } catch (error) {
    next(error);
  }
}
