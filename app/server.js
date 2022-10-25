require('./insights').setup()
const Hapi = require('@hapi/hapi')

const server = Hapi.server({
  port: process.env.PORT
})

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/customer/queryContainer'),
  require('./routes/customer/createCustomer'),
  require('./routes/customer/updateCustomer')
)

server.route(routes)

module.exports = server
