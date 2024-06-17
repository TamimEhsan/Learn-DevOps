## Using configMap
We can set environment variables from config map. We need to create a configMap object and referene the configMap item from env of the container template.

But changing the configMap will not update the environment variables. We need to restart the pod again. In order to update the values we need to access them from files that are mounted from the configMaps using volume mount.
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-server-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: echo-server
  template:
    metadata:
      labels:
        app: echo-server
    spec:
      containers:
      - name: echo-server-container
        image: echo-server:latest 
        imagePullPolicy: Never
        ports:
        - containerPort: 3000
        volumeMounts:
          - name: foo
            mountPath: "/etc/foo"
            readOnly: true
      volumes:
        - name: foo
          configMap:
            name: echo-server-config
```
To access the files inside the pod we need to connect to the pod
```bash
kubectl get pods # get the pod name from it
kubectl exec -it <pod_name> -- /bin/sh
```
Here the config map is saved as individual file in `/etc/foo/` with key as the file name ie 
```bash
cat /etc/foo/customMessage # outputs: Hello from ConfigMap!
cat /etc/foo/secondMessage # outputs: Hello from second Config Message! 
```
