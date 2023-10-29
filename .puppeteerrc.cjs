const { join } = require('path');
const dotenv = require('dotenv');

const isDev = process.env.NODE_ENV === 'development';

/**
 * @type {import("puppeteer").Configuration}
 */

if (isDev) module.exports = {};
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
