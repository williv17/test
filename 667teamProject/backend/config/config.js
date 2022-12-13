
//
// Module Dependencies
//
require('dotenv').config();

// Environment Variables 
module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  JWT_SECRET: process.env.JWT_SECRET || 'csc667',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '604800000',
};
