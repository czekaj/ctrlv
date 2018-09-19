const request = require('supertest')

const { app, welcomeMessage } = require('../server')

describe('GET /', () => {
  it('should display welcome message', (done) => {
    request(app)
      .get('/')
      .expect(200, welcomeMessage)
      .end(done)
  })
})
