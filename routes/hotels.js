import express from "express";
import { createNewHotel, deleteHotel, getAllHotel, getSingleHotel, updateHotel } from "../controllers/hotelController.js";

const router = express.Router();

// Create
router.post('/create' , createNewHotel);

// Update
router.put('/update/:id' , updateHotel);

// Delete
router.delete('/delete/:id' , deleteHotel);

// Get
router.get('/:id' , getSingleHotel);

router.get('/' , getAllHotel);

export default router;