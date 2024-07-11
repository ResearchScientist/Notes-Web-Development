# Definitions

Bandwidth - how much data can pass through per s
Latency - how long it takes to get from one end point to another endpoint

# TCP

Transfer Control Protocol

Determines reliability of transferring files
- sends small amount of data packets
- if all packets received then sends larger amount of data packets

**Initial Window**

The initial packet size window is 14kb.

Goal is to get data through within that first window.

# Cache

Local web storage.

Can cache
- get
- head
- options

Cannot cache
- put
- post
- delete
- patch

**Conditions**

*No Cache*

no local copy stored

*Stale*

stored copy is no longer valid
conditional GET request obtains a new copy

*Valid*

stored copy is still valid
do not request from server

**Headers**

- no-store - get a new copy each time
- no-cache - stores a copy , but not used until checked with server if newest version
- max-age - file valid expiration in s
- s-maxage - file valid expiration in s for CDNs

Giving a file a long series of unique numbers allows for updating the cache prior to its valid expiration.

# Service Workers

Intermediaries between browser and server.
Uses headers to communicate with server.

Used for loading assets even when offline.

# Lazy Loading

Loading content as it is required by the user instead of loading all content.

react loadable


# Pre Fetch



# HTTP 2

Handles multiple requests in parallel.

# CDN

Distributed static asset hosting.

- netlify
- cloudflare
