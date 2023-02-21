const Joi = require('joi');

const messageValidation = data => {
  const messageSchema = Joi.object({
    content: Joi.string().required().max(1000),
    senderId: Joi.string().hex().length(24).required(),
    conversationId: Joi.string().hex().length(24).required(),
  });
  return messageSchema.validate(data);
};

module.exports = {
  messageValidation: messageValidation,
};