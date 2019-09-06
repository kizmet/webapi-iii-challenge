const server = require('./server.js');

// configure port #
const PORT = process.env.PORT || 4000;

// listen on port for requests
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
