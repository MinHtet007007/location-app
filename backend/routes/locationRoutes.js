// routes/locationRoutes.js
import express from "express";
import {
  createLocation,
  getLocations,
  updateLocation,
} from "../controllers/locationController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), createLocation);
router.get("/", getLocations);
router.put("/:id", upload.single("image"), updateLocation);

export default router;
