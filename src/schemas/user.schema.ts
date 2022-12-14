import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(12).required(),
});

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).required(),
  password: Joi.string().min(12).required(),
});

export const scoreSchema = Joi.object({
  id: Joi.string().required(),
  score: Joi.number().min(0).required(),
});
