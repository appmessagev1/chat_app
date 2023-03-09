const Express = require('express')
const groupController = require('../controllers/groupController')
const jwtService = require("../helpers/jwt_service");

const groupRoute = Express.Router();

groupRoute.post("/", jwtService.verifyAccessToken, groupController.postGroup);
groupRoute.get("/:id", jwtService.verifyAccessToken, groupController.getGroup);
groupRoute.post("/addUser", jwtService.verifyAccessToken, groupController.addUserToGroup)

module.exports = groupRoute;