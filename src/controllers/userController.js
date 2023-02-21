const User = require("../models/UserModel");
const Message = require("../models/messageModel");
const mongoose = require("mongoose");

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
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.find({ _id: mongoose.Types.ObjectId(id) }, { _id: 1, password: 0 });
      if (!user) return res.status(422).json({ error_code: 101, message: "Invalid input" });
      return res.status(200).json({ error_code: 0, data: user, message: "Get user successfully" });
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  },

  updateProfile: async (req, res, next) => { 
    try {
      const id = req.params.id;
      const data = req.body
      console.log(id)
      console.log(data)
      const user = await User.updateOne({ _id: mongoose.Types.objectId(id) }, data)
      console.log(user)
      if (!user) return res.status(422).json({ error_code: 101, message: "Invalid input" });
      const { _id, other } = user._doc
      return res.status(200).json({ error_code: 0, data: other, message: 'Update user successfully' })
    } catch (err) {
      return res.status(400).json({ error_code: 101, message: 'Invalid input' });
    }
  }
};

module.exports = userController;
