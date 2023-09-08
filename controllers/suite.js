import Suite from "../models/Suite.js";
import Hotel from "../models/Hotel.js";

const handleResponse = (res, data) => {
  res.status(200).json(data);
};

const handleError = (next, error) => {
  next(error);
};

export const createSuite = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newSuite = new Suite(req.body);

  try {
    const savedSuite = await newSuite.save();
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedSuite._id },
    });
    handleResponse(res, savedSuite);
  } catch (err) {
    handleError(next, err);
  }
};

export const updateSuite = async (req, res, next) => {
  try {
    const updatedSuite = await Suite.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    handleResponse(res, updatedSuite);
  } catch (err) {
    handleError(next, err);
  }
};

export const updateSuiteAvailability = async (req, res, next) => {
  try {
    await Suite.updateOne(
      { "suiteNumbers._id": req.params.id },
      {
        $push: {
          "suiteNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    handleResponse(res, "Suite status has been updated.");
  } catch (err) {
    handleError(next, err);
  }
};

export const deleteSuite = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Suite.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId, {
      $pull: { suites: req.params.id },
    });
    handleResponse(res, "Suite has been deleted.");
  } catch (err) {
    handleError(next, err);
  }
};

export const getSuite = async (req, res, next) => {
  try {
    const room = await Suite.findById(req.params.id);
    handleResponse(res, room);
  } catch (err) {
    handleError(next, err);
  }
};

export const getSuites = async (req, res, next) => {
  try {
    const suites = await Suite.find();
    handleResponse(res, suites);
  } catch (err) {
    handleError(next, err);
  }
};
