import Joi from "joi";

export const registerPetSchema = Joi.object({
  ownerId: Joi.string().required(),
  name: Joi.string().required(),
  birthday: Joi.string().isoDate().required(),
  breed: Joi.string().required(),
  gender: Joi.string().valid("male", "female").required(),
  type: Joi.string().valid("dog", "cat").required(),
});
