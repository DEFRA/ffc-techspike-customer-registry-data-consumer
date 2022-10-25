
const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string().required(),
  key: Joi.string().required(),
  database: Joi.string().required(),
  container: Joi.string().required()
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  database: process.env.COSMOS_DATABASE,
  container: process.env.COSMOS_CONTAINER
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The cosmos config is invalid. ${error.message}`)
}

module.exports = value
