# Run a simple echo server on kubernetes

## Create a simple nodejs echo server

Copy the `package.json` and `server.js` file. Make sure you have node installed.

```bash
node server.js
```
You will find the server running in port 3000. Visi the link to access the echo server `http://localhost:3000/?message=echo`

## Create image and container
Copy the `.dockerignore` and `Dockerfile`. Make sure you have docker installed in your device. Then run
```bash
docker build -t echo-server . # builds docker image
docker run -p 3001:3000 --name echo-server-container echo-server # runs the container
```
Docker build builds a docker image with tag echo-server from the dockerfile in current location. Then we create a container from the image with name echo-server-container. The -p flag stands for port forward. `host_port:container_port` , so the port 3000 inside container is mapped to 3001 port of host. You can't port forward from the dockerfile.

Now access the link `http://localhost:3001/?message=echo` from browser. 
To stop the container run 
```
docker stop echo-server-container
```

## Run inside kubernetes

At first the image should be loaded inside minikube
```
minikube start
minikube image load echo-server
minikube image ls
```

Now create deployment based on the `deployment.yaml`
```
kubectl apply deployment.yaml
```
The file and its content descriptions are
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-server-deployment
spec:
  replicas: 3 # 3 replicas of the server will run together
  selector: # apply this configuration to the container matching labels
    matchLabels:
      app: echo-server # this should match the .template.metadata.labels
  template: # template for creating pod
    metadata:
      labels:
        app: echo-server # name of the pod
    spec:
      containers:
      - name: echo-server-container
        image: echo-server:latest # Use the image you built
        imagePullPolicy: Never # so minikube doesn't try to pull from remote
        ports:
        - containerPort: 3000 # the port of the container ie the echo-server
```
```yaml
apiVersion: v1
kind: Service
metadata:
  name: echo-server-service
spec:
  type: NodePort # so that the port is accessible to outside of cluster
  selector:
    app: echo-server # it should match .template.metadata.labels of the deployment
  ports:
    - protocol: TCP
      port: 3001 # port to use within cluster to access this service and thus the container bound to this service
      targetPort: 3000 # the containerPort of the deployment
      nodePort: 32000 # This is the NodePort for external access
```

Now if you run `kubectl get service` you can find the service with port `3001:32000/TCP`. You can access the server from within the cluster using the clusterIP of the echo-server-service and the port(3001) of it. 

Now to access the echo server run `curl $(minikube ip):32000/?message=echo`


If you continue accessing the url you will see one of 3 seperated response. These are generated from the replicated pods. The traffics are routed to any of these 3 pods by kubernetes. So, load balancing is done automatically. 


After you are finished, delete the deployments and stop minikube
```
kubectl delete -f deployment.yaml
minikube stop
```