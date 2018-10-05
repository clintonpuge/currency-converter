const express = require('express');
const ConverterController = require('../controllers/converters');

const router = express.Router();

router.get('/', ConverterController.show);

router.get('/download', ConverterController.download)

module.exports = router;
