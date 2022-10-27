const config = require('../config').cosmosConfig
const cosmosClient = require('../cosmos')

const queryContainer = async (sbi) => {
  let resultString = {}
  console.log(`Querying container:\n${config.container}`)

  const querySpec = {
    query: 'SELECT * FROM c WHERE c.sbi = @sbi',
    parameters: [
      {
        name: '@sbi',
        value: sbi
      }
    ]
  }

  const { resources: results } = await cosmosClient
    .database(config.database)
    .container(config.container)
    .items.query(querySpec)
    .fetchAll()

  for (const queryResult of results) {
    resultString = JSON.stringify(queryResult)
    console.log(`\tQuery returned ${resultString}\n`)
  }

  return resultString
}

const createItem = async (itemBody) => {
  await cosmosClient
    .database(config.database)
    .container(config.container)
    .items.upsert(itemBody)

  console.log(`Created customer registry item with id:\n${itemBody.id}\n`)
}

const updateItem = async (id, partitionId, itemBody) => {
  await cosmosClient
    .database(config.database)
    .container(config.container)
    .item(id, partitionId)
    .replace(itemBody)

  console.log(`Updated customer registry item with id:\n${id}\n`)
}

const deleteItem = async (id, partitionId, itemBody) => {
  await cosmosClient
    .database(config.database)
    .container(config.container)
    .item(id, partitionId)
    .delete()

  console.log(`Deleted customer registry item with id:\n${id}\n`)
}

module.exports = {
  queryContainer,
  createItem,
  updateItem,
  deleteItem
}
