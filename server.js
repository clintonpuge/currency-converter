const http = require('http');

const app = require('./app');

const port = process.env.PORT || 1234;

const server = http.createServer(app);

server.listen(port, () => console.log(`Listening to PORT ${port}`));


module.exports = server;