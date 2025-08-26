const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }
    next();
  };
};

// Validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(10).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter and one special character'
    }),
  address: Joi.string().max(400).required(),
  role: Joi.string().valid('admin', 'user', 'store_owner').optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const storeSchema = Joi.object({
  name: Joi.string().min(10).max(60).required(),
  email: Joi.string().email().required(),
  address: Joi.string().max(400).required(),
  ownerId: Joi.string().uuid().optional()
});

const ratingSchema = Joi.object({
  storeId: Joi.string().uuid().required(),
  rating: Joi.number().integer().min(1).max(5).required()
});

const passwordUpdateSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter and one special character'
    })
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  storeSchema,
  ratingSchema,
  passwordUpdateSchema
};