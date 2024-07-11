# Attack Method

- script injection

# Effect

- read data
- perform operations on user's behalf
- drop tables
- system control

# Prevalence

- 30% of sites at risk of attack

# Types

- stored xss - script is stored
- reflected xss - server response executes script , error msg
- dom based xss - server not involved , query parameters
- blind xss - exploits internal non client facing app

# Attack Vectors

- user input

```js
username = "Me<script>nefariousfunction()</script>";
```

- user generated rich text , wysiwyg editors
- embedded content , images iframes
- user entered urls
- echoed user input , hi "username"
- query parameters rendered in dom
- `element.innerHTML=?`

# Penetration Testing

Attacker looking for vulnerabilities.

- inputing tags , bold
- SQL queries

# User Input

Do not allow user input within

- html comment `<!-- <%- userData %> -->`
- tag name `<<%- userData %> class="someElement">`
- style block `<style> <%- userData %> </style>`
- attribute name `<iframe <%- userData %>="someValue"/>`
- script `<script> <%- userData %> </script>`

# User Data Sanitazion

**Escape Data Prior to Rendering To HTML**

This changes script tags so that the script code does not run.

Different libraries escape characters in different ways.

- Vue
- React
- Angular
- ejs `<%= user input expression %>`

# Content Security Policy

Tells browser which locations scripts are allowed to be downloaded from.

Place within response header or meta tag.
```js
Content-Security-Policy: script-src 'self' https://mysite.com;
                         font-src: https://fonts.googleapis.com
```

**Source**
- script-src - scripts
- child-src - workers
- img-src - images
- media-src - media
- style-src - external style sheets
- default-src - default

**Keyword**
- 'none' - no sources allowed
- 'self' - current origin
- 'unsafe-inline' - allows inline JS & CSS
- 'unsafe-eval' - allows eval()

# Malicious Attachments

- pdf
- img

If users are allowed to rename files then
HTML can be incorporated into these files and executed by browsers.

**Defenses**

- limit file types
- compress files , this strips non visible data such as scripts
