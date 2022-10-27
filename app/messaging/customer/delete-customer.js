const { queryContainer, deleteItem } = require('../../repository/customer')
const sendEvent = require('../../event')

const deleteCustomer = async (itemBody) => {
  const result = await queryContainer(itemBody.sbi)
  const customer = JSON.parse(result)
  await deleteItem(customer.id, customer.sbi, customer)

  await sendEvent(
    itemBody.sbi,
    'delete customer',
    'delete',
    itemBody,
    {},
    `Deleted customer record for ${itemBody.sbi}`)
}

module.exports = deleteCustomer
