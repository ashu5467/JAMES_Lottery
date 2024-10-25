// Placeholder for lottery validations
const Joi = require('joi');

const lotterySchema = Joi.object({
  name: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  status: Joi.string().valid('Active', 'Upcoming', 'Ended').default('Upcoming'),
  participants: Joi.number().default(0),
  sales: Joi.string().default('$0'),
  price: Joi.string().required(),
  prize: Joi.string().required(),
});

module.exports = lotterySchema;
