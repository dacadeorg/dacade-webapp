module.exports = () => {
  const env = process.env.NODE_ENV || 'development'
  return require(`./${env}.js`)
}
