const Joi = require('joi')
const { queryContainer, createItem, updateItem } = require('../repository/customer')
const sbiSchema = require('./schemas/sbi')

const queryContainerRoute = {
  method: 'GET',
  path: '/customer/{sbi}',
  options: {
    validate: {
      params: Joi.object()
        .concat(sbiSchema),
      failAction: async (request, h, error) => {
        return h.redirect('/customer').code(404).takeover()
      }
    }
  },
  handler: async (request, h) => {
    const sbi = request.params.sbi
    const customer = await queryContainer(sbi)
    return h.response(customer ?? JSON.parse(customer)).code(200)
  }
}

const createItemRoute = {
  method: 'POST',
  path: '/customer',
  options: {
    validate: {
      params: Joi.object()
        .concat(sbiSchema),
      failAction: async (request, h, error) => {
        return h.redirect('/customer').code(404).takeover()
      }
    }
  },
  handler: async (request, h) => {
    const sbi = request.params.sbi
    const customer = await createItem(sbi)
    return h.response(customer ?? JSON.parse(customer)).code(200)
  }
}

const updateItemRoute = {
  method: 'PATCH',
  path: '/customer/{sbi}',
  options: {
    validate: {
      params: Joi.object()
        .concat(sbiSchema),
      failAction: async (request, h, error) => {
        return h.redirect('/customer').code(404).takeover()
      }
    }
  },
  handler: async (request, h) => {
    const sbi = request.params.sbi
    const customer = await updateItem(sbi)
    return h.response(customer ?? JSON.parse(customer)).code(200)
  }
}

module.exports = {
 queryContainerRoute,
 createItemRoute,
 updateItemRoute
}
