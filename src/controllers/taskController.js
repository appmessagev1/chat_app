const mongoose = require("mongoose");
const Task = require("../models/taskModel");
const { taskValidation } = require("../helpers/validation/taskValidation");

const taskController = {
  postTask: async (req, res, next) => {
    try {
      const { error } = taskValidation(req.body);
      if (error) return res.status(422).json({ error_code: 101, message: "Invalid input" });

      const task = new Task({
        title: req.body.title,
        content: req.body.content,
        userId: mongoose.Types.ObjectId(req.body.userId),
        status: req.body.status,
      });

      const savedTask = await task.save();

      return res.status(200).json({ error_code: 0, message: "Create Task success", data: { task: savedTask } });
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  },

  getTasks: async (req, res, next) => {
    try {
      const userId = mongoose.Types.ObjectId(req.params.id);
      if (!userId) return res.status(422).json({ error_code: 101, message: "Invalid input" });
      const tasks = await Task.find({
        userId: userId,
      });

      return res.status(200).json({ error_code: 0, message: "Get tasks successfully", data: tasks });
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const taskId = mongoose.Types.ObjectId(req.params.id);
      if (!taskId) return res.status(422).json({ error_code: 101, message: "Invalid input" });
      const task = await Task.findByIdAndUpdate(
        { _id: taskId },
        {
          $set: {
            status: req.body.status,
          },
        },
        { new: true }
      );
      return res.status(200).json({ error_code: 0, message: "Update status task successful", data: task });
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  },

  updateTask: async (req, res, next) => {
    try {
      const taskId = mongoose.Types.ObjectId(req.params.id);
      if (!taskId) return res.status(422).json({ error_code: 101, message: "Invalid input" });
      const task = await Task.findByIdAndUpdate(
        { _id: taskId },
        {
          $set: {
            title: req.body.title,
            content: req.body.content
          },
        },
        { new: true }
      );
      return res.status(200).json({ error_code: 0, message: "Update status task successful", data: task });
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  }
};

module.exports = taskController;