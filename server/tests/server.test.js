const request = require('supertest')
const expect = require('expect')

const { app, welcomeMessage } = require('../server')

describe('GET /', () => {
  it('should display welcome message', (done) => {
    request(app)
      .get('/')
      .expect(200, welcomeMessage)
      .end(done)
  })
})
let randomClip = Math.random().toString(36).substring(7) // generates random string, e.g. 'q5ns2'
describe(`GET /${randomClip}`, () => {
  it('should create new clip', (done) => {
    request(app)
      .get(`/${randomClip}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.clip.text).toBe('')
      })
      .end(done)
  })
})
describe('GET /favicon.ico', () => {
  it('should not create or retrieve any clips', (done) => {
    request(app)
      .get('/favicon.ico')
      .expect(404)
      .end(done)
  })
})
