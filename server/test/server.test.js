process.env.NODE_ENV = 'test'
const { app, welcomeMessage, reservedUrls, server, db } = require('./../../server/server')
const { Clip } = require('../../server/models/clip')
const request = require('supertest')
const chai = require('chai')
chai.use(require('chai-date-string'))
const expect = chai.expect

const sampleClips = [{
  key: 'first',
  text: 'This is my saved message.',
  createdAt: new Date()
}, {
  key: 'second',
  text: 'Second message',
  createdAt: new Date()
}, {
  key: 'fe7kv9s8fds9f10a42da',
  text: 'Random message',
  createdAt: new Date()
}
]

before((done) => {
  Clip.insertMany(sampleClips).then(() => done(), (e) => { console.error(e) })
})

after((done) => {
  db.mongoose.connection.close()
  db.mongoServer.stop()
  server.close() // shutdown the express server
  done()
})

describe('GET /', () => {
  it('should display welcome message', (done) => {
    request(app)
      .get('/')
      .expect(200, welcomeMessage)
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
sampleClips.forEach((sampleClip) => {
  describe(`GET /api/${sampleClip.key}`, () => {
    it('should display an existing clip', (done) => {
      request(app)
        .get(`/api/${sampleClip.key}`).then((res) => {
          expect(res.status).to.equal(200)
          expect(res.body.clip.text).to.equal(sampleClip.text)
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
let randomClip = Math.random().toString(36).substring(7) // generates random string, e.g. 'q5ns2'
describe('GET /api/[random clip]}', () => {
  it('should indicate a clip does not exist yet', (done) => {
    request(app)
      .get(`/api/${randomClip}`).then((res) => {
        expect(res.status).to.equal(204) // 204 No Content
        expect(res.body).to.be.empty
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
describe('POST /api/[random clip]}', () => {
  it('should save a new clip', (done) => {
    request(app)
      .post(`/api/${randomClip}`)
      .type('form')
      .send({
        text: `Hello ${randomClip}`
      }).then((res) => {
        console.log(res.body.clip)
        expect(res.status).to.equal(201)
        expect(res.body.clip.key).to.be.equal(randomClip)
        expect(res.body.clip.text).to.be.equal(`Hello ${randomClip}`)
        done()
      }, (err) => {
        console.error(err)
        done(err)
      }).catch((e) => {
        console.error(e)
        done(e)
      })
  })
  it('should not save the same new clip twice', (done) => {
    request(app)
      .post(`/api/${randomClip}`)
      .type('form')
      .send({
        text: `Hello ${randomClip}`
      }).then((res) => {
        expect(res.status).to.equal(400)
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
