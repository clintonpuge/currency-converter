module.exports = {
  mapObjectToArray: (obj) => {
    return Object.keys(obj).map(currency => ({
      key: obj[currency].id,
      text: obj[currency].id,
      value: obj[currency].id,
      label: obj[currency].id,
    }));
  }
}
