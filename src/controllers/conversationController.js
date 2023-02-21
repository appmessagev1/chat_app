const mongoose = require("mongoose");
const Conversation = require("../models/conversationModel");
const { conversationValidation } = require("../helpers/validation/conversationValidation");

const conversationController = {
  getConversation: async (req, res, next) => {
    try {
      const userId = mongoose.Types.ObjectId(req.params.id);

      if (!userId) return res.status(422).json({ error_code: 101, message: "Invalid input" });
      const conversations = await Conversation.aggregate([
        {
          $match: {
            $or: [{ userId: userId }, { senderId: userId }],
          },
        },
        {
          $sort: {
            updatedAt: -1
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $project: {
            _id: 1,
            lastMessage: 1,
            senderId: 1,
            createdAt: 1,
            updatedAt: 1,
            userId: 1,
            "userData._id": 1,
            "userData.name": 1,
            "userData.email": 1,
            "userData.title": 1,
          },
        },
      ]);
      return res.status(200).json({ error_code: 0, data: conversations, message: "Get conversations successfully" });
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  },

  postConversation: async (req, res, next) => {
    try {
      const { error } = conversationValidation(req.body);
      console.log(error)
      if (error) return res.status(422).json({ error_code: 101, message: "Invalid input" });

      const isExits = await Conversation.findOne({ userId: req.body.userId, senderId: req.body.senderId });
      if (isExits) return res.status(400).json({ error_code: 100, message: "Duplicate conversation" });

      const conversation = new Conversation({
        userId: mongoose.Types.ObjectId(req.body.userId),
        senderId: mongoose.Types.ObjectId(req.body.senderId),
        lastMessage: req.body.lastMessage || "",
      });

      const savedConversation = await conversation.save();

      return res.status(200).json({
        error_code: 0,
        data: { conversation: savedConversation },
        message: "Create conversation successfully",
      });
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  },
};

module.exports = conversationController;
