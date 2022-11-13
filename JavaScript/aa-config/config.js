'use strict';

const config = {
  dbConfig: {
    host: '127.0.0.1',
    port: 5432,
    database: 'example',
    user: 'marcus',
    password: 'marcus',
  },
  serverConfig: {
    port: 8001
  },
  staticServerConfig: {
    port: 8000,
    path: './static'
  },
  hashing: {
    keylength: 64,
    encoding: 'base64'
  },
  transport: 'http',
  framework: 'native', //fastify, express etc.
  logger: 'pino'
}
module.exports = config;
