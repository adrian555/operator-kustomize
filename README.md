This repo demonstrates the ability to pass config from operator to application and deploy the operator in kustomize way so that the overlays can be applied for different cluster environments.

* build the hello-world image

```command line
pushd hello-image
docker build . -t adrian555/hello-world:v0.0.1
docker push adrian555/hello-world:v0.0.1
popd
```

* build the hello-world operator, which creates the `hello-world-app` deployment and `hello-world` service

```command line
pushd hello-world
operator-sdk build adrian555/hello-op:v0.0.1
docker push adrian555/hello-op:v0.0.1
popd
```

* deploy the operator

```command line
pushd hello-kustomize/<dir>
kustomize build > y.yaml
kubectl apply -f y.yaml
popd
```

Note: replace `<dir>` with `base`, `overlays/production` or `overlays/staging` to generate the specific deployment for your cluster environment.

* install the application by apply a CustomResource to the operator

```command line
pushd hello-world/deploy/crds
kubectl apply -f ibm_v1alpha1_hello_cr.yaml
popd
```

* wait until the `hello-world` service is up and running

```command line
kubectl get svc
## NAME                  TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)        AGE
## hello-world           LoadBalancer   172.21.204.30   169.62.90.107   80:31308/TCP   13m
```

* ping the service

```command line
curl http://169.62.90.107:31308
## Hello staging!
```

The service returns the specified config for each kustomize base or overlay setting.