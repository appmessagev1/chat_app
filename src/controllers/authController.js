const { userSignUpValidate, userSignInValidation } = require("../helpers/validation/userValidation");
const jwtService = require("../helpers/jwt_service");
const User = require("../models/userModel");
const nodemailerService = require("../helpers/nodemailer_service");

const authController = {
  signUp: async (req, res) => {
    try {
      const { error } = userSignUpValidate(req.body);
      if (error) return res.status(422).json({ error_code: 101, message: "Invalid input" });
      const email = req.body.email.toLowerCase();

      const isExits = await User.findOne({ email });
      if (isExits) return res.status(400).json({ error_code: 100, message: "Duplicate email" });

      const userToken = await jwtService.signEmailToken({ user: req.body });

      await nodemailerService.sendMail(
        email,
        "Verify mail",
        `<a href="${process.env.SERVER_API_URL}/v1/auth/verify_email?email=${email || ""}&token=${userToken || ""}">Verify</a>`
      );

      return res.status(200).json({ error_code: 0, message: "Open email and validate email from app.message.mail@gmail.com"})
    } catch (err) {
      return res.status(500).json({ error_code: 100, message: "Invalid input" });
    }
  },

  signIn: async (req, res, next) => {
    try {
      const { error } = userSignInValidation(req.body);
      if (error) return res.status(422).json({ error_code: 101, message: "Invalid input" });
      const email = req.body.email.toLowerCase();

      const user = await User.findOne({ email });
      if (!user) return res.status(422).json({ error_code: 101, message: "Invalid input" });

      else if (!user.verified) return res.status(422).json({ error_code: 200, message: "You need verified email" })

      const isValid = await user.isCheckPassword(req.body.password);
      if (!isValid) return res.status(422).json({ error_code: 101, message: "Invalid input" });

      const accessToken = await jwtService.signAccessToken(user._id);
      const refreshToken = await jwtService.signRefreshToken(user._id);

      const { password, ...other } = user._doc;
      return res.status(200).json({
        error_code: 0,
        data: {
          user: other,
          access_token: accessToken,
          refresh_token: refreshToken,
        },
        message: "Sign in successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  refresh: async (req, res) => {
    try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        return res.status(422).json({ error_code: 101, message: "Invalid input" });
      }
      const { userId } = await jwtService.verifyRefreshToken(refreshToken);
      if (!userId) {
        return res.status(422).json({ error_code: 101, message: "Invalid input" });
      }

      const accessToken = await jwtService.signAccessToken(userId);
      const newRefreshToken = await jwtService.signRefreshToken(userId);

      return res.status(200).json({
        error_code: 0,
        message: "Refresh token successfully",
        data: {
          access_token: accessToken,
          refresh_token: newRefreshToken,
        },
      });
    } catch (err) {
      return res.status(403).json({ error_code: 102, message: "Invalid refresh token" });
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const { email, token } = req.query;
      const payload = await jwtService.verifyEmailToken(token);

      const _user = payload.user;
      if (_user.email === email) {
        const user = new User({
          name: _user.name,
          email: _user.email,
          title: _user.title,
          avatar: _user.avatar,
          password: _user.password,
          verified: true
        });
        await user.save();

        return res.redirect(`${process.env.CLIENT_API_URL}/sign_in`);
      }
    } catch (err) {
      return res.status(404).json({ error_code: 102, message: "Invalid input" });
    }
  },
};

module.exports = authController;
