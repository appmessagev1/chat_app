const mongoose = require("mongoose");
const { message, user } = require("../utils/variables")

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: message.maxMessageLength,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    senderName: {
      type: String, 
      required: true,
      max: user.maxNameLength,
    },

    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
