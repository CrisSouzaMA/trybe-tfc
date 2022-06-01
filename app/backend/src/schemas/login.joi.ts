import Joi = require('joi');

const validateLogin = Joi.object().keys({
  email: Joi.string().empty().required()
    .messages({ 'string.empty': 'All fields must be filled' }),
  password: Joi.string().min(6).required()
    .messages({ 'string.empty': 'All fields must be filled' }),
});

export default validateLogin;
