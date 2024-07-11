Best defense is to not trust any data coming in from the client.
That includes
- input fields
- GET requests
- POST requests
- HTTP headers
- cookies
- user uploaded files
Make sure to sanitise all data heading to the server.

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

# DOS

## Attack

Overwhelming the server with numerous requests or slow reads.

## Defense

Block intrusive traffic. Place defense before or within the server.

