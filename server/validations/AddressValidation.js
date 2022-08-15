const Joi = require("joi");

const addressSchema = Joi.object({
  name: Joi.string().min(4).required().max(50),
  number: Joi.string()
    .max(12)
    .min(10)
    .required()
    .pattern(
      new RegExp(
        /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/
      )
    ),
  pincode: Joi.string().required().max(6).min(6),
  locality: Joi.string().required().min(3).max(50),
  address: Joi.string().required().min(5).max(300),
  city: Joi.string().required().min(3).max(20),
  landmark: Joi.string().empty("").min(3).max(30),
  alternate: Joi.string()
    .empty("")
    .max(12)
    .min(10)
    .pattern(
      new RegExp(
        /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/
      )
    ),
  state: Joi.string().required().min(3).max(20),
});

module.exports = {
  addressSchema,
};
