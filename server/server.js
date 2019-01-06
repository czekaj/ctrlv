const { env } = require('./config/env')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/db')
const { Clip } = require('./models/clip')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
if (env.name === 'dev') {
  var morgan = require('morgan')
  app.use(morgan('dev'))
}
const welcomeMessage = 'Hello, Ctrl-V!'
const reservedUrls = ['admin', 'about', 'help', 'privacy']

app.get('/', (req, res) => {
  res.status(200).send(welcomeMessage)
})
// handling creation and retrieval/deletion of a clip
app.get('/api/:clipUrl', (req, res) => {
  const clipUrl = req.params.clipUrl.toLowerCase()
  if (reservedUrls.indexOf(clipUrl) > -1 || !clipUrl.match(/^\w+$/)) {
    return res.status(400).send(`400 ${clipUrl} is not a clip url`)
  }
  Clip.findOne({ key: clipUrl }).then((foundClip) => {
    if (!foundClip) {
      console.log(`Clip ${clipUrl} not found.`)
      return res.status(204).send()
    } else {
      console.log(`Clip ${clipUrl} found.\n${foundClip}`)
      return res.send({ 'clip': foundClip })
    }
  }, (err) => {
    console.error(err)
    return res.status(400).send('400 ' + err.message)
  })
})
app.post('/api/:clipUrl', (req, res) => {
  const clipUrl = req.params.clipUrl.toLowerCase()
  console.log(`Creating clip "${clipUrl}"...`, req.body)
  var newClip = new Clip({
    key: clipUrl,
    text: req.body.text,
    createdAt: new Date()
  })
  newClip.save().then((createdClip) => {
    return res.status(201).send({ 'clip': createdClip })
  }, (err) => {
    return res.status(400).send('400 ' + err.message)
  })
})
const server = app.listen(env.port, () => {
  console.log(`Started server on port ${env.port}`)
})

module.exports = { app, welcomeMessage, reservedUrls, server, db, env }
