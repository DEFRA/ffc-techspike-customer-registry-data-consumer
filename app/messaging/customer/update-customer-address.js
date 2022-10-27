const { queryContainer, updateItem } = require('../../repository/customer')

const updateAddress = async (itemBody) => {
  const result = await queryContainer(itemBody.sbi)
  const customer = JSON.parse(result)
  console.log(`Updating customer registry item with id:\n${customer.id}\n`)
  customer.address = itemBody.address
  await updateItem(customer.id, customer.sbi, customer)
}

module.exports = updateAddress
