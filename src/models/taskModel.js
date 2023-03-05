const mongoose = require("mongoose");
const { task } = require("../utils/variables");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: task.maxTitleLength,
    },
    content: {
      type: String,
      required: true,
      max: task.maxContentLength,
    },
    assigneeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
