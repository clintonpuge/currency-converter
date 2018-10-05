const mapMultiCurrencies = (list, amount) => {
  const result = list.map((currency) => {
    const key = Object.keys(currency)[0];
    const total = compute(currency, amount, key);
    return { [key]: total }
  });
  return Object.assign(...result);
};

const compute = (obj, amount, currencies) => {
  const conversionObj = Object.keys(obj)
                .map((currency) => obj[currency])
                .find((currency) => currency.id === currencies);
  if (conversionObj) {
    return Number(conversionObj.val) * Number(amount);
  }
  return obj[currencies].val || 0;
}

module.exports = {
  compute,
  mapMultiCurrencies
}
