const Joi = require("joi");
const { event, mongo } = require("../../utils/variables");

const eventValidation = data => {
  const eventSchema = Joi.object({
    title: Joi.string().required().max(event.maxTitleLength),
    desc: Joi.string().required().max(event.maxDescLength),
    start: Joi.date().required(),
    end: Joi.date().required(),
    creatorId: Joi.string().required().length(mongo.idLength),
    memberIds: Joi.array().items(Joi.string().length(mongo.idLength)).required(),
  });
  return eventSchema.validate(data);
};

module.exports = {
  eventValidation: eventValidation,
};
