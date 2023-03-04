const Joi = require("joi");

const taskValidation = data => {
  const taskSchema = Joi.object({
    title: Joi.string().required().max(200),
    content: Joi.string().required().max(1000),
    userId: Joi.string().hex().length(24).required(),
    status: Joi.number().required().default(0)
  });
  return taskSchema.validate(data);
};

module.exports = {
  taskValidation: taskValidation,
};
