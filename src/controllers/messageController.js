const mongoose = require("mongoose");
const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const { messageConversationValidation, messageGroupValidation } = require("../helpers/validation/messageValidation");

const messageController = {
  postMessageInConversation: async (req, res, next) => {
    try {
      const { error } = messageConversationValidation(req.body);
      if (error) return res.status(400).json({ error_code: 101, message: "Invalid input" });

      const message = new Message({
        content: req.body.content,
        senderId: mongoose.Types.ObjectId(req.body.senderId),
        conversationId: mongoose.Types.ObjectId(req.body.conversationId),
        senderName: req.body.senderName,
      });

      const savedMessage = await message.save();

      await Conversation.updateOne(
        { _id: mongoose.Types.ObjectId(req.body.conversationId) },
        {
          $set: {
            lastMessage: req.body.content,
          },
        }
      );

      return res.status(200).json({ error_code: 0, message: "Save message success", data: { message: savedMessage } });
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
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
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  postMessageInGroup: async (req, res, next) => {
    try {
      const { error } = messageGroupValidation(req.body);
      if (error) return res.status(400).json({ error_code: 101, message: "Invalid input" });

      const message = new Message({
        content: req.body.content,
        senderId: mongoose.Types.ObjectId(req.body.senderId),
        groupId: mongoose.Types.ObjectId(req.body.groupId),
        senderName: req.body.senderName,
      });

      const savedMessage = await message.save();

      await Conversation.updateOne(
        { _id: mongoose.Types.ObjectId(req.body.groupId) },
        {
          $set: {
            lastMessage: req.body.content,
          },
        } 
      );

      return res.status(200).json({ error_code: 0, message: "Save message success", data: { message: savedMessage } });
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  getMessageInGroup: async (req, res, next) => {
    try {
      const { limit, offset } = req.query;

      const messages = await Message.find({
        groupId: mongoose.Types.ObjectId(req.params.id),
      })
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);

      return res.status(200).json({ error_code: 0, data: messages, message: "Get messages successfully" });
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },
};

module.exports = messageController;
