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
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  }).then(async () => {
    console.log('Connected to', await mongoose.getConnectionString())
  }, (err) => {
    return console.error(err.message)
  })
}

module.exports = {
  mongoose, mongoServer
}
