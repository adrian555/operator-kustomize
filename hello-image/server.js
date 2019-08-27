var http = require('http');
var world = process.env.DEPLOY_ENV;

var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end('Hello ' + world + '!');
};
var www = http.createServer(handleRequest);
www.listen(8080);
