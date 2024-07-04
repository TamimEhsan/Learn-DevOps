## Init Containers

WE might want to do some initialization before initializing an app. eg. we might want to configure some environmental variables or mount a volume path or wait untill another service is created. We can use a init container for this. The containers inside a pod starts creating after all the init containers inside it are done running. If a init container crashes then the whole pod crashes. If a pod restarts the init container will run again.


### BusyBox
In the configuration file, you can see that the Pod has a Volume that the init container and the application container share.

The init container mounts the shared Volume at `/work-dir`, and the application container mounts the shared Volume at `/usr/share/nginx/html`. The init container runs the following command and then terminates:
```bash
wget -O /work-dir/index.html http://info.cern.ch
```
Notice that the init container writes the `index.html` file in the root directory of the nginx server.

Create the Pod:
```bash
kubectl apply -f https://k8s.io/examples/pods/init-containers.yaml
```
Verify that the nginx container is running:
```bash
kubectl get pod init-demo
```
The output at first will show the following implying that the init container is running and later will show that the nginx container is running:

```bash
NAME            READY   STATUS     RESTARTS   AGE
pod/init-demo   0/1     Init:0/1   0          16s
```
Find the minikube ip by `minikube ip` and open the url in any browser `<minikube_ip:30007` or run in shell 
```bash
curl $(minikube ip):30007
```

### Initializing a database
We can use this concept to create a database. It is not using init containers but the concept is the same. 

Say we have a kubernetes cluster. The database for the system is a azure postgresql server which is outside the cluster. For security reasons the databse has no access from outside the cluster. For database migration we have to manually open port from azure portal then apply the required changes and again close the access. We can also do the same for initializing the database. But it's not ideal. Why? the prod databse might not be initialized again and again, but the dev or stage database might need to start again again. So what's the solution?

We will use init containers for this purpose. For now we will use a database container to mimic the use case.

## In Minikube
At first start a minikube cluster.

Apply the database deployment. In reality the database was already up and running in cloud.
```
kubectl apply -f database-deployment.yaml
```

Then create a configMap from the init ddl
```bash
kubectl create configmap init-ddl-config --from-file=init.ddl
```

Wait until database pod is created, then apply the init ddl job
```bash
kubectl apply -f init-deployment.yaml
```
Optionally you can delete the configMap and the job cause we don't need them no more
```bash
kubectl delete configMap init-ddl-config
kubectl delete -f init-deployment.yaml
```
You can check the update is performed by 
```bash
kubectl exec -it postgres-deployment-6fdf6ddd64-445j4 '/bin/sh'
```
Then go inside psql
```bash
psql -U myuser -d mydatabase
```
Then check if there is data inside the schema
```SQL
SELECT * FROM example;
```
You should two entries inside the table.

## Cleaning Up
Before exiting, don't forget to delete all deployments and stop the cluster