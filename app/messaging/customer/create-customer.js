const { createItem } = require('../../repository/customer')
const enrichCustomer = require('./enrich-customer')

const create = async (itemBody) => {
  itemBody = enrichCustomer(itemBody)
  await createItem(itemBody)
}

module.exports = create
