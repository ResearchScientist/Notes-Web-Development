# Data Centers

Large centralized locations containing many physical servers.
Scaling requires adding or removing physical servers.Scaling

# Cloud

Users do not need to maintain their own servers.
Instead rent a server or a part of a server.
Scaling done by reducing or asking for more server storage.

**Virtual Private Servers**

- digital ocean . com
- aws
- azure
- google cloud

# SSH Authentication

More secure than username / password.
Secure Socket Shell is a very large key.
Currently unhackable.

**SSH Key Pair**

*Private Key*
Do not expose this key. This is a secret key.
Stored on local computer.
Used to encrypt data before transfer.
Used to decrypt received data.

*Public Key*
Stored on server.
Used to encrypt data.

**SSH Key Generation**

Go to stored keys directory.
```bash
cd ~/.ssh  "location of all stored ssh keys"
ls         "lists stored keys"
```

Make keys.
```bash
ssh-keygen "generates rsa key pair"
           "asks for file in which to save key"
           "give a descriptive file name that you can recognize"
           "enter a passphrase , leave blank for no passphrase"
           "enter same passphrase again"
           "displays random art when done"
```

Find key , if too many keys listed to easily view.
```bash
cd ~/.ssh              "if not already at key directory"
ls | grep keyFileName  "returns both private and public keys"
                       "private key has no file extension"
                       "public key has .pub file extension"
```

Copy public key.
```bash
cat keyFileName.pub  "displays contents of public key content"
                     "copy content to clipboard"
```

**SSH Key Use**

Use public key to authorize sign in into
- repositories
- cloud servers

Follow instructions from online service providers on how to add public key.

# SSH Connect To Web Server

`ssh root@someWebServerIPaddress` IP address is from web service hosting your server

Connection but forgot to enter key name
```bash
ssh root@123.45.678.123  "enter server host IP address"
                         "authenticity can't be established"
                         "do you want to continue" "yes" "msg because 1st time connecting to this address"
                         "permanently added host , permission denied"
```

Proper Connection
```bash
ssh -i keyFileName root@123.45.678.123  "displays server system info upon successful connection"
```

If you ever receive an authenticity can't be established after previously successfully accessing a server , the server may have been compromised.

**Debugging**

```bash
ssh root@123.45.678.123 -v  "gives details on connection path"

exit                        "to exit details summary"
```

# KeyChain

Some OSs automatically check for keys.
If your OS does not you can configure it so it does.

To automatically add to keychain.
```bash
vi ~/.ssh/config  "opens vim editor"
                  "Host AddKyesToAgent" "yes"
                  "Host UseKeychain" "yes"
```

To manually add to keychain.
```bash
ssh-add -K ~/.ssh/ keyFileName
```
