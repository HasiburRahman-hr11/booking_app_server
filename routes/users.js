import express from "express";
import { createNewUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Create User
router.post("/register" , createNewUser);

// login User
router.post("/login" , loginUser);

export default router;