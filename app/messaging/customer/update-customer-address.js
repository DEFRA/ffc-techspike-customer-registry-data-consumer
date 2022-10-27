const { queryContainer, updateItem } = require('../../repository/customer')
const sendEvent = require('../../event')

const updateAddress = async (itemBody) => {
  const result = await queryContainer(itemBody.sbi)
  const customer = JSON.parse(result)
  console.log(`Updating customer registry item with id:\n${customer.id}\n`)
  customer.address = itemBody.address
  await updateItem(customer.id, customer.sbi, customer)

  await sendEvent(
    itemBody.sbi,
    'update customer address',
    'update-address',
    itemBody,
    {},
    `Updated customer address record for ${itemBody.sbi}`)
}

module.exports = updateAddress
