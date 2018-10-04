const express = require('express');
const helmet = require('helmet');

const routes = require('./api/routes');

const app = express();
app.use(helmet());

routes(app);

module.exports = app;
