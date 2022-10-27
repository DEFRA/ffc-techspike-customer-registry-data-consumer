const Joi = require('joi')
const util = require('util')

const deleteSchema = Joi.object({
  type: Joi.string().valid('delete').required(),
  source: Joi.string().required(),
  timestamp: Joi.date().required(),
  updatedBy: Joi.string().required(),
  data: Joi.object({
    sbi: Joi.number().required()
  }).required()
})

const validateDelete = (event) => {
  const validate = deleteSchema.validate(event)

  if (validate.error) {
    console.log('Delete customer registry validation error:', util.inspect(validate.error, false, null, true))
    return false
  }

  return true
}

module.exports = validateDelete
