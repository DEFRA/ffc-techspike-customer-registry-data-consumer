const {createItem, updateItem} = require('../repository/customer')

const processDataRequest = async (message, receiver) => {
  try {
    const messageBody = message.body
    console.log('Received document generation request', messageBody)
    if (messageBody.type === 'update') {
      updateItem(messageBody)
      console.log('updated item')
    } else {
      createItem(messageBody)
      console.log('created item')
    }
    
    await receiver.completeMessage(message)
  } catch (err) {
    await receiver.deadLetterMessage(message)
    console.error('Unable to document generation request:', err)
  }
}

module.exports = processDataRequest
