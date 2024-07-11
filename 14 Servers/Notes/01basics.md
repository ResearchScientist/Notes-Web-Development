# Domain Basics

**Domain Name System**

`blog.mysite.com`

`mysite.com` domain name
`.com` top level domain
`blog.` subdomain

**Name Servers**

Entities that map a domain name to an IP address.

**DNS Records**

`A` maps name to IP address
maps website.com to 12.34.567.89

`CNAME` maps name to name
for blog.website.com maps blog to website.com to 12.34.567.89

# Domain Set Up

At hosting site add 2 A records per their instructions.
- @website.com
- www.website.com

At domain registrar site update the name server (NS) records.
- Under custom DNS add the hosting site NS address.

# Tracing

The following requests are ignored by the given website servers.
As a result these requests are used for troubleshooting.

**Ping**

`ping somewebsite.com` sends a round trip packet
`ctrl + q` stops pinging and returns summary of results

Returns ping round trip in ms.

**Trace Route**

`traceroute somewebsite.com` returns list of all IP addresses and travel duration in ms between your location and the website location

Useful for troubleshooting dropped or slow networks.

# DNS Utils

If linux does not have trace already installed. Install dnsutils.

`sudo apt install dnsutils` utilities for looking up DNS info

`dig website.com` returns A records
`dig website.com + trace` returns each server queried along the delegation path

# Packets

Meta data envelopes.

TCP error corrects by confirming how many packets where sent and received.
UCP only transmits packets.

# Server Definition

Servers serve data based on requests.

# Local Server Python

**Terminal**

- `py -V` to return what version of python is installed
- `py -3 -m http.server` starts local server on localhost:8000
- `ctrl + c` stops local server

# Local Server JS

**Structure**

- http api
- request , response
- port information

Use node.js to implement a server.

**Example**

myserver.js
```js
const http = require('http');

const server = http.createServer(function(req,res) {
  res.write('Hiya');
  console.log(`someone visited your page ${req.url}`);
  res.end("bye");
})

server.listen(8080);
console.log('server is listening on port 8080');
```

# Local Server

Change hostname and port.

my.server.js
```js
const http = require('http');
const hostname = '0.0.0.0';  // to change from default 127.0.0.1
const port = 8080;           // to specify port

const server = http.createServer(function(req,res) {
  res.setHeader('Content-Type','text/plain');
  res.write('write hiya');
  console.log(`someone visited your page ${req.url}`);
  res.end('end');
});

server.listen(hostname,port,() => {
  console.log(`server running on hostname ${hostname} and port ${port}`);
});
```

terminal
```
node myserver.js
// displays server listening on port 8080
```
Display
Open a browser window and type `localhost:8080` in address bar to view the rendered response Hiya

Close the port.

`ctrl+c` close server

# More Complete Local Server

server.js
```js
```

# HTTP

Hyper Text Transfer Protocol

Based on requests and responses.

**Request Header**

`host:` request destination
`user-agent:` web browser info
`accept:` text/html , file it is able to accept as a response from the server
`accept-encoding:` gzip 
`accept-language:` en
`content-type` media type
`set-cookie` sets stateful info since web is stateless , it does not know what sites you have visited unless you use cookies
`X-` for custom header

**Response Header**

`server` 
`date` 
`content-type` 
`content-length` 

**Status Codes**

Found in top line of response header.

`200` ok
`301` moved permanently
`302` found , temporary redirect
`401` not authorized
`404` not found
`500` internal server error

General Structure
`1nn` information
`2nn` success
`3nn` redirect
`4nn` client error
`5nn` server error

**Custom Header**

Response header made with JS
```js
myapp.get('/candy',(req,res) => {            // candy is name of html page
  res.set('X-my-example','foryou');          // X-my-example is name of custom header
  res.status(418);                           // 418 status returns I'm a teapot
  res.send('Hi there, did you bring candy'); // displays on yourwebsite.com/example page
});
```

# HTTPS

Secure sockets over HTTP

Public security certificate encrypts data client side before transmitting over web.

# Databases

Are built for data search as opposed to flat files.

Relational
- sql
- based on tables
- data is related
- have a strict organizational structure

Non Relational
- nosql , mongodb , elastic , redis , firebase
- are data agnostic
- have a loose structure

redis used for storing keys and values
mongodb used for storing keys and values as json files 
firebase is a server and database uses json files

# Websocket

A persistent bidirectional connection between the client and the server.

```bash
location / {
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy.pass http://123.0.0.1:3000;
}
```
