const env = {
  name: process.env.NODE_ENV || 'dev',
  port: process.env.EXPRESS_PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/CtrlV'
}
console.log('*** ENV ***')
console.dir(env, { depth: null, colors: true })

module.exports = {
  env
}
