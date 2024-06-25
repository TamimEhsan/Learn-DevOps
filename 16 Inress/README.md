## Ingress
### Local
At first start the minikube ip and add the minikube ingress addon
```
minikube addons enable ingress
```
Verify that the NGINX Ingress controller is running
```
kubectl get pods -n ingress-nginx
```
Create a Deployment using the following command
```
kubectl create deployment web --image=gcr.io/google-samples/hello-app:1.0
```
Expose the Deployment:
```
kubectl expose deployment web --type=NodePort --port=8080
```
To access it run
```
curl http://$(minikube ip):31637 
```
Then apply the ingress
```
kubectl apply -f deployment-local.yaml
```
Finally we can access it from
```
curl --resolve "hello-world.example.com:80:$( minikube ip )" -i http://hello-world.example.com
```
### Azure

```
az group create --name=tamim-resource-group --location=eastus
```
```
az aks create --resource-group=tamim-resource-group --name=tamim-example-aks1  --dns-name-prefix=tamim-resource-group --generate-ssh-keys
```
```
az aks approuting enable --resource-group tamim-resource-group --name tamim-example-aks1
```
Apply the deployments
```
kubectl apply -f deployment-azure.yaml
```
Verify that the ingress is running
```
kubectl get ingress
```
Get the exposed ip from the output and use that to call the services. Beforehand, you need to resolve the name. As we don't own the address name so we can't use it on any dns server. So need to resolve it from local.
```
curl --resolve "app.tamim.com:80:<ip>" -i http://app.tamim.com
curl --resolve "app.sabit.com:80:<ip>" -i http://app.tamim.com
```
Different response can be found for the two requests.  
We can also access them from browser. For that we need to resolve them in `/etc/hosts`
```
sudo nano /etc/hosts
```
and add the following entries
```
<ip> app.tamim.com
<ip> app.sabit.com
```
Now we can access the address from the browser!

## Cleaning
Don't forget to destroy the resouces before you go!