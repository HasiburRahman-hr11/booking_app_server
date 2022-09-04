import express from "express";
import {
  createNewRoom,
  deleteRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/create/:hotelId", verifyAdmin, createNewRoom);

// Update
router.put("/update/:id", verifyAdmin, updateRoom);

// Delete
router.delete("/delete/:id/:hotelId", verifyAdmin, deleteRoom);

// Get
router.get("/:id", getSingleRoom);

router.get("/", getAllRooms);

export default router;
