const mongoose = require("mongoose");
const { message } = require("../utils/variables")

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

    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
