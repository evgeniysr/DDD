'use strict';

const crypto = require('node:crypto');
const {hashing: {keylength, encoding}} = require('./config.js');

const hash = (password) => new Promise((resolve, reject) => {
  const salt = crypto.randomBytes(16).toString(encoding);
  crypto.scrypt(password, salt, keylength, (err, result) => {
    if (err) reject(err);
    resolve(salt + ':' + result.toString(encoding));
  });
});

module.exports = hash;
