const Express = require("express");
const messageController = require("../controllers/messageController")
const jwtService = require("../helpers/jwt_service");

const messageRoute = Express.Router();

messageRoute.post("/", jwtService.verifyAccessToken, messageController.postMessageInConversation);
messageRoute.get("/:id/get_message_in_conversation", jwtService.verifyAccessToken, messageController.getMessageInConversation);

module.exports = messageRoute;
