const Joi = require("joi");
const { mongo, message } = require("../../utils/variables");

const groupValidation = data => {
  const groupSchema = Joi.object({
    lastMessage: Joi.string().max(message.maxMessageLength).allow(""),
    senderId: Joi.string().hex().length(mongo.idLength).required(),
    memberIds: Joi.array().items(Joi.string().hex().length(mongo.idLength).required()),
  });
  return groupSchema.validate(data);
};

module.exports = {
  groupValidation: groupValidation,
};
