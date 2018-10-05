const express = require('express');
const CurrenciesController = require('../controllers/currencies');

const router = express.Router();

router.get('/', CurrenciesController.all);

module.exports = router;
