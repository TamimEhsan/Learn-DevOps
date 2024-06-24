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

## ClusterIP vs NodePort vs LoadBalancer vs Ingress
### ClusterIP
A ClusterIP service is the default Kubernetes service. It gives you a service inside your cluster that other apps inside your cluster can access. There is no external access.  
If you want to access a service using clusterIP you can use kubernetes proxy.
### NodePort
A NodePort service is the most primitive way to get external traffic directly to your service. NodePort, as the name implies, opens a specific port on all the Nodes (the VMs), and any traffic that is sent to this port is forwarded to the service.
- You can only have one service per port
- You can only use ports 30000–32767
- If your Node/VM IP address change, you need to deal with that
### LoadBalancer
A LoadBalancer service is the standard way to expose a service to the internet. On GKE, this will spin up a Network Load Balancer that will give you a single IP address that will forward all traffic to your service.
- There is no filtering, no routing, etc. This means you can send almost any kind of traffic to it, like HTTP, TCP, UDP, Websockets, gRPC, or whatever.
- The big downside is that each service you expose with a LoadBalancer will get its own IP address, and you have to pay for a LoadBalancer per exposed service, which can get expensive!
### Ingress
Ingress is actually NOT a type of service. Instead, it sits in front of multiple services and act as a “smart router” or entrypoint into your cluster.  
Ingress is the most useful if you want to expose multiple services under the same IP address, and these services all use the same L7 protocol (typically HTTP). There are also plugins for Ingress controllers, like the cert-manager, that can automatically provision SSL certificates for your services. You can get a lot of features out of the box (like SSL, Auth, Routing, etc)  
This will let you do both path based and subdomain based routing to backend services. For example, you can send everything on foo.yourdomain.com to the foo service, and everything under the yourdomain.com/bar/ path to the bar service.