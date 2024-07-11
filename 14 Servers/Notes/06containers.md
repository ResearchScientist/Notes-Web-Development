# Resurces

- btholt.github.io / complete-intro-to-containers

# Application Architecture

**Monolith**

One service that manages the whole application.

- application runs on one code base

**Microservice**

Application broken up into different microservices.
Each microservice manages one task.

- each microservice can have its own code base that differs from all other microservices in the same application
- each microservice uses the same API

# Server Infrastructure

**Virtual Machines**

Run an entire operating system on each application.
- ubuntu
- node.js
- mysql
- nginx
- python

**Containers**

Compartmentalize running applications into their own independent services with each containing only the libraries it needs.
- ubuntu
--
- nodejs
--
- mysql
--
- nginx
--
- python

Having decoupled applications allows for faster startup , easier development , and portability.
Can run on any OS.

# Linux Systems

- debian


# Container Web PAAS

- docker
- aws ecs
- coreos rkt

# Orchestration

Method for managing numerous servers.

- kubernetes , k8s
- docker swarm
- aws eks
- aks

# Load Balancing

Distribute incoming traffic amongst available servers.

Algorithms
- round robin
- ip hashing
- random choice
- least connections
- least load

Display running applications CPU memory
`top` displays info about running applications
`q` quit

Nginx can be used for setting up load balancing between servers.

# Deployment

Tools for setting up servers.

- vagrant
- puppet

# Docker CLI

`docker search python` searches for python containers in dockerhub

`docker run something` runs given docker containers
`docker restart something` restarts given container
`docker pause someContainerID` pauses
`docker unpause someContainerID` resumes
`docker rm someContainerID` deletes given container
`docker container prune` removes all stopped containers

# Docker File

File that contains instructions for building a container.
No extension in file.

Dockerfile
```
FROM node:12-stretch

CMD ["node","e","console.log(\"hiya\")"] // console logs hi
```

**Change User**

- Default is root.
- You do not want other applications to have root access.

dockerfile
```js
FROM node:12-stretch

USER node

RUN mkdir /home/node/src

WORKDIR /home/node/src                                   // copies files onto src dir of node user dir , sets it as working dir

COPY --chown=node:node package-lock.json package.json ./ // changes owner from root to node , copies local files package-lock.json and package.json onto container

RUN npm ci
  
COPY --chown=node:node . .                               // copies all files onto container

CMD ["node","index.js"]
```

**Confirm User**

node
```node
docker run --init --rm --publish 3000:3000 my-cute-app whoami
```

# Docker Ignore

File that contains files to ignore.

`.dockerignore`

```
.git/
node_modules/
```

# Make Container

- `mkdir containerName`
- `cd containerName`

**Assigns ID**

node
```node
docker build . // builds container at pwd , returns container ID
```

**Assign Name**

node
```node
docker build --tag my-cute-app . // builds container at pwd , assigns it given name
```

# Run Container

**ID**

node
```node
docker run 9e123456
```

**Name**

node
```node
docker run my-cute-app
```

# Version Container

node
```node
docker build --tag my-cute-app:2 . // builds container at pwd , assigns it given name and version
```

# Simple Server Example

myserver.js
```js
const http = require("http");

http
.createServer(function(request,response) {
  console.log("request recv");
  response.end("hi","utf-8");
})
.listen(3000);
console.log("server started");
```

# Set Listening Port

Do this at runtime.
Putting it in a docker file does not behave as expected.

node
```node
docker run --init --rm --publish 3000:3000 my-cute-app
```


