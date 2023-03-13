const mongoose = require('mongoose');
const { event } = require('../utils/variables')

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: event.maxTitleLength,
    },
    desc: {
      type: String,
      required: false,
      max: event.maxDescLength,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);