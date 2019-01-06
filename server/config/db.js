var mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer

if (process.env.NODE_ENV === 'test') {
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
  mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/CtrlV', {
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
