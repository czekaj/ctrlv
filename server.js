const { env } = require('./config/env')
const { app } = require('./app')

app.listen(env.port, () => {
  console.log(`Started server on port ${env.port}`)
})
