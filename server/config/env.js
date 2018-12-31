var env = process.env.NODE_ENV || 'dev'
console.log('*** Env:', env)
if (env === 'dev') {
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/CtrlV'
} else if (env === 'test') {
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/CtrlVTest'
}

module.exports = {
  env
}
