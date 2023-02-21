const Joi = require('joi');

const conversationValidation = (data) => {
  const conversationSchema = Joi.object({
    lastMessage: Joi.string().max(1000).allow(''),
    userId: Joi.string().hex().length(24).required(),
    senderId: Joi.string().hex().length(24).required(),
  });
  return conversationSchema.validate(data);
}

module.exports = {
  conversationValidation: conversationValidation
}