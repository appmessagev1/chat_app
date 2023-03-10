const Joi = require("joi");
const { mongo, message, group } = require("../../utils/variables");

const groupValidation = data => {
  const groupSchema = Joi.object({
    lastMessage: Joi.string().max(message.maxMessageLength).allow(""),
    senderId: Joi.string().hex().length(mongo.idLength),
    name: Joi.string().max(group.maxNameLength).required(),
    ownerId: Joi.string().hex().length(mongo.idLength).required(),
  });
  return groupSchema.validate(data);
};

const userGroupValidation = data => {
  const userGroupSchema = Joi.object({
    userId: Joi.string().hex().length(mongo.idLength).required(),
    groupId: Joi.string().hex().length(mongo.idLength).required(),
  });
  return userGroupSchema.validate(data);
}

const addUserToGroupValidation = data => {
  const addUserToGroupSchema = Joi.object({
    userIds: Joi.array().items(Joi.string().hex().length(mongo.idLength).required()),
    groupId: Joi.string().hex().length(mongo.idLength).required(),
  });
  return addUserToGroupSchema.validate(data)
}

module.exports = {
  groupValidation: groupValidation,
  userGroupValidation: userGroupValidation,
  addUserToGroupValidation: addUserToGroupValidation,
};
