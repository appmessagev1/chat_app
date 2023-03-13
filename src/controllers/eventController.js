const Event = require("../models/eventModel");
const UserEvent = require("../models/userEventModel");
const { eventValidation } = require("../helpers/validation/eventValidation");
const mongoose = require("mongoose");

const eventController = {
  getEventByUserId: async (req, res) => {
    try {
      const userId = mongoose.Types.ObjectId(req.params.id);
      if (!userId) return res.status(400).json({ error_code: 101, message: "Invalid input" });

      const events = await UserEvent.aggregate([
        {
          $match: {
            userId: userId,
          },
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
          $lookup: {
            from: "events",
            localField: "eventId",
            foreignField: "_id",
            as: "eventData",
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            eventId: 1,
            "eventData.title": 1,
            "eventData.desc": 1,
            "eventData.createdAt": 1,
            "eventData.updatedAt": 1,
            "eventData.creatorId": 1,
            "eventData.start": 1,
            "eventData.end": 1,
            "userData._id": 1,
            "userData.name": 1,
            "userData.email": 1,
            "userData.avatar": 1,
          },
        },
      ]);

      return res.status(200).json({
        error_code: 0,
        data: events,
        message: "Get events successfully",
      });
    } catch (e) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  getUsersInEvent: async (req, res) => {
    try {
      const eventId = mongoose.Types.ObjectId(req.params.id);
      if (!eventId) return res.status(400).json({ error_code: 101, message: "Invalid input" });

      const users = await UserEvent.aggregate([
        {
          $match: {
            eventId: eventId,
          },
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
            userId: 1,
            eventId: 1,
            createAt: 1,
            updateAt: 1,
            "userData._id": 1,
            "userData.name": 1,
            "userData.email": 1,
            "UserData.avatar": 1,
          },
        },
      ]);
      return res.status(200).json({
        error_code: 0,
        data: users,
        message: "Get users successfully",
      });
    } catch (e) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  getEvents: async (req, res) => {
    try {
    } catch (e) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  postEvent: async (req, res) => {
    try {
      const { error } = eventValidation(req.body);
      if (error) return res.status(400).json({ error_code: 101, message: "Invalid input" });

      const memberIds = req.body.memberIds;
      const event = new Event({
        title: req.body.title,
        desc: req.body.desc,
        start: req.body.start,
        end: req.body.end,
        creatorId: mongoose.Types.ObjectId(req.body.creatorId),
      });

      const savedEvent = await event.save();
      const userEvents = memberIds.map(memberId => {
        return new UserEvent({
          userId: mongoose.Types.ObjectId(memberId),
          eventId: savedEvent._id,
        });
      });

      await UserEvent.insertMany(userEvents);

      return res.status(200).json({
        error_code: 0,
        data: { events: savedEvent },
        message: "Saved event successfully",
      });
    } catch (e) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  updateEvent: async (req, res) => {
    try {
    } catch (e) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  addUserToEvent: async (req, res) => {
    try {
      const eventId = mongoose.Types.ObjectId(req.body.eventId);
      const userEvents = req.body.userIds.map(id => {
        return {
          eventId: eventId,
          userId: mongoose.Types.ObjectId(id),
        };
      });
      await UserEvent.insertMany(userEvents);
    } catch (e) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  removeUserFromEvent: async (req, res) => {
    try {
      const userEventId = mongoose.Types.ObjectId(req.params.id);
      await UserEvent.deleteOne({ _id: userEventId  });
    } catch (e) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const eventId = mongoose.Types.ObjectId(req.params.id);

      await UserEvent.deleteMany({
        eventId: eventId,
      });

      await Event.deleteOne({
        _id: eventId,
      });

      return res.status(200).json({
        error_code: 0,
        message: "Delete event successfully",
      });
    } catch (e) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },
};

module.exports = eventController;
