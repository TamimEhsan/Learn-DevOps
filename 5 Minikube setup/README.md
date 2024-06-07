## Minikube setup

### Installing minikube
Install minikube from [here](https://minikube.sigs.k8s.io/docs/start/) . If you are using windows you might want to use hyperv. 

Set `MINIKUBE_HOME` to some prefered places. It takes much space, so you dont want to make some already used up memory to make it worse.  
Install `kubectl` on your device from [here](https://kubernetes.io/docs/tasks/tools/).
```
minikube start --driver=hyperv
```
Make sure the cluster is running by 
```
minikube status
```

 Then check the status of the cluster from kubectl by
 ```
 kubectl get nodes
 ```
 You should see minikube in the list.

### Running a Nginx server

Run command 
```
kubectl create deployment nginx --image=nginx
```
You can check the status of the deployment by
```
kubectl get deployments
```
And the status of the pods created by the deployment using
```
kubectl get pods
```
At first you may see the status as container creating but after some time it will be running.

### Creating a deployment with service
To access a deployment from outside we need services. Copy the `deployment.yaml` and `service.yaml` and run
```
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```
Then run 
```
kubectl get services
```
You will see a service of type nodePort. In that find the mapped port. For me it was `80:30225/TCP`. Then find the host ip by
```
minikube ip
```
Then finally run `<minikub_ip>:30225` in your browser to find nginx home