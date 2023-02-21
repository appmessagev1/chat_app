const Joi = require("joi");

const userSignUpValidate = data => {
  const userSchema = Joi.object({
    name: Joi.string().required().max(50),
    email: Joi.string().email().required(),
    title: Joi.string().max(50),
    avatar: Joi.string(),
    password: Joi.string().min(4).max(32).required(),
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
