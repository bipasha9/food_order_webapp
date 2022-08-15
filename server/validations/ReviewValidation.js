const Joi = require("joi");

const reviewSchema = Joi.object({
  name: Joi.string().min(3).required().max(50),
  order_id: Joi.string().max(30).min(10).required(), 
  user_id:Joi.string().max(30).min(10).required(),
  avatar : Joi.string().required() , 
  ratings: Joi.number().required(),
  description : Joi.string(),
}) ;

module.exports = {
  reviewSchema,
};
