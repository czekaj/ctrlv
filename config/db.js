const { env } = require('./env')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(env.mongoUri, {
  useNewUrlParser: true
}).then(() => {
  console.log('Connected to', mongoose.connection.client.s.url)
}, (err) => {
  return console.error(err.message)
})

module.exports = {
  mongoose
}
