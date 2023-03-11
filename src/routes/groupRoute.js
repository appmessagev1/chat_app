const Express = require('express')
const groupController = require('../controllers/groupController')
const jwtService = require("../helpers/jwt_service");

const groupRoute = Express.Router();

groupRoute.post("/", jwtService.verifyAccessToken, groupController.postGroup);
groupRoute.get("/:id", jwtService.verifyAccessToken, groupController.getGroup);
groupRoute.post("/addUser", jwtService.verifyAccessToken, groupController.addUserToGroup)
groupRoute.get("/:id/users", jwtService.verifyAccessToken, groupController.getUsersInGroup)
groupRoute.delete("/:id", jwtService.verifyAccessToken, groupController.removeUserInGroup)
groupRoute.get("/getById/:id", jwtService.verifyAccessToken, groupController.getGroupById)

module.exports = groupRoute;