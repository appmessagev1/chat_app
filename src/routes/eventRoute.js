const express = require('express');
const eventController = require('../controllers/eventController');
const jwtService = require('../helpers/jwt_service');

const eventRoute = express.Router();

eventRoute.get('/', jwtService.verifyAccessToken, eventController.getEvents)
eventRoute.post("/", jwtService.verifyAccessToken, eventController.postEvent);
eventRoute.put("/:id", jwtService.verifyAccessToken, eventController.updateEvent);
eventRoute.delete("/:id", jwtService.verifyAccessToken, eventController.deleteEvent);
eventRoute.get("/user/:id", jwtService.verifyAccessToken, eventController.getEventByUserId);
eventRoute.get("/:id/users", jwtService.verifyAccessToken, eventController.getUsersInEvent);
eventRoute.post("/addUsers", jwtService.verifyAccessToken, eventController.addUserToEvent);
eventRoute.post("/removeUsers/:id", jwtService.verifyAccessToken, eventController.removeUserFromEvent);

module.exports = eventRoute