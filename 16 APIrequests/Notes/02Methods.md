# Flow

**Request**
HTTP requests are sent from client to server and include a URL and a method. Can also include additional data such as cookies.

header contains
- ethod
- resource url
- target site
- browser agent
- referer is the web page containing the link to the resource , the request's origin

body contains
- can be empty

**Response**
Server responds to requests by sending a response status code back to the client. If successful it also adds, returns, updates the resource.

header contains
- respnose status code
`200` ok
`301` moved
`404` not found
`403` not authorized
- content type
- content length

body contains
- some resource
- can be empty

# Methods

`GET` obtain body content of a resource , ie img or data list from the database
`POST` add a new item to the database
`HEAD` obtain metadata about a resource without obtaining the body content , ie. last updated 
`PUT` update an existing resource or make a new one
`DELETE` remove given resource


