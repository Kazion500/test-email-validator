const app = require('.');
const supertest = require('supertest');
const request = supertest(app);

module.exports = {request}


