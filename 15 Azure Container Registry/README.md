Create a azure resource group and a azure container registry
```
az group create --name=wingtiptoys-kubernetes --location=eastus
az acr create --resource-group wingtiptoys-kubernetes --location eastus --name tamimregistry53 --sku Basic

```
Now create a kubernetes cluster and attach the container registry to it
```
az aks create --resource-group=wingtiptoys-kubernetes --name=tamim-akscluster --attach-acr tamimregistry53 --dns-name-prefix=wingtiptoys-kubernetes --generate-ssh-keys
```

Next step is to login to the registry and push the image after tagging the docker image echo-server with registry name
```
az acr login --name tamimregistry53
docker build -t echo-server ./server
docker tag echo-server tamimregistry53.azurecr.io/echo-server
docker push tamimregistry53.azurecr.io/echo-server
```

Now add az aks to the local context
```
az aks get-credentials --resource-group wingtiptoys-kubernetes --name tamim-akscluster
```

Finally we apply the deployment file by
```
kubectl apply -f deployment.yaml
```
The deployment file is changed a bit to work with acr. We need to find the external ip of the service from the loadbalancer using
```
kubectl get services
```
You will find response like
```
NAME                  TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)          AGE
echo-server-service   LoadBalancer   10.0.247.214   57.152.23.102   3001:31580/TCP   2m15s
kubernetes            ClusterIP      10.0.0.1       <none>          443/TCP          14m
```

So, at last we can go to browser and go to `http://57.152.23.102:3001/?message=echo` to find the deployed instance in kubernetes

