const express = require('express');
const helmet = require('helmet');

const cors = require('./start/cors');
const routes = require('./api/routes');

const app = express();
app.use(helmet());

cors(app);
routes(app);

module.exports = app;
