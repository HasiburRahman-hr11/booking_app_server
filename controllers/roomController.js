import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";

// Create New Room
export const createNewRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    // Save new room to the database
    const savedRoom = await newRoom.save();
    try {
      // Add saved room to the Hotel Collection
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }

    res.status(201).json(savedRoom);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Update Room
export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Delete Room
export const deleteRoom = async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);

    try {
      // Remove room from the Hotel Collection
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get a Room
export const getSingleRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get all Rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
