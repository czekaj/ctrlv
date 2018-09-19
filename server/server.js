const express = require('express')
const app = express()
const welcomeMessage = 'Hello, Ctrl-V!'
app.get('/', (req, res) => {
  res.status(200).send(welcomeMessage)
})
const port = 3000
app.listen(port, () => {
  console.log(`Started server on port ${port}`)
})

module.exports = { app, welcomeMessage }
