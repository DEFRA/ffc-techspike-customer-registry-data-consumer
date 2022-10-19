const { MessageReceiver } = require('ffc-messaging')
const processDocumentRequest = require('./process-document-request')
const { customerRegistryRequestQueue } = require('../config').messageQueueConfig

let documentGenerationReceiver

const start = async () => {
  const documentGenerationAction = message => processDocumentRequest(message, documentGenerationReceiver)
  documentGenerationReceiver = new MessageReceiver(customerRegistryRequestQueue, documentGenerationAction)
  await documentGenerationReceiver.subscribe()

  console.info('Ready to receive messages')
}

const stop = async () => {
  await documentGenerationReceiver.closeConnection()
}

module.exports = { start, stop }