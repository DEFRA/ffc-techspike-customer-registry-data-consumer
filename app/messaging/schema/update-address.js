const Joi = require('joi')
const util = require('util')

const updateAddressSchema = Joi.object({
  type: Joi.string().valid('update-address').required(),
  source: Joi.string().required(),
  timestamp: Joi.date().required(),
  updatedBy: Joi.string().required(),
  data: Joi.object({
    sbi: Joi.number().required(),
    address: Joi.string().required(),
    createdOn: Joi.date().required(),
    updatedOn: Joi.date().required()
  }).required()
})

const validateAddress = (event) => {
  const validate = updateAddressSchema.validate(event)

  if (validate.error) {
    console.log('Update customer registry address validation error:', util.inspect(validate.error, false, null, true))
    return false
  }

  return true
}

module.exports = validateAddress
