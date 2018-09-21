require('./config')

const express = require('express')
require('./db/mongoose')
const { Clip } = require('./models/clip')

const app = express()
const welcomeMessage = 'Hello, Ctrl-V!'
app.get('/', (req, res) => {
  res.status(200).send(welcomeMessage)
})
// handling creation and retrieval/deletion of a clip
app.get('/:clipUrl', (req, res) => {
  const clipUrl = req.params.clipUrl
  console.log(`GET /${clipUrl} starting`)
  // TODO: add logic to filter out admin pages
  Clip.findOne({ url: clipUrl }).then((clip) => {
    if (!clip) {
      console.log(`Clip ${clipUrl} not found. Creating.`)
    } else {
      console.log(`Clip ${clipUrl} found.\n${clip}`)
    }
    res.send('GET complete')
  }).catch((e) => {
    console.error(e)
    return res.status(400).send(e.message)
  })
})
const port = 3000
app.listen(port, () => {
  console.log(`Started server on port ${port}`)
})

module.exports = { app, welcomeMessage }
