# Methods

- SSH
- Firewall
- 2 Factor Authorization
- VPN
- Continuous Updates

# Unattended Upgrades

Updates as soon as patches are available.
`sudo apt install unattended-upgrades`

# curl

Content url allows for upgrading a package to a newer version than the one apt has.

Upgrades to node 10
```bash
curl -sL https://deb.nodesource.com/setup_10.x -0 nodesource_setup.sh
sudo bash nodesource_setup.sh  # points to newer version
sudo apt install nodejs
```

# Firewall

`sudo apt install nmap`
`nmap someServerIPaddress` shows open ports
`nmap -sV someServerIPaddress` shows OS and software

`sudo apt install ufw` uncomplicated firewall , allows you to set rules for port traffic

# Ports

`netstat -a` lists open ports

# Permissions

Set file permissions to read write execute as appropriate.

# HTTPS Security Certificate

Site certbot . eff . org uses lets encrypt to issue free certificates.

Go to site and follow instructions.

If firewall not already set to allow https then add the following rule.

`sudo ufw allow https`

**HTTP2**

Allows for multiplexing and header compression.
Results in faster pages loads.

`sudo less /etc/nginx/sites-available/default`

Edit file and add http2 between port and ssl.
```js
listen [::] 443 http2 ssl
listen 443 http2 ssl;
```

`sudo service nginx reload`

**HTTP3**

Does not require traditional handshake.
Results in faster page loads.
