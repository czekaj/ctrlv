process.env.NODE_ENV = 'test'
process.env.TEST_SUITE = 'server-test'

const { app, reservedUrls } = require('../app')
const { Clip } = require('../models/clip')
const request = require('supertest')

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

beforeAll((done) => {
  console.log('Inserting sample data')
  Clip.insertMany(sampleClips).then(() => done(), (e) => { console.error(e) })
  done()
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
          expect(res.status).toBe(200)
          expect(res.body.clip.text).toBe(sampleClip.text)
          done()
        }, (err) => {
          console.error(err)
          done(err)
        }).catch((e) => {
          console.error(e)
          done(e)
        })
      done()
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
        expect(res.status).toBe(204) // 204 No Content
        expect(res.body).toEqual({})
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
        expect(res.status).toBe(201)
        expect(res.body.clip.key).toBe(randomClip)
        expect(res.body.clip.text).toBe(`Hello ${randomClip}`)
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
        expect(res.status).toBe(400)
        done()
      }, (err) => {
        console.error(err)
        done(err)
      }).catch((e) => {
        console.error(e)
        done(e)
      })
  })
  it('should delete existing clip', (done) => {
    request(app)
      .delete(`/api/${randomClip}`)
      .type('form')
      .send().then((res) => {
        expect(res.status).toBe(200)
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
