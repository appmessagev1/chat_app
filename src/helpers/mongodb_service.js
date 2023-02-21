const mongoose = require("mongoose");
require("dotenv").config();

const mongoService = {
  connectMongoDB: async () => {
    try {
      const mongoURL = process.env.MONGODB_URL;
      mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("Connected to Mongo");
      });
    } catch (error) {
      console.log("Error connecting to Mongo");
    }
  },
};

module.exports = mongoService;
