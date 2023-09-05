const Hotel = require("../models/Hotel.js");
const Suite = require("../models/Suite.js");

const handleResponse = (res, data) => {
    res.status(200).json(data);
};

const handleError = (next, error) => {
    next(error);
};

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try{
        const savedHotel = await newHotel.save();
        handleResponse(res, savedHotel);
    }catch (err) {
        handleError(next, err);
    }
};

export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            request.params.id,
            { $set: req.body},
            { new: true});
        handleResponse(res, updateHotel);
    }catch (err) {
        handleError(next, err);
    }
};

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        handleResponse(res, "Hotel Has Been Deleted");
    } catch(err){
        handleError(next, err);
    }
};

export const getHotel = async (req, res, next) => {
    try {
        await Hotel.findById(req.params.id);
        handleResponse(res, hotel);
    }catch(err){
        handleError(next, err);
    }
};

export const getHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 999 },
      }).limit(req.query.limit);
      handleResponse(res, hotels);
    } catch(err) {
        handleError(next, err);
    }
};

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      handleResponse(res, list);
    } catch(err) {
        handleError(next, err);
    }
};

export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      const counts = [
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ];
  
      handleResponse(res, counts);
    } catch (err) {
      handleError(next, err);
    }
};

export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.suite.map((suite) => {
          return suite.findById(suite);
        })
      );
      handleResponse(res, list);
    }catch(err){
        handleError(next, err);
    }
};