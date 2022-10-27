const { queryContainer, deleteItem } = require('../../repository/customer')

const deleteCustomer = async (itemBody) => {
  const result = await queryContainer(itemBody.sbi)
  const customer = JSON.parse(result)
  await deleteItem(customer.id, customer.sbi, customer)
}

module.exports = deleteCustomer
