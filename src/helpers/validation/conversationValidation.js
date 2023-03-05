const Joi = require('joi');
const { user, message } = require("../../utils/variables")

const conversationValidation = (data) => {
  const conversationSchema = Joi.object({
    lastMessage: Joi.string().max(message.maxMessageLength).allow(''),
    userId: Joi.string().hex().length(user.userIdLength).required(),
    senderId: Joi.string().hex().length(user.userIdLength).required(),
  });
  return conversationSchema.validate(data);
}

module.exports = {
  conversationValidation: conversationValidation
}