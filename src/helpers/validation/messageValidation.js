const Joi = require('joi');
const { message, mongo, user } = require("../../utils/variables");

const messageConversationValidation = data => {
  const messageSchema = Joi.object({
    content: Joi.string().required().max(message.maxMessageLength),
    senderId: Joi.string().hex().length(mongo.idLength).required(),
    senderName: Joi.string().required().max(user.maxNameLength),
    conversationId: Joi.string().hex().length(mongo.idLength).required(),
  });
  return messageSchema.validate(data);
};

const messageGroupValidation = data => {
  const messageSchema = Joi.object({
    content: Joi.string().required().max(message.maxMessageLength),
    senderName: Joi.string().required().max(user.maxNameLength),
    senderId: Joi.string().hex().length(mongo.idLength).required(),
    groupId: Joi.string().hex().length(mongo.idLength).required(),
  });
  return messageSchema.validate(data);
};

module.exports = {
  messageConversationValidation: messageConversationValidation,
  messageGroupValidation: messageGroupValidation,
};