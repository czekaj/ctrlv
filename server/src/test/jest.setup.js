const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
require('../models/clip')
const mongod = new MongoMemoryServer()

const getSuiteName = () => `${process.env.TEST_SUITE}`

beforeAll(done => {
  const clearDB = () => {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(() => {})
    }
    return done()
  }
  if (mongoose.connection.readyState === 0) { // if closed
    mongod.getConnectionString(getSuiteName()).then(mongoUri => {
      return mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
        if (err) {
          console.error('Error connecting to MongoMemoryServer', err.message)
          return clearDB()
        }
      })
    }).then(() => {
      console.log('Connected to MongoMemoryServer: ', mongoose.connection.client.s.url)
      return done()
    })
  } else {
    return clearDB()
  }
})

// afterEach(done => {
//   mongoose.disconnect().then(done())
// })

afterAll(done => {
  mongoose.disconnect()
  mongod.stop().then(done())
})
