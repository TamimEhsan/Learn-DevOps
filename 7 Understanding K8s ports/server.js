const http = require('http');
const url = require('url');

const { randomUUID } = require('crypto');
const time = randomUUID();

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL and query parameters
  const parsedUrl = url.parse(req.url, true);
  const message = parsedUrl.query.message;

  // Set the response HTTP header with HTTP status and content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response body "Echo: <message>"
  if (message) {
    res.end(`Echo: ${message} | ${time}`);
  } else {
    res.end('Please provide a message parameter in the URL. ' + time);
  }
});

// The server listens on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
