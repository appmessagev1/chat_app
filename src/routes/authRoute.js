const Express = require("express");
const authController = require("../controllers/authController");

const authRoute = Express.Router();

authRoute.post("/sign_up", authController.signUp);
authRoute.post("/sign_in", authController.signIn);
authRoute.post("/refresh_token", authController.refresh);
authRoute.get("/verify_email", authController.verifyEmail);

module.exports = authRoute;
