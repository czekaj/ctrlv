const { env } = require('./env')
const mongoose = require('mongoose')
// mongoose.set('debug', true)
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

if (env.name === 'test') {
  mongoServer = new MongoMemoryServer()
  mongoServer.getConnectionString().then((mongoUri) => {
    return mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
      if (err) {
        return console.error('Error connecting to MongoMemoryServer', err.message)
      }
    })
  }).then(() => {
    console.log('Connected to MongoMemoryServer: ', mongoose.connection.client.s.url)
  })
} else {
  mongoose.Promise = global.Promise
  mongoose.connect(env.mongoUri, {
    useNewUrlParser: true
  }).then(() => {
    console.log('Connected to', mongoose.connection.client.s.url)
  }, (err) => {
    return console.error(err.message)
  })
}

module.exports = {
  mongoose, mongoServer
}
