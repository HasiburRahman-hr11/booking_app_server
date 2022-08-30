import User from "../model/User.js";
import bcrypt from "bcryptjs";

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

    const isPassCorrect = await bcrypt.compareSync(req.body.password, user.password);
    if (!isPassCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password!" });

    res.status(201).json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
