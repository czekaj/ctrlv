const env = {
  name: process.env.NODE_ENV || 'dev',
  port: process.env.EXPRESS_PORT || 5000,
  mongoUri: process.env.MONGO_URI ||
    (this.name !== 'test' ? 'mongodb://localhost:27017/CtrlV' : 'mongodb://localhost:27017/CtrlVTest')
}
console.log('*** ENV ***')
console.dir(env, { depth: null, colors: true })

module.exports = {
  env
}
