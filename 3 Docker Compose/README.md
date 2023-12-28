Docker compose is used to run multiple container at once

### Install docker compose
install docker compose in linux from `docs.docker.com/compose/install` and follow along. Docker desktop in windows already comes with docker and docker-compose

To check installation in cmd `docker-compose --version`

### Project structure
Here I created 2 backend and 1 frontend. Introduced needless complexity to simulate microservice. So frontend calls backend2 and backend2 calls backend1 to get data.

### Running without docker

```
cd backend-1
npm i
npm start
```

```
cd backend-2
npm i
npm start
```

```
cd frontend
npm i
npm start
```

head to browser `localhost:3000` and do some stuff.

### Running without compose
for backend run
```
docker build -t learn/compose-backend-1 ./backend-1
docker run --name learn_compose-backend-1 -d -p 8080:8080 learn/compose-backend
```
```
docker build -t learn/compose-backend-2 ./backend-2
docker run --name learn_compose-backend-2 -d -p 8088:8088 learn/compose-backend
```
for frontend run
```
docker build -t learn/compose-backend ./frontend
docker run --name learn_compose-frontend -d -p 3000:3000 learn/compose-frontend
```

So, we have to deal with each container individually. We can use docker compose here

Also, notice that you can access backend1 through `http://localhost:8080/message`. But in reality we don't need to publish backend 1 to outside world. Publishing backend2 is sufficient.

### Running with docker compose
Create a `docker-compose.yml` file. And mention the services, build location/ image, port forwarding and dependency on other services and then run
```
docker-compose up -d
```
-d is for detached mode

### Network of compose
docker-compose creates a network within the containers. So, we can work without publishing the ports to the host. In this scenario we might not need ports for backend. Here in backend 2 we call backend 1 within network by `http://api1:8080/message` 
But we still need to publish the ports for backend1 as we are using client side rendering. If we used server side rendering then we didn't need to publish any of the backend port!

### Stop
to take down the containers we can run
```
docker-compose down
```
It will take down the containers and the network