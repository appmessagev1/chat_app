const User = require("../models/userModel");
const Message = require("../models/messageModel");
const mongoose = require("mongoose");

const { escapeRegex } = require("../utils/global");

const userController = {
  getUserByIds: async (req, res, next) => {
    try {
      const ids = req.body.ids.map(id => {
        return mongoose.Types.ObjectId(id);
      });
      const users = await User.find(
        {
          _id: {
            $in: ids,
          },
        },
        { _id: 1, password: 0 }
      );
      return res.status(200).json({ error_code: 0, data: users });
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.find({ _id: mongoose.Types.ObjectId(id) }, { _id: 1, password: 0 });
      if (!user) return res.status(400).json({ error_code: 101, message: "Invalid input" });
      return res.status(200).json({ error_code: 0, data: user, message: "Get user successfully" });
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const user = await User.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        {
          $set: {
            name: data.name,
            phoneNumber: data.phoneNumber,
            title: data.title,
            country: data.country,
            avatar: data.avatar,
          },
        },
        { new: true }
      );
      if (!user) return res.status(400).json({ error_code: 101, message: "Invalid input" });
      const { password, ...other } = user._doc;
      return res.status(200).json({ error_code: 0, data: other, message: "Update user successfully" });
    } catch (err) {
      return res.status(400).json({ error_code: 101, message: "Invalid input" });
    }
  },

  getUsersByNameOrEmail: async (req, res, next) => {
    try {
      const { search } = req.query;
      const regexSearch = new RegExp(escapeRegex(search), 'gi');
      const user = await User.find({ $or: [{ name: regexSearch }, { email: regexSearch }] }, { _id: 1, password: 0 });
      if (!user) return res.status(400).json({ error_code: 101, message: "Invalid input" });
      return res.status(200).json({ error_code: 0, data: user, message: "Get user successfully" });
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },
};

module.exports = userController;
