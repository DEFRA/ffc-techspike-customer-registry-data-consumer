const Joi = require('joi')
const { queryContainer } = require('../../repository/customer')
const sbiSchema = require('../schemas/sbi')

module.exports = {
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