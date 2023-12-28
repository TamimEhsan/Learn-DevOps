### The dockerfile
```
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]

```

We at first copy the dependencies and install them. then we copy the files to make use of caching. 
We can use both
```
RUN ["npm", "i"] 
or
RUN npm i
```
but for CMD we have to follow the given way.

We run 
```
docker build -t learn/docker-node .
```

### Environments

We can add env values to our docker file. After running the app we can see that the server is listening to port 3000 although we have said to lisen to 3005 if no env is set. 

### Port exposing and forwarding
As we need to communicate with the container we need to expose the port 3000 to the host machine. But that is not enough. We have to communicate with the ip address of docker container with the port. If we want to use that port on the host machine we have to forward the port of the host machine. which is done while running the container. The p option stands for publish 

```
docker run -p Host-port:docker-container-port "image id"
```
For readability just use the same port in both.
```
docker run -p 3000:3000 learn/docker-node
```
Then we can access the server from our browser by calling to `localhost:3000/message`

### Other configs
The docker container just created will have arbitrary name. We can rename it. 
```
docker run --name learn/docker-node -p 3000:3000 learn/docker-node
```

Also we can see that the container is using the terminal. and it is unusable. To run it in the background (if needed). So to run in detached more just add flag d

```
docker run --name learn_docker-node -d -p 3000:3000 learn/docker-node
```

### Interacting with running container
To interact with running container by bash or sh we need to use
```
docker exec -it learn_docker-node /bin/sh
```
if the os supports bash we can use bash too

### Finishing

And finally to stop the container
```
docker [stop/run/remove] learn_docker-node
```
We can start a stopped docker with previous configs (no need to give port publish)
we can also remove the container totally.