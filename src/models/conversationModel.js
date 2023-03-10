const mongoose = require("mongoose");
const { message } = require("../utils/variables")

const conversationSchema = new mongoose.Schema(
  {
    lastMessage: {
      type: String,
      required: false,
      max: message.maxMessageLength,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
