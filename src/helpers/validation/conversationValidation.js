const Joi = require('joi');
const { message, mongo } = require("../../utils/variables")

const conversationValidation = (data) => {
  const conversationSchema = Joi.object({
    lastMessage: Joi.string().max(message.maxMessageLength).allow(''),
    userId: Joi.string().hex().length(mongo.idLength).required(),
    senderId: Joi.string().hex().length(mongo.idLength).required(),
  });
  return conversationSchema.validate(data);
}

module.exports = {
  conversationValidation: conversationValidation
}