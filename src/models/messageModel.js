const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: "string",
      required: true,
      max: 1000,
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
