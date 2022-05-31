import Joi = require('joi');

const validateLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default validateLogin;
