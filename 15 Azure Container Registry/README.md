## Provisioning Infrastructure
## Using shell
reate a azure resource group and a azure container registry
```
az group create --name=tamim-resource-group --location=eastus
```
```
az acr create --resource-group tamim-resource-group --location eastus --name tamimcontainerregistry52 --sku Basic
```
Now create a kubernetes cluster and attach the container registry to it
```
az aks create --resource-group=tamim-resource-group --name=tamim-example-aks1 --attach-acr tamimcontainerregistry52 --dns-name-prefix=tamim-resource-group --generate-ssh-keys
```

### Using Terraform

See the `main.tf` file and it's contents. It does exactly the same as above.
```
cd Terraform
terraform init
terraform apply
```
The infra will be created within some time. After the process is complete you can check the azure portal too.

## Deployment

Next step is to login to the registry and push the image after tagging the docker image echo-server with registry name
```
az acr login --name tamimcontainerregistry52
docker build -t echo-server ./server
docker tag echo-server tamimcontainerregistry52.azurecr.io/echo-server
docker push tamimcontainerregistry52.azurecr.io/echo-server
```

Now add az aks to the local context
```
az aks get-credentials --resource-group tamim-resource-group --name tamim-example-aks1
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

## Cleaning up
Don't forget to destryoy the resources before leaving. You can either delete the resources individually or delete the whole resource group from azure portal. Alternatively you can use terraform to delete the resources that you created
```
terraform apply -destroy
```
