var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
}).then(() => {
  console.log(`Connected to ${process.env.MONGODB_URI}`)
}, (err) => {
  return console.error(err.message)
})
module.exports = {
  mongoose
}
