import joi from "joi";

export const signupSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  userName: joi.string().max(20).required(),
  userStatus: joi.string().valid('user', 'admin'),
});

export const signinSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const userSchema = joi.object({
  password: joi.string().min(6).required(),
  userName: joi.string().max(20).required(),
});

export const picSchema = joi.object({
  userImage: joi.string().required(),
});
