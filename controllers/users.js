const User = require("../models/User.js");

const handleResponse = (res, data) => {
  res.status(200).json(data);
};

const handleError = (next, error) => {
  next(error);
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, 
      { $set: req.body }, 
      { new: true });
    handleResponse(res, updatedUser);
  } catch (err) {
    handleError(next, err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    handleResponse(res, "User has been deleted.");
  } catch (err) {
    handleError(next, err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    handleResponse(res, user);
  } catch (err) {
    handleError(next, err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    handleResponse(res, users);
  } catch (err) {
    handleError(next, err);
  }
};
