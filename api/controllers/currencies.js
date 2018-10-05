const axios = require('axios');

const { mapObjectToArray } = require('../models/currency');

module.exports = {
  all: async (req, res) => {
    try {
      const response = await axios.get('https://free.currencyconverterapi.com/api/v6/currencies');
      const result = mapObjectToArray(response.data.results);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({error});
    }
  },
};
