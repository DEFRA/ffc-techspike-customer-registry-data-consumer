const config = require('./config')
const Hapi = require('@hapi/hapi')

async function createServer () {
  const server = Hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    router: {
      stripTrailingSlash: true
    }
  })

  await server.register(require('./plugins/errors'))
  await server.register(require('./plugins/router'))

  return server
}

module.exports = createServer
