const mongoose = require('mongoose');
const Group = require('../models/groupModel');
const { groupValidation }  = require("../helpers/validation/groupValidation")

const groupController = {
  getGroup: async (req, res, next) => {
    try {
      const userId = mongoose.Types.ObjectId(req.params.id)

      if (!userId) return res.status(422).json({ error_code: 101, message: "Invalid input" });
      
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  },

  postGroup: async (req, res, next) => {
    try {

    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  }
}

module.exports = groupController