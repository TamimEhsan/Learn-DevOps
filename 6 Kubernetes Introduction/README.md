### Deployment
Now let's look at what are the contents of the `deployment` file

apiVersion
apps/v1: Specifies that this is an API version for managing applications, specifically for the deployment kind. 

kind \
Deployment: Indicates that the object being described is a Kubernetes Deployment, which is used to manage a set of identical pods. \
metadata
name: The name of the deployment, in this case, nginx. \
labels: Key-value pairs to categorize the deployment. Here, a label app: nginx is applied.
spec \
replicas: The number of pod replicas to run. Here, it specifies 1, meaning only one pod will be created. \
selector: Criteria to identify which pods belong to this deployment. It matches pods with the label app: nginx. \
matchLabels: Used to specify the label that the pods must have to be managed by this deployment.
template: Defines the pod template used to create new pods. \
metadata: Labels assigned to the pods created from this template. It includes app: nginx. \
spec: Specifies the container(s) to run in the pod. \
containers: A list of containers to run in each pod. \
name: The name of the container, which is nginx. \
image: The container image to use, specified as nginx:latest. This means it will pull the latest version of the NGINX image from the container registry. \
ports: List of ports to expose from the container. \
containerPort: Specifies the port number 80 that the NGINX container will listen on.

### Service
apiVersion \
v1: Specifies the API version for the Service object. \
kind \
Service: Indicates that the object being described is a Kubernetes Service. \
metadata \
name: The name of the service, in this case, nginx-service. \
spec \
type: Specifies the type of service, which is NodePort in this case. This means that the service will be exposed on a port on each node in the cluster. \
selector: Criteria to identify which pods the service applies to. It matches pods with the label app: nginx. \
ports: Defines the ports that the service will expose. \
port: The port that the service will expose. Here, it's 80. \
targetPort: The port on the pod that the traffic will be directed to. Here, it's 80, the same as the containerPort defined in the deployment. \
nodePort: your NGINX deployment will be accessible externally on port 30080 of each node in the cluster.

### Different type of ports
ClusterIP 
- Internal Only: No external access.
- Service Discovery: Use DNS within the cluster. 
- Example Use: Microservices architecture where services need to communicate with each other.
NodePort
- External Access: Allows accessing the service via <NodeIP>:<NodePort>.
- Static Port Range: Port number is between 30000-32767 by default.
- Example Use: Quick and simple external access for development or small-scale testing.


Use ClusterIP when you want to enable communication between different services within the cluster without exposing them to the outside world. This is useful for microservices architectures where services communicate internally. 

Use NodePort when you need to expose a service to external users. This is useful for development or testing purposes but is generally not recommended for production due to limited port range and lack of load balancing. For production, you might consider using a LoadBalancer service or an Ingress controller for more sophisticated routing and load balancin