const mongoose = require("mongoose");
const { message } = require("../utils/variables");

const groupSchema = new mongoose.Schema(
  {
    lastMessage: {
      type: String,
      required: false,
      max: message.maxMessageLength,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },

    name: {
      type: String,
      required: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Group', groupSchema)
