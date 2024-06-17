## Autoscaling pods

We will need metric server for scaling. At first check if metric server is present in your minikube
```
kubectl top nodes
```
If not present then use helm to install it
```
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
helm repo update
helm install metrics-server --namespace kube-system --version 3.11.0 metrics-server/metrics-server --set "args[0]=--kubelet-insecure-tls"
```

In order for autoscaler to work, we must include resource requests, limits are optional. Apply the deployment. You can change the service type to NodePort or use kube port forward 

```
kubectl apply -f deployment.yaml
kubectl port-forward <pod_name> 8080:8080
kubectl get pods
```
We will see that there is one pod. And if we want to see the metrics run
```
kubectl get hpa
```
We will see the resource against a deployment. If we want to put heavy load on the pods run

```
curl localhost:8080/api/cpu?index=50
```
We will see gradual increase in resource usage, and see gradual spawning of pods. It might create 7 pods (500%/80%) = 6.25 = 7. If we cancel the curl then the resource usage will gradually go down. The pods will be terminated after a minute or two.