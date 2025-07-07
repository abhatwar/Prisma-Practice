const Joi = require('joi');

exports.createEmployeeSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required'
  })
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Enter a valid email',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required'
  })
});

