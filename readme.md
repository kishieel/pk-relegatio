##### Services: 

- AuthMS
- PostsMS
- NotificationsMS
- GatewayMS
- MySQL
- Redis
- RabbitMQ
- CouchDB
- Mailtrap

##### Notes:

```shell
kind create cluster relegatio-cluster-eu --config kind.config
kind create cluster relegatio-cluster-us --config kind.config

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

source .env
echo $GITHUB_TOKEN | docker login ghcr.io -u kishieel --password-stdin
kubectl create secret docker-registry ghcr-secret --docker-server=ghcr.io --docker-username=kishieel --docker-password=$GITHUB_TOKEN

docker build --target development --tag ghcr.io/kishieel/relegatio-auth:1.0.0 --file dockerfiles/nestjs.Dockerfile microservices/auth
docker build --target development --tag ghcr.io/kishieel/relegatio-gateway:1.0.0 --file dockerfiles/nestjs.Dockerfile microservices/gateway
docker build --target development --tag ghcr.io/kishieel/relegatio-notifications:1.0.0 --file dockerfiles/nestjs.Dockerfile microservices/notifications
docker build --target development --tag ghcr.io/kishieel/relegatio-posts:1.0.0 --file dockerfiles/nestjs.Dockerfile microservices/posts

docker push ghcr.io/kishieel/relegatio-auth:1.0.0
docker push ghcr.io/kishieel/relegatio-gateway:1.0.0
docker push ghcr.io/kishieel/relegatio-notifications:1.0.0
docker push ghcr.io/kishieel/relegatio-posts:1.0.0

kind load docker-image ghcr.io/kishieel/relegatio-posts:1.0.0 --name relegatio-cluster-eu

helm install mysql charts/mysql-10.1.0.tgz
helm install redis charts/redis-13.0.0.tgz
helm install rabbitmq charts/rabbitmq-19.0.1.tgz

helm template relegatio . -f values.yaml | kubectl apply -f -
helm template relegatio . -f values.yaml | kubectl apply --dry-run -f -

helm package k8s
helm install k8s k8s-x.y.z.tgz

helm install relegatio-chart k8s
helm upgrade relegatio-chart k8s
```

##### References:

- https://helm.sh
- https://artifacthub.io
- https://docs.nestjs.com
- https://huseyinnurbaki.medium.com/nestjs-kubernetes-deployment-part-1-containerization-1e06b054b875
- https://saurabhkharkate05.medium.com/helm-chart-for-wordpress-php-application-and-mysql-database-on-k8s-c7c553cc610f
- 

##### Final report

1. Unauthorized access to GitHub container registry

    ```shell
    kubectl describe pod relegatio-posts-75f68f5669-92l2l
    ```
     
    ```
    Events:
    Type     Reason     Age                    From               Message
      ----     ------     ----                   ----               -------
    Normal   Scheduled  4m28s                  default-scheduler  Successfully assigned default/release-name-posts-75f68f5669-92l2l to relegatio-cluster-eu-control-plane
    Normal   Pulling    2m56s (x4 over 4m28s)  kubelet            Pulling image "ghcr.io/kishieel/relegatio-posts:1.0.0"
    Warning  Failed     2m56s (x4 over 4m26s)  kubelet            Failed to pull image "ghcr.io/kishieel/relegatio-posts:1.0.0": rpc error: code = Unknown desc = failed to pull and unpack image "ghcr.io/kishieel/relegatio-posts:1.0.0": failed to resolve reference "ghcr.io/kishieel/relegatio-posts:1.0.0": failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token?scope=repository%3Akishieel%2Frelegatio-posts%3Apull&service=ghcr.io: 401 Unauthorized
    Warning  Failed     2m56s (x4 over 4m26s)  kubelet            Error: ErrImagePull
    Warning  Failed     2m42s (x6 over 4m25s)  kubelet            Error: ImagePullBackOff
    Normal   BackOff    2m27s (x7 over 4m25s)  kubelet            Back-off pulling image "ghcr.io/kishieel/relegatio-posts:1.0.0"
    ```
 
    __Solution__
     
    ```shell
    kubectl create secret docker-registry ghcr-secret --docker-server=ghcr.io --docker-username=kishieel --docker-password=$GITHUB_TOKEN
    ```

2. Gateway cannot access subgraphs

    ```shell
    kubectl logs -f relegatio-gateway-7f8d7f7b5b-7z5zv
    ```

    ```shell
    [Nest] 47  - 03/27/2024, 1:42:52 PM     LOG [NestFactory] Starting Nest application...
    [Nest] 47  - 03/27/2024, 1:42:52 PM     LOG [InstanceLoader] AppModule dependencies initialized +23ms
    [Nest] 47  - 03/27/2024, 1:42:52 PM     LOG [InstanceLoader] GraphQLSchemaBuilderModule dependencies initialized +2ms
    [Nest] 47  - 03/27/2024, 1:42:52 PM     LOG [InstanceLoader] GraphQLModule dependencies initialized +1ms
    Gateway successfully initialized (but not yet loaded)
    Loading gateway...
    Error: Couldn't load service definitions for "posts" at http://localhost:3002/graphql: request to http://localhost:3002/graphql failed, reason: connect ECONNREFUSED ::1:3002
        at /app/node_modules/@apollo/gateway/src/supergraphManagers/IntrospectAndCompose/loadServicesFromRemoteEndpoint.ts:77:15
        at processTicksAndRejections (node:internal/process/task_queues:95:5)
        at async Promise.all (index 0)
        at loadServicesFromRemoteEndpoint (/app/node_modules/@apollo/gateway/src/supergraphManagers/IntrospectAndCompose/loadServicesFromRemoteEndpoint.ts:81:30)
        at IntrospectAndCompose.updateSupergraphSdl (/app/node_modules/@apollo/gateway/src/supergraphManagers/IntrospectAndCompose/index.ts:92:20)
        at IntrospectAndCompose.initialize (/app/node_modules/@apollo/gateway/src/supergraphManagers/IntrospectAndCompose/index.ts:62:30)
        at ApolloGateway.initializeSupergraphManager (/app/node_modules/@apollo/gateway/src/index.ts:401:22)
        at ApolloGateway.load (/app/node_modules/@apollo/gateway/src/index.ts:311:7)
        at SchemaManager.start (/app/node_modules/@apollo/server/src/utils/schemaManager.ts:108:22)
        at ApolloServer._start (/app/node_modules/@apollo/server/src/ApolloServer.ts:403:24)
    ```

    __Solution__

    Correct naming for services' hosts in Gateway configuration.

    ```typescript
    subgraphs: [{ name: 'posts', url: 'http://localhost:3002/graphql' }],
    // replaced with
    subgraphs: [{ name: 'posts', url: 'http://posts:3000/graphql' }],
    ```

3. Gateway requests blocked by Cross-Site Request Forgery (CSRF) protection.

    Changes in service code. Added `csrfPrevention: false,` in the `GraphQLModule` configuration.

4. Sometimes gateway starts faster than services and fails to connect.

    Added liveness and readiness probes to restart the gateway after initial failure.

5. Mounting volumes from host to containers for live reloading during development.

    Because local cluster is created with `kind`, the volume from host cannot be mounted directly to the container. 
    Instead `kind` itself create container where the cluster lives. So in this sense the host for cluster is not the same as the host for the local machine. 
    The host for cluster is the container created by `kind`. 
    So the volume from local machine have to be mounted to the `kind` container first.
