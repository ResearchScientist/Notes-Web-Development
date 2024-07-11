const http = require('http');
const hostname = '0.0.0.0';  // to change from default 127.0.0.1
const port = 8080;           // to specify port

const server = http.createServer(function(req,res) {
  res.setHeader('Content-Type','text/plain');
  res.write('write hiya');
  res.end('end');
});

server.listen(hostname,port,() => {
  console.log(`server running on hostname ${hostname} and port ${port}`);
});
