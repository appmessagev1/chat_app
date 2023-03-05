const Joi = require("joi");
const { user, task } = require("../../utils/variables");

const taskValidation = data => {
  const taskSchema = Joi.object({
    title: Joi.string().required().max(task.maxTitleLength),
    content: Joi.string().required().max(task.maxContentLength),
    userId: Joi.string().hex().length(user.userIdLength).required(),
    status: Joi.number().required().default(0)
  });
  return taskSchema.validate(data);
};

module.exports = {
  taskValidation: taskValidation,
};
