const processDataRequest = async (message, receiver) => {
  try {
    const messageBody = message.body
    console.log('Received document generation request', messageBody)
    await receiver.completeMessage(message)
  } catch (err) {
    await receiver.deadLetterMessage(message)
    console.error('Unable to document generation request:', err)
  }
}

module.exports = processDataRequest
D2234A0D3411BCA2