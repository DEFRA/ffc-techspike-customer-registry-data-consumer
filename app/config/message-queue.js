const Joi = require('joi')

const sharedConfigSchema = {
  appInsights: Joi.object(),
  host: Joi.string(),
  password: Joi.string(),
  username: Joi.string(),
  useCredentialChain: Joi.bool().default(false)
}

const schema = Joi.object({
  customerRegistryRequestQueue: {
    address: Joi.string(),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  eventRequestQueue: {
    address: Joi.string(),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  alertRequestQueue: {
    address: Joi.string(),
    type: Joi.string(),
    ...sharedConfigSchema
  }
})

const sharedConfig = {
  appInsights: require('applicationinsights'),
  host: process.env.MESSAGE_QUEUE_HOST,
  password: process.env.MESSAGE_QUEUE_PASSWORD,
  username: process.env.MESSAGE_QUEUE_USER,
  useCredentialChain: process.env.NODE_ENV === 'production'
}

const config = {
  customerRegistryRequestQueue: {
    address: process.env.CUSTOMERREGISTRYREQUEST_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  eventRequestQueue: {
    address: process.env.CUSTOMERREGISTRYEVENTREQUEST_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  alertRequestQueue: {
    address: process.env.CUSTOMERREGISTRYALERTREQUEST_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  }
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The message queue config is invalid. ${error.message}`)
}

module.exports = value
