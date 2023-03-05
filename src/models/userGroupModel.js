const mongoose = require("mongoose");

const userGroupSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Group'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserGroup", userGroupSchema);
