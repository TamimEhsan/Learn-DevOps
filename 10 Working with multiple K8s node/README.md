## Create multi node cluster in minikube
```bash
minikube start --nodes 3
```
Now when you apply the deployment and check the status of the pods you will see that the pods are running on different nodes
```bash
kubectl apply -f deployment.yaml
kubectl get pods -o wide
```

But if we want the pods to run on certain kind of nodes we need some new concepts, namely node selector, node affinity, pod affinity, taints and tolerations.

## Theories

You can add the nodeSelector field to your Pod specification and specify the node labels you want the target node to have. Kubernetes only schedules the Pod onto nodes that have each of the labels you specify.

Node affinity functions like the nodeSelector field but is more expressive and allows you to specify soft rules. Inter-pod affinity/anti-affinity allows you to constrain Pods against labels on other Pods.

requiredDuringSchedulingIgnoredDuringExecution: The scheduler can't schedule the Pod unless the rule is met. This functions like nodeSelector, but with a more expressive syntax.
preferredDuringSchedulingIgnoredDuringExecution: The scheduler tries to find a node that meets the rule. If a matching node is not available, the scheduler still schedules the Pod.

If you specify both nodeSelector and nodeAffinity, both must be satisfied for the Pod to be scheduled onto a node.

If you specify multiple terms in nodeSelectorTerms associated with nodeAffinity types, then the Pod can be scheduled onto a node if one of the specified terms can be satisfied (terms are ORed).

If you specify multiple expressions in a single matchExpressions field associated with a term in nodeSelectorTerms, then the Pod can be scheduled onto a node only if all the expressions are satisfied (expressions are ANDed).

Taints are the opposite -- they allow a node to repel a set of pods. Tolerations are applied to pods. Tolerations allow the scheduler to schedule pods with matching taints. Tolerations allow scheduling but don't guarantee scheduling:

## Applications


At first label the 3rd node with label of diskType to ssd. Then use node affinity to attract all pods to the 3rd node.
```bash
kubectl label nodes minikube-m03 disktype=ssd
kubectl apply -f deployment2.yaml
```
If we change the values to something else then the pods will be in pending state and not be created. 
So we can use preference. If no node with the given affinity is found then it schedule the pods normally.

Suppose, have 3 nodes. There are two apps each with 2 replicas. App a have dependecny on app b, like kafka and zookeeper. So we would want each instance of kafka to be scheduled on different nodes and want each instance of zookeeper to be scheduled with kafka. So, we would define pod anti affinity of kafka with itself, so they will be scheduled on different nodes. Then do the same for zookeeper and add a pod affinity rule for kafka.