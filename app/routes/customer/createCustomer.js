const Joi = require('joi')
const { createItem } = require('../../repository/customer')
const sbiSchema = require('../schemas/sbi')

module.exports = {
  method: 'POST',
  path: '/customer',
  options: {
    validate: {
      payload: Joi.object()
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