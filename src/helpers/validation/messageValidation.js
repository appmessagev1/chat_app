const Joi = require('joi');
const { message, mongo } = require("../../utils/variables");

const messageConversationValidation = data => {
  const messageSchema = Joi.object({
    content: Joi.string().required().max(message.maxMessageLength),
    senderId: Joi.string().hex().length(mongo.idLength).required(),
    conversationId: Joi.string().hex().length(mongo.idLength).required(),
  });
  return messageSchema.validate(data);
};

const messageGroupValidation = data => {
  const messageSchema = Joi.object({
    content: Joi.string().required().max(message.maxMessageLength),
    senderId: Joi.string().hex().length(mongo.idLength).required(),
    groupId: Joi.string().hex().length(mongo.idLength).required(),
  });
  return messageSchema.validate(data);
};

module.exports = {
  messageConversationValidation: messageConversationValidation,
  messageGroupValidation: messageGroupValidation,
};