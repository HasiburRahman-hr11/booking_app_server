import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create New User
export const createNewUser = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });

    const isPassCorrect = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPassCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password!" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...other } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({ ...other });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};




// Update User
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get a User
export const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get all Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
