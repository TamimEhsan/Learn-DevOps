## Install azure powershell
install az powershell from [here](https://learn.microsoft.com/en-us/powershell/azure/install-azps-windows?view=azps-12.0.0&tabs=powershell&pivots=windows-msi)
Then run below code to login to azure
```
Connect-AzAccount -TenantId <tenant_id> -DeviceCode
```
Then Configure kubectl to connect to Kubernetes cluster
```
Import-AzAksCredential -ResourceGroupName tamim-aks -Name myAKSCluster
or
az aks get-credentials --resource-group tamim-aks --name myAKSCluster
```
## Creating docker images
```
git clone https://github.com/Azure-Samples/aks-store-demo.git
cd aks-store-demo
docker compose -f docker-compose-quickstart.yml up -d
```
The build will take time. After finished go to `http://localhost:8080` to verify the build