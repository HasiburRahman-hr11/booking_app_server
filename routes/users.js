import express from "express";
import { createNewUser, deleteUser, getAllUsers, getSingleUser, loginUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Create User
router.post("/register" , createNewUser);

// login User
router.post("/login" , loginUser);

// Update User
router.put('/update/:id' , verifyUser, updateUser);

// Delete User
router.delete('/delete/:id' , verifyUser, deleteUser);

// Update User
router.get('/:id' , verifyUser, getSingleUser);

// Update User
router.get('/all' , verifyAdmin, getAllUsers);

export default router;