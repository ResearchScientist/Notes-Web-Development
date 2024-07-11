# Web Servers

Route incoming requests to app , database , other server.

- Nginx
- Apache , for PHP

# Nginx

For serving web content.

**Install**

```bash
sudo apt install nginx
sudo service nginx start  "start nginx"
```

**Help Docs**

View help docs. But may be easier to search online.
`sudo less /etc/nginx/sites-available/default` opens docs

**Structure**

```bash
# base directory for requests
root /var/www/html;

# html defauls
index index.html index.htm index.nginx-debian.html

server_name _; # change to your server name server_name myserver.com www.myserver.com

# server block
location / {
  # directive
  # serve request as file then dir then as 404
  try_files:$uri/ $uri/ =404;
}
```

**Configuration*

Make html file.
```bash
sudo vi /var/www/html/index.html
```
This file gets served because it comes first in order.

**Redirects**

When user reaches /help it redirects to given website.
```bash
location /help {
  return 301 https://somewebsite;
}
```

**Sub Domain**

Adds subdomain called test.
```bash
server {
  listen 80;
  listen [::]80;
  server_name test.somewebsite.com
  location / {
    proxy_pass http://localhost:3000;
  }
}
```

# Node JS

For running applications within the server.

**Application Architecture**

UI
 \
  html
  |
  css
  |
  js

**Set Up**

Change ownership of www directory to current user.
`sudo chown -R $USER:$USER /var/www` 

Make app directory.
`mkdir /var/www/someAppName`

Initialize empty git repository.
`cd /var/www/someAppName`
`git init`

Make directories.
`mkdir -p ui/html ui/css ui/js`

Make empty app file.
`touch myApp.js`

Initialize project.
`npm init`  makes package.json file and asks you to fill in the fields , can leave some blank

Install a node.js framework
`npm install express --save` there are many other frameworks to look into

Edit nginx config to point to correct port.
`sudo vi /etc/nginx/sites-available/default`
```bash
location /{
  proxy_pass http:127.0.0.1:3000/;  # delete try_files:$uri/ $uri/ =404;
}
```
`sudo service nginx reload`
`node myapp.js` start myapp

# Process Manager

Runs in the background to keep myapp running.
- restarts myapp after a crash.
- restarts myapp after a server restart

`sudo npm i -g pm2`  there are other process managers to look into
`pm2 start myapp.js` start pm2
`pm2 startup` make pm2 autostart on server start

# Version Control

**GitHub**

*GitHub*
Make a new empty repository at GitHub.
Initialize with a readme.md.
Add Node to gitignore.

*Terminal*
Make SSH keys.
Add pub key to GitHub.

*Server*
Log in to server.
`git remote add origin git@github.com:someRepo`

Edit .gitignore file.
Add `node_modules/`

Initial push.
`git commit -am "modify git ignore"`
`git push origin master`

*Terminal*
In someProject directory.
`git clone git@github.com:someRepo` paste from GitHub clone link

This puts the files in your local directory for development.
Then you push to GitHub.
From server pull from GitHub.











