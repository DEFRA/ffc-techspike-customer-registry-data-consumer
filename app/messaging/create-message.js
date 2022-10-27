const createMessage = (body, type, options) => {
  return {
    body,
    type,
    source: 'ffc-lnr-customer-registry-data-consumer',
    ...options
  }
}

module.exports = createMessage
