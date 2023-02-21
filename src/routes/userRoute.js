
const Express = require("express");
const userController = require("../controllers/userController");
const jwtService = require("../helpers/jwt_service");

const userRoute = Express.Router();

userRoute.post("/getByIds", jwtService.verifyAccessToken, userController.getUserByIds);
userRoute.get("/:id", jwtService.verifyAccessToken, userController.getUserById);
userRoute.put("/:id", jwtService.verifyAccessToken, userController.updateProfile);

module.exports = userRoute;
