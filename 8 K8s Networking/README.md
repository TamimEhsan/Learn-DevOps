# Run a simple echo echo server on kubernetes

We will run another server and expose it to outside. The server will call the first echo server and return the response after modification. Here the first echo server doesn't need to be exposed to outside. So, the service type can be changed to clusterIP. Notice that in the new server file it calls to the first echo server. But how will it call the echo server? we can use the clusterIP and the port of it. We know the port but don't know the clusterIP. Luckily we can use the dns resolution for that. So we can use the service name and the port to access the echo server. And access the second server using nodeport

Follow the same procedure as the first one



## Create image 
Copy the `.dockerignore` and `Dockerfile`. Make sure you have docker installed in your device. Then run
```bash
docker build -t echo-server2 . # builds docker image
```
Docker build builds a docker image with tag echo-server from the dockerfile in current location. Then we create a container from the image with name echo-server-container. 

## Run inside kubernetes

At first the image should be loaded inside minikube
```bash
minikube start
minikube image load echo-server2
minikube image ls
```

The apply the deployment file
```bash
kubectl apply -f deployment2.yaml
```

Now if you run `kubectl get service` you can find the service with port `4001:32009/TCP`. You can access the server from within the cluster using the clusterIP of the echo-server-service and the port(3001) of it. 

Now to access the echo server run `curl $(minikube ip):32009/?message=echo`

After you are finished, delete the deployments and stop minikube
```bash
kubectl delete -f deployment.yaml
kubectl delete -f deployment2.yaml
minikube stop
```