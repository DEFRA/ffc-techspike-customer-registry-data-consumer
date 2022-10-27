const Joi = require('joi')
const util = require('util')

const createSchema = Joi.object({
  type: Joi.string().valid('create').required(),
  source: Joi.string().required(),
  timestamp: Joi.date().required(),
  updatedBy: Joi.string().required(),
  data: Joi.object({
    sbi: Joi.number().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    company: Joi.string().required(),
    createdOn: Joi.date().required(),
    updatedOn: Joi.date().required(),
    schemes: Joi.array().items()
  }).required()
})

const validateCreate = (event) => {
  const validate = createSchema.validate(event)

  if (validate.error) {
    console.log('Create customer registry validation error:', util.inspect(validate.error, false, null, true))
    return false
  }

  return true
}

module.exports = validateCreate
