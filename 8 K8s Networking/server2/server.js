const http = require('http');
const url = require('url');

const options = {
  hostname: 'echo-server-service', // Assuming this is the service name of the first server
  port: 3001, // Assuming the first server is running on port 3001
  path: '/', // Assuming the first server's endpoint
  method: 'GET'
};

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const message = parsedUrl.query.message;

  // Set the response HTTP header with HTTP status and content type
  

  // Send the response body "Echo: <message>"
  if (message) {
    options.path = `/?message=${message}`;
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Please provide a message parameter in the URL.');
    return;
  }

  // Make a request to the first server
  const request = http.request(options, (response) => {
    let responseData = '';
    // Accumulate the response data
    response.on('data', (chunk) => {
      responseData += chunk;
    });
    responseData += ' from server 2 '; // Append additional data
    // When the response ends, send the accumulated data as the response of this server
    response.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(responseData);
    });
  });

  // Handle errors
  request.on('error', (error) => {
    console.error('Error making HTTP request:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });

  // End the request
  request.end();
});

const PORT = 4000; // Port for this server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});