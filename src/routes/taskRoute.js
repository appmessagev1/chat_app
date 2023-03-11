const Express = require("express");
const taskController = require('../controllers/taskController')
const jwtService = require("../helpers/jwt_service");

const taskRoute = Express.Router();

taskRoute.post("/", jwtService.verifyAccessToken, taskController.postTask);
taskRoute.post("/:id", jwtService.verifyAccessToken, taskController.getTasks);
taskRoute.put("/:id", jwtService.verifyAccessToken, taskController.updateStatus);
taskRoute.put("/:id/update", jwtService.verifyAccessToken, taskController.updateTask);

module.exports = taskRoute;
