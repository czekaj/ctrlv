const request = require('supertest')
// require('jest')
const chai = require('chai')
chai.use(require('chai-date-string'))
const expect = chai.expect

const { app, welcomeMessage, reservedUrls } = require('../server')

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
      .get(`/${randomClip}`).then((res) => {
        expect(res.status).to.equal(200)
        expect(res.body.clip.createdAt).to.be.a.dateString()
        done()
      }, (err) => {
        console.error(err)
        done(err)
      }).catch((e) => {
        console.error(e)
        done(e)
      })
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
reservedUrls.forEach((url) => {
  describe(`GET /${url}`, () => {
    it('should not create or retrieve any clips', (done) => {
      request(app)
        .get(`/${url}`)
        .expect(404)
        .end(done)
    })
  })
})
