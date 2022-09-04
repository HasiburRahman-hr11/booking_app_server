import express from "express";
import {
  countByCity,
  createNewHotel,
  deleteHotel,
  getAllHotels,
  getSingleHotel,
  updateHotel,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/create", verifyAdmin, createNewHotel);

// Update
router.put("/update/:id", verifyAdmin, updateHotel);

// Delete
router.delete("/delete/:id", verifyAdmin, deleteHotel);

// Get
router.get("/countByCity", countByCity);

router.get("/", getAllHotels);

router.get("/:id", getSingleHotel);

export default router;
