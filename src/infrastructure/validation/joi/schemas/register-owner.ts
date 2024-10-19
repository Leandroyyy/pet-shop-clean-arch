import Joi from 'joi';

export const registerOwnerSchema = Joi.object({
  name: Joi.string().required(),
  document: Joi.string().required(),
  birthday: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/, 'yyyy-mm-dd')
    .required(),
  email: Joi.string().email().required(),
});
