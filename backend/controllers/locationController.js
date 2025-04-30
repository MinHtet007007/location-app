// controllers/locationController.js
import Location from "../models/Location.js";

// Create a location
export const createLocation = async (req, res) => {
  try {
    const { name, description, latitude, longitude } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const location = new Location({
      name,
      description,
      latitude,
      longitude,
      imageUrl,
    });
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a location
export const updateLocation = async (req, res) => {
  try {
    const { name, description, latitude, longitude } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = { name, description, latitude, longitude };
    if (imageUrl) updatedData.imageUrl = imageUrl;

    const location = await Location.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
