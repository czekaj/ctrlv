require('./config')

const express = require('express')
// const bodyParser = require('body-parser')
require('./db/mongoose')
const { Clip } = require('./models/clip')

const app = express()
// app.use(bodyParser.json())
const welcomeMessage = 'Hello, Ctrl-V!'
const reservedUrls = ['admin', 'about', 'help', 'privacy']

app.get('/', (req, res) => {
  res.status(200).send(welcomeMessage)
})
// handling creation and retrieval/deletion of a clip
app.get('/:clipUrl', (req, res) => {
  const clipUrl = req.params.clipUrl.toLowerCase()
  console.log(`GET /${clipUrl} starting`)
  if (reservedUrls.indexOf(clipUrl) > -1 || !clipUrl.match(/^\w+$/)) {
    return res.status(404).send('404 Not a clip url')
  }
  Clip.findOne({ url: clipUrl }).then((foundClip) => {
    if (!foundClip) {
      console.log(`Clip ${clipUrl} not found. Creating.`)
      var newClip = new Clip({
        url: clipUrl,
        createdAt: new Date()
      })
      newClip.save().then((createdClip) => {
        return res.send({ 'clip': createdClip })
      }, (err) => {
        console.error(err)
        return res.status(400).send('400 ' + err.message)
      })
    } else {
      console.log(`Clip ${clipUrl} found.\n${foundClip}`)
      return res.send({ 'clip': foundClip })
    }
  }, (err) => {
    console.error(err)
    return res.status(400).send('400 ' + err.message)
  })
})
const port = 3000
app.listen(port, () => {
  console.log(`Started server on port ${port}`)
})

module.exports = { app, welcomeMessage, reservedUrls }
