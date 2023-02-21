const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      unique: false,
      required: true,
      max: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },

    title: {
      type: String,
      required: false,
      max: 50,
    },

    avatar: {
      type: String,
      required: false,
      unique: false,
    },

    country: {
      type: String,
      required: false,
      unique: false,
    },

    phoneNumber: {
      type: Number,
      required: false,
      unique: false,
    },

    password: {
      type: String,
      required: true,
      min: 12,
      max: 50,
    },

    verified: {
      type: Boolean,
      required: false,
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