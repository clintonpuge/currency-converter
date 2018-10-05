const axios = require('axios');
const json2csv = require('json2csv').parse;
const { compute, mapMultiCurrencies } = require('../models/converter');

const API_URL = 'https://free.currencyconverterapi.com/api/v6/convert';

module.exports = {
  show: async (req, res) => {
    try {
      const { currency, amount } = req.query;
      // move to config
      const response = await axios.get(`${API_URL}?q=${currency}`);
      const result = compute(response.data.results, amount, currency);
      return res.status(200).json({result});
    } catch (error) {
      return res.status(500).json({error: error.response});
    }
  },
  download: async (req, res) => {
    try {
      const { amount, fields, from } = req.query;
      
      let fieldsParams = fields;

      if (!Array.isArray(fields)) {
        fieldsParams = [fields];
      }

      // multiple async request
      const asyncCalls = [];
      for (let i = 0; i < fieldsParams.length; i++) {
        asyncCalls.push(axios.get(`${API_URL}?q=${from}_${fieldsParams[i]}`));
      }

      // mapped the content before save to csv
      const results = await Promise.all(asyncCalls);
      const datas =  mapMultiCurrencies(results.map(result => result.data.results), amount);
      const headers = fieldsParams.map((field) => `${from}_${field}`);

      // generate csv
      const csv = json2csv(datas, { fields: headers } );
      res.setHeader('Content-disposition', 'attachment; filename=currencies.csv');
      res.set('Content-Type', 'text/csv');
      return res.status(201).send(csv);
    } catch (error) {
      return res.status(500).json({error: error.response});
    }
  },
};
