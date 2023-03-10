const mongoose = require("mongoose");
const Group = require("../models/groupModel");
const UserGroup = require("../models/userGroupModel");
const { groupValidation, addUserToGroupValidation } = require("../helpers/validation/groupValidation");

const groupController = {
  getGroup: async (req, res, next) => {
    try {
      const userId = mongoose.Types.ObjectId(req.params.id);
      if (!userId) return res.status(400).json({ error_code: 101, message: "Invalid input" });

      const groups = await UserGroup.find({
        userId: userId,
      }).populate("groupId");

      return res.status(200).json({
        error_code: 0,
        message: "Get group successfully",
        data: groups,
      });
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  postGroup: async (req, res, next) => {
    try {
      const { error } = groupValidation(req.body);
      if (error) return res.status(400).json({ error_code: 101, message: "Invalid input" });

      const group = new Group({
        lastMessage: req.body.lastMessage,
        senderId: mongoose.Types.ObjectId(req.body.senderId),
        ownerId: mongoose.Types.ObjectId(req.body.ownerId),
        name: req.body.name,
      });

      const savedGroup = await group.save();

      const userGroup = new UserGroup({
        userId: mongoose.Types.ObjectId(req.body.ownerId),
        groupId: savedGroup._id,
      });

      await userGroup.save();

      return res.status(200).json({
        error_code: 0,
        data: {
          group: savedGroup,
        },
        message: "Saved group successfully",
      });
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  addUserToGroup: async (req, res, next) => {
    try {
      const { error } = addUserToGroupValidation(req.body);
      if (error) return res.status(400).json({ error_code: 101, message: "Invalid input" });

      const { userIds, groupId } = req.body;
      const groups = userIds.map(userId => {
        return {
          userId: mongoose.Types.ObjectId(userId),
          groupId: mongoose.Types.ObjectId(groupId),
        };
      });
      const savedGroups = await UserGroup.insertMany(groups, { ordered: false });
      return res.status(200).json({
        error_code: 0,
        data: savedGroups,
        message: "Add user to group successfully",
      });
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  getUsersInGroup: async (req, res) => {
    try {
      const groupId = mongoose.Types.ObjectId(req.params.id);
      const users = await UserGroup.aggregate([
        {
          $match: {
            groupId: groupId,
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
            "userData._id": 1,
            "userData.name": 1,
            "userData.email": 1,
            "userData.title": 1,
            "userData.avatar": 1,
          },
        },
      ]);
      return res.status(200).json({ error_code: 0, data: users, message: "Get users successfully" });
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  removeUserInGroup: async (req, res) => {
    try {
      const groupId = mongoose.Types.ObjectId(req.params.id);
      const group = await UserGroup.findOneAndDelete({ _id: groupId });
      if (group) {
        const groups = await UserGroup.find({ groupId: group.groupId });
        if (groups.length === 0) {
          await Group.findOneAndDelete({ _id: group.groupId });
        }
        return res.status(200).json({
          error_code: 0,
          data: group,
          message: "Remove User successfully",
        });
      } else {
        return res.status(400).json({ error_code: 100, message: "Invalid input" });
      }
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  },

  getGroupById: async (req, res) => {
    try {
      const groupId = mongoose.Types.ObjectId(req.params.id)
      const group = await UserGroup.find({ groupId: groupId })
      if (group) {
        res.status(200).json({
          error_code: 0,
          data: group,
          message: "Get group successfully",
        });
      } else {
        return res.status(400).json({ error_code: 100, message: "Invalid input" });
      }
    } catch (err) {
      return res.status(400).json({ error_code: 100, message: "Invalid input" });
    }
  }
};

module.exports = groupController;
