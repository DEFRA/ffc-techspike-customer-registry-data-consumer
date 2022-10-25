const Joi = require('joi')
const { updateItem } = require('../../repository/customer')
const sbiSchema = require('../schemas/sbi')

module.exports = {
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