const sendMessage = require('../messaging/send-message')
const { eventRequestQueue } = require('../config').messageQueueConfig

const sendEvent = async (sbi, eventName, actionType, originalData, changeData, message) => {
  const event = {
    name: eventName,
    properties: {
      sbi: sbi,
      checkpoint: 'ffc-customer-registry-data-consumer',
      status: 'success',
      action: {
        type: actionType,
        message,
        timestamp: new Date().toISOString(),
        data: {
          orginal: originalData,
          change: changeData
        }
      }
    }
  }
  await sendMessage({ event }, 'data-consumer-event', eventRequestQueue)
}

module.exports = sendEvent
