const Joi = require("joi");
const { user, message } = require("../../utils/variables");

const userSignUpValidate = data => {
  const userSchema = Joi.object({
    name: Joi.string().required().max(user.maxNameLength),
    email: Joi.string().email().required().max(user.maxEmailLength),
    title: Joi.string().max(user.maxTitleLength),
    avatar: Joi.string(),
    password: Joi.string().min(user.minPasswordLength).max(user.maxPasswordLength).required(),
    verified: Joi.boolean(),
  });
  return userSchema.validate(data);
};

const userSignInValidation = data => {
  const userSignInSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().min(4).max(32).required() });
  return userSignInSchema.validate(data);
};

module.exports = {
  userSignUpValidate: userSignUpValidate,
  userSignInValidation: userSignInValidation,
};
