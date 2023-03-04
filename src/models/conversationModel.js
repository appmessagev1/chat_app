const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    lastMessage: {
      type: String,
      required: false,
      max: 1000,
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
