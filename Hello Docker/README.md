### Creating a Dockerfile

Dockerfile is the set of instruction to build docker image. The base image can be a OS like ubuntu. But then we need to install node/java etc. So we can start from a base which already has node.

1. Pull a base image. syntax is `FROM base:tag`
2. Set working directory
3. Set any ENV if there is
3. If there be any dependency like node modules, then copy the package.json/gradlew and install
4. Copy project files and folders. Don't forget to add dockerignore
5. Run the app by CMD

Docker creates the image layer by layer for caching. So, we do step 3 before 4.

### Creating image
The image contains all the necessary things to run the process. 

```
Docker build -t image-name ./dockerfile-location
```

The image is not a file that we can find in our repository. But we can find the image by running
```
Docker image list
```
### Running a container

A container is a running process. Image is kind of like a exe file and container is like the program running from it. We can run multiple container from the same image.
```
Docker run --name container-name image-name
```

### Pull and push
We can also pull a image from dockerhub.
```
Docker pull ubuntu:latest
```
And also can push our image to dockerhub in private or public. Thus others/deployment can pull from it.

To push we first need to tag our image
```
docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]
docker push NAME[:TAG]

```

```
docker tag hello-docker:latest tamimehsan99/hello-docker:latest
docker push tamimehsan99/hello-docker:latest
# or
docker push docker.io/tamimehsan99/hello-docker:latest
```

### Removing images and containers
```
docker image rm image1 image2 image3
docker container rm container-1 container-2
```

To remove all images we can run
```
docker image rm $(docker image ls -q)
```
if a container is running on some image we will get error. So we will need to remove the container first too.

```
docker container rm -f $(docker container ls -aq)
```
q option filters only container id and a option brings stopped containers too. f option forces to remove running containers too
