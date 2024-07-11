Using `sudo` is not necessary since most likely root access is already granted in remote server.

Make a new user and give user sudo access.
For security reasons remove auto root access.

# Add New User

```bash
sudo adduser someName
"enter new unix password"
"re enter new unix password"
"is the info correct"
```

# User Set Up

**SUDO Access**

```bash
sudo usermod -aG sudo someName  "adds user to sudo group"

su someName                     "switches current user to given user"
                                "test if someName has sudo access"
```

**Add Public Key**

```bash
cd ~
mkdir -p ~/.ssh
vi ~/.ssh/authorized_keys  "makes file called authorized_keys"
                           "copy public key into authorized_keys file"

exit                            "exit user"
exit                            "logout of server"
```

**Log In**

Log into web server with new user name.

```bash
ssh someName@123.45.678.123
```

# Secure Log In

**Restrict Keys Access**

```bash
chmod 644 ~/.ssh/authorized_keys  "restricts file access to sudo and system"
```

**Disable Root Login**

```bash
sudo vi /etc/ssh/sshd_config "opens config file" "change PermitRootLogin yes to no" "wq to exit"
sudo service sshd restart    "restarts sshd"
```

```bash
ssh root@123.45.678.123     "no longer works"
ssh someName@123.45.678.123 "works"
```

# Logs

Once you set up a server hackers will continuously try to break in.

Log of connection attempts.
```bash
sudo tail -f /var/log/auth.log  "displays connection attempts as they occur"
```
`ctrl + c` to exit log

Good to pipe this output onto another file for troubleshooting.
