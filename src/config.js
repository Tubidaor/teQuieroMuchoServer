module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://tubidaor@localhost/te_quiero_mucho',
  JWT_SECRET: process.env.JWT_SECRET || 'chumbawomba',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '24hrs'
}