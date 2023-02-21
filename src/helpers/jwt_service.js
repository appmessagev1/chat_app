const JWT = require("jsonwebtoken");
require("dotenv").config();

const jwtService = {
  signAccessToken: async userId => {
    return new Promise((resolve, reject) => {
      const payload = { userId: userId };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "30m",
      };

      JWT.sign(payload, secret, options, (error, token) => {
        if (error) reject(error);
        resolve(token);
      });
    });
  },

  verifyAccessToken: (req, res, next) => {
    try {
      if (!req.headers["authorization"]) {
        next();
      }
      const authHeader = req.headers["authorization"];
      const token = authHeader.split(" ")[1];
      JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) return res.status(403).json({ message: 102, messageType: "Invalid token" });
        next();
      });
    } catch (err) {
      return res.status(403).json({ message: 102, messageType: "Invalid token" });
    }
  },

  signRefreshToken: async userId => {
    return new Promise((resolve, reject) => {
      const payload = { userId: userId };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "12h",
      };

      JWT.sign(payload, secret, options, (error, token) => {
        if (error) reject(error);
        resolve(token);
      });
    });
  },

  verifyRefreshToken: async refreshToken => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, payload) => {
        if (error) reject(error);
        resolve(payload);
      });
    });
  },

  signEmailToken: async user => {
    return new Promise((resolve, reject) => {
      const payload = user;
      const secret = process.env.MAIL_TOKEN_SECRET;
      const options = {
        expiresIn: "30m",
      };

      JWT.sign(payload, secret, options, (error, token) => {
        if (error) reject(error);
        resolve(token);
      });
    });
  },

  verifyEmailToken: async userToken => {
    return new Promise((resolve, reject) => {
      JWT.verify(userToken, process.env.MAIL_TOKEN_SECRET, (error, payload) => {
        if (error) reject(error);
        resolve(payload);
      });
    });
  },
};

module.exports = jwtService;
