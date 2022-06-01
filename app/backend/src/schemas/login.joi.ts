import Joi = require('joi');

const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default validateLogin;
