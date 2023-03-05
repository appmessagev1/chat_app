const Joi = require('joi');
const { user, message } = require("../../utils/variables");

const messageValidation = data => {
  const messageSchema = Joi.object({
    content: Joi.string().required().max(message.maxMessageLength),
    senderId: Joi.string().hex().length(user.userIdLength).required(),
    conversationId: Joi.string().hex().length(user.userIdLength).required(),
  });
  return messageSchema.validate(data);
};

module.exports = {
  messageValidation: messageValidation,
};