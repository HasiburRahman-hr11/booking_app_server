import Hotel from "../model/Hotel.js";

// Create new hotel in DB
export const createNewHotel = async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const hotelData = await newHotel.save();

    res.status(201).json(hotelData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Update Hotel
export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Delete Hotel
export const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get a Hotel
export const getSingleHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get all Hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Count Hotels by City
export const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
