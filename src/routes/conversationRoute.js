const Express = require("express");
const conversationController = require("../controllers/conversationController");
const jwtService = require("../helpers/jwt_service");

const conversationRoute = Express.Router();

conversationRoute.post("/", jwtService.verifyAccessToken, conversationController.postConversation);
conversationRoute.get("/:id", jwtService.verifyAccessToken, conversationController.getConversation);

module.exports = conversationRoute;
