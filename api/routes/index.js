const express = require('express');

const converterRoutes = require('./converter');
const currenciesRoutes = require('./currencies');

const routes = (app) => {
  app.use(express.json());
  app.use('/api/converters/', converterRoutes);
  app.use('/api/currencies/', currenciesRoutes);
  express.Router().use((err, req, res) => {
    res.status(500).json({ err });
  });
};

module.exports = routes;
