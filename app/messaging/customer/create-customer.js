const { createItem } = require('../../repository/customer')
const enrichCustomer = require('./enrich-customer')
const sendEvent = require('../../event')

const create = async (itemBody) => {
  itemBody = enrichCustomer(itemBody)
  await createItem(itemBody)

  await sendEvent(
    itemBody.sbi,
    'create customer',
    'create',
    itemBody,
    {},
    `created a new customer record for ${itemBody.sbi}`,
    itemBody.email)
}

module.exports = create
