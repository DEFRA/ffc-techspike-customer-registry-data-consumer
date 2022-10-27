const { createCustomer, deleteCustomer, updateAddress } = require('./customer')
const validateCreate = require('./schema/create')
const validateAddress = require('./schema/update-address')
const validateDelete = require('./schema/delete')

const processDataRequest = async (message, receiver) => {
  try {
    let valid = true
    const messageBody = message.body
    console.log('Received document generation request', messageBody)
    switch (messageBody.type) {
      case 'create':
        if (validateCreate(messageBody)) {
          await createCustomer(messageBody.data)
        } else {
          valid = false
        }
        break
      case 'update-address':
        if (validateAddress(messageBody)) {
          await updateAddress(messageBody.data)
        } else {
          valid = false
        }
        break
      case 'delete':
        if (validateDelete(messageBody)) {
          await deleteCustomer(messageBody.data)
        }
        break
      default:
        console.log('Unknown message type')
    }

    if (valid) {
      await receiver.completeMessage(message)
    } else {
      await receiver.deadLetterMessage(message)
    }
  } catch (err) {
    await receiver.deadLetterMessage(message)
    console.error('Unable to document generation request:', err)
  }
}

module.exports = processDataRequest
