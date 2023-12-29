## demo app - developing with Docker

This demo app shows a simple user profile app set up using 
- index.html with pure js and css styles
- nodejs backend with express module
- mongodb for data storage

All components are docker-based

### With Docker

#### To start the application

Step 1: Create docker network

    docker network create mongo-network 

Step 2: start mongodb 

    docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb --net mongo-network mongo    

Step 3: start mongo-express
    
    docker run -d -p 8081:8081 -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password --net mongo-network --name mongo-express -e ME_CONFIG_MONGODB_SERVER=mongodb mongo-express   

_NOTE: creating docker-network in optional. You can start both containers in a default network. In this case, just emit `--net` flag in `docker run` command_

Step 4: open mongo-express from browser

    http://localhost:8081

Step 5: create `user-account` _db_ and `users` _collection_ in mongo-express

Step 6: Start your nodejs application locally - go to `app` directory of project 

    npm install 
    node server.js
    
Step 7: Access you nodejs application UI from browser

    http://localhost:3000

### With Docker Compose

#### To start the application

Step 1: start mongodb and mongo-express

    docker-compose -f docker-compose.yaml up
    
_You can access the mongo-express under localhost:8080 from your browser_
    
Step 2: in mongo-express UI - create a new database "my-db"

Step 3: in mongo-express UI - create a new collection "users" in the database "my-db"       
    
Step 4: start node server 

    npm install
    node server.js
    
Step 5: access the nodejs application from browser 

    http://localhost:3000

### Understanding volumes
Volumes are of 3 types. Named, directed and anonymous. We used named and directed ones here
#### Directed Volumes
We mount one of the host location into the container. In our docker-compose file we add `host dir:container dir`
```
volumes:
    - 'G:\Devops\4 Volumes\app\images:/app/images'
```
You need to change your host directory as per your pc. So, if we now change the image `profile-1.jpg` we will see change in the app. Also in docker desktop we will find mount written beside the folder inside the container. 
#### Named Volumes
Here a mount is created, but location is maintained by docker. But unlike anonymous which creates a random location, named volumes are consistent. So you can access them from all running containers. Same can be done by directed ones too but not by anonymous.

To created one we need something like `name:container dir` and we need to add another entry in docker-compose file called volumes and add the name under it. We don't need to do this for directed ones
```
mongodb:
    image: mongo
    volumes:
      - mongo-data:/data/db
    ...
volumes:
  mongo-data:

```

### Acknowledgement

This part of the repo is taken from [techworld-js-docker-demo-app](https://gitlab.com/nanuchi/techworld-js-docker-demo-app) and modified by me.

Video tutorial can be found here [Docker Volumes explained in 6 minutes by Techworld with Nana](https://www.youtube.com/watch?v=p2PH_YPCsis)
