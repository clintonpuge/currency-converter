const express = require('express');
const ConverterController = require('../controllers/converters');

const router = express.Router();

const routes = (app) => {
  app.use(express.json());
  router.get('/', ConverterController.all);

  app.use('/api/converters/', router);
  express.Router().use((err, req, res) => {
    res.status(500).json({ err });
  });
};

module.exports = routes;
