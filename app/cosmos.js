const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('./config').cosmosConfig

const options = {
  endpoint: config.endpoint,
  key: config.key,
  userAgentSuffix: 'CosmosDBJavascriptQuickstart'
}

module.exports = new CosmosClient(options)
