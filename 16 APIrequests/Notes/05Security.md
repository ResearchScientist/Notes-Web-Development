# Attack Vectors

Do not trust any data coming in from the client.

- input fields
- GET requests
- POST requests
- HTTP headers
- cookies
- user uploaded files

# Defenses

- rate limiting
- password encription : bcrypt node package
- jwt blacklisting
- json schema validation
- escape html & css
- ORM/ODM injection protection
- security linter

Sanitise all data heading to the server.

Have the server use HTTPS and HSTS 

# XSS Cross Site Scripting

## Attack

Code is injected client side.

## Defense

Sanitise input fields by stripping out markup tags such as

- `<script>`
- `<object>`
- `<embed>`
- `<link>`

# SQL Injection

## Attack

Code is injected client side.

## Defense

Escape all characters that are used in SQL.

`'` becomes `\'`

# CSRF Cross Site Request Forgery

## Attack

Attacker adds hidden fields to a form.

## Defense

Require POST requests to include a user specific site generated secret.

# Clickjacking

## Attack

Hidden button is overlayed over a site's UI.

## Defense

Do not allow site to be embedded in an iframe by another site. This is stated with HTTP headers.

# DDOS

## Attack

Distributed Denial of Service. Overwhelming the server with numerous requests or slow reads.

## Defense

Block intrusive traffic. Place defense before or within the server.

**Rate Limit**

- express-rate-limit : a node js package
- nginx : a reverse proxy server put infront of node server

