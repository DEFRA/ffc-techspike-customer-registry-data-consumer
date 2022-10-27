const enrichCustomer = (customer) => {
  if (!customer?.schemes) {
    customer.schemes = []
  }
  return customer
}

module.exports = enrichCustomer
