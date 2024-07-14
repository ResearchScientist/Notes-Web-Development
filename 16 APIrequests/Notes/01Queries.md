# Query Parameters

Query parameters are used within the API endpoint url.

`?`

`&`

`fields`

`start`

`limit`

`sort`

Queries are executed with key value pairs preceded by `?`.

Individual queries are separated by `&`.

`website.com/kittens?colour=black&age=5`

# Filter

Return only given fields.

`website.com/kittens?name,age`

# Pagination

Return only the given amount of items at a time.

`website.com/kittens?limit=100`

Only query a portion of the database.

`website.com/kittens?start=50&limit=100`

# Sort

`website.com/kittens?sort+name,-date`

# Idempotency

Ensures that a request has the same effect whether one or multiple calls are made. This is helpful in limiting abuse and in safely retrying after an error.

## Implementation

**Client Side**

- Generate a unique identifier (idempotency key) for each request.
- Include the key in the header of the API request.
- If the request fails, the client can retry with the same key.

**Server Side**

- Check for existence of idempotency key.
- If another request with a matching key arrives, server can respond with the previous response and a 304 (not modified) status code. Thus not needing to reprocess the data.

For example.
Initial delete request returns status 204.
Subsequent delete requests return status 404.

# Partial Responses

Send a header request to get the size of the resource.

**Request**
`GET` Range: bytes=0-5000

**Response**
`206` (partial content) Content-Range: bytes 0-5000/10000

**Request**
`GET` Range: bytes=5000-10000

