const processDocumentRequest = async (message, receiver) => {
  try {
    const messageBody = message.body
    console.log('Received document generation request', messageBody)
  } catch (err) {
    await receiver.deadLetterMessage(message)
    console.error('Unable to document generation request:', err)
  }
}

module.exports = processDocumentRequest