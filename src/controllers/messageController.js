const mongoose = require("mongoose");
const Message = require("../models/messageModel");
const Conversation = require("../models/ConversationModel");
const { messageValidation } = require("../helpers/validation/messageValidation");

const messageController = {
  postMessage: async (req, res, next) => {
    try {
      const { error } = messageValidation(req.body);
      if (error) return res.status(422).json({ error_code: 101, message: "Invalid input" });

      const message = new Message({
        content: req.body.content,
        senderId: mongoose.Types.ObjectId(req.body.senderId),
        conversationId: mongoose.Types.ObjectId(req.body.conversationId),
      });

      await message.save();

      await Conversation.updateOne(
        { _id: mongoose.Types.ObjectId(req.body.conversationId) },
        {
          $set: {
            lastMessage: req.body.content,
          },
        }
      );

      return res.status(200).json({ error_code: 0, message: "Save message success" });
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    } 
  },

  getMessageInConversation: async (req, res, next) => {
    try {
      const { limit, offset } = req.query;

      const messages = await Message.find({
        conversationId: mongoose.Types.ObjectId(req.params.id),
      })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);

      return res.status(200).json({ error_code: 0, data: messages, message: "Get messages successfully" });
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    } 
  },
};

module.exports = messageController;
