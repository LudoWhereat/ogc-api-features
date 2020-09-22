const app = require('./index')
const config = require('./config/server')

app.listen(config.express.port, function (error) {
  if (error) {
    console.error('Unable to listen for connections', error)
    process.exit(10)
  }
  console.log(`Example app listening at http://localhost:${config.express.port}`)
})