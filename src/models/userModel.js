const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { user } = require("../utils/variables")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true,
      max: user.maxNameLength,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      max: user.maxEmailLength,
    },

    title: {
      type: String,
      required: false,
      max: user.maxTitleLength,
      default: "",
    },

    avatar: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },

    country: {
      type: String,
      required: false,
      unique: false,
      default: "",
    },

    phoneNumber: {
      type: Number,
      required: false,
      unique: false,
      default: "",
    },

    password: {
      type: String,
      required: true,
      min: user.minPasswordLength,
      max: user.maxPasswordLength,
    },

    verified: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {}
};

module.exports = mongoose.model("User", userSchema);
