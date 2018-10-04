module.exports = {
  all: async (req, res) => {
    const response = { test: 'test' };
    return res.status(200).json(response);
  },
};
