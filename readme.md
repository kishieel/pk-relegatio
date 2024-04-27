##### Services: 

- AuthMS
- PostsMS
- NotificationsMS
- GatewayMS
- MySQL
- Redis
- RabbitMQ
- CouchDB
- Mailpit

##### Notes:

```shell
kind create cluster relegatio-cluster-eu --config kind.config
kind create cluster relegatio-cluster-us --config kind.config

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

source .env
echo $GITHUB_TOKEN | docker login ghcr.io -u kishieel --password-stdin
kubectl create secret docker-registry ghcr-secret --docker-server=ghcr.io --docker-username=kishieel --docker-password=$GITHUB_TOKEN

docker build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN --target development --tag ghcr.io/kishieel/relegatio-auth:1.0.0 --file dockerfiles/nestjs.Dockerfile microservices/auth
docker build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN --target development --tag ghcr.io/kishieel/relegatio-gateway:1.0.0 --file dockerfiles/nestjs.Dockerfile microservices/gateway
docker build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN --target development --tag ghcr.io/kishieel/relegatio-notifications:1.0.0 --file dockerfiles/nestjs.Dockerfile microservices/notifications
docker build --build-arg GITHUB_TOKEN=$GITHUB_TOKEN --target development --tag ghcr.io/kishieel/relegatio-posts:1.0.0 --file dockerfiles/nestjs.Dockerfile microservices/posts

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

kubectl run -it load-generator --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://gateway; done"
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

6. CouchDB Fauxton UI is randomly not accessible. After successful login the unauthorized error is thrown.

    This was caused because Fauxton UI is using cookies for authentication. When Kubernetes
    load balanced the requests, the cookies were not shared between the pods. Sticky sessions
    for the Ingress controller were enabled to solve this issue.

    ```yaml
      annotations:
        nginx.ingress.kubernetes.io/affinity: "cookie"
        nginx.ingress.kubernetes.io/session-cookie-name: "couchdb-session"
        nginx.ingress.kubernetes.io/session-cookie-hash: "sha1"
    ```
7. Size of the Docker images is too big and it is slowing down the deployment and development process.

    The size of the Docker images can be reduced by using multi-stage builds and removing unnecessary 
    files from the final image. Also, the base image can be changed to a smaller one, e.g. Alpine Linux.

    Before optimization:
    ```shell
    ghcr.io/kishieel/relegatio-auth            1.0.0-dev                  c3eeb68cefc7   3 weeks ago      1.59GB
    ghcr.io/kishieel/relegatio-notifications   1.0.1-dev                  d436175d743d   7 days ago       1.72GB
    ghcr.io/kishieel/relegatio-posts           1.0.2-dev                  b723c6120b1d   2 weeks ago      1.66GB
    ghcr.io/kishieel/relegatio-gateway         1.0.2-dev                  1ae518a100f4   3 weeks ago      1.68GB
    ghcr.io/kishieel/relegatio-frontend        1.0.0-dev                  cb902d87b532   6 hours ago      3.26GB
    ```
   
    After optimization:
    ```shell
    ghcr.io/kishieel/relegatio-notifications   1.0.2-dev                  07c9d95a516b   2 minutes ago    605MB
    ghcr.io/kishieel/relegatio-auth            1.0.2-dev                  56b138923d54   6 minutes ago    790MB
    ghcr.io/kishieel/relegatio-posts           1.0.3-dev                  df3c9e520949   4 seconds ago    578MB
    ghcr.io/kishieel/relegatio-gateway         1.0.3-dev                  486fc86521cf   24 minutes ago   544MB
    ghcr.io/kishieel/relegatio-frontend        1.0.1-dev                  496658b482de   56 seconds ago   2.3GB
    ```

    The size of some images are still big, but these are the development images. The production images are smaller.

8. The cluster creation is ending with an error. [todo]

    ```shell
    Error: INSTALLATION FAILED: failed post-install: 1 error occurred:
        * job failed: BackoffLimitExceeded


    Helm chart installation failed
    ```
   
    The only post-install job is the one need for CouchDB cluster setup. The solution was to add `--wait` flag 
    to the `helm install` command.

9. Horizontal Pod Autoscaler (HPA) is scaling up too fast in development environment.

    Because Node.js applications started in watch mode are consuming a lot of resources during startup, 
    the HPA is scaling up the pods only because of the high CPU and memory usage during the startup.

    In this case stabilization window nor cooldown period does not seem to help. To fix this issue 
    I have removed the resources limit for the pods started in development mode.

    ```gotemplate
    resources:
        {{- if not $serviceConfig.development.enabled }}
        limits:
            cpu: 200m
            memory: 250Mi
        {{- end }}
        requests:
            cpu: 100m
            memory: 100Mi
    ```

10. Keycloak Config CLI is unable to start and failing with the error '0/1 nodes are available: 1 Insufficient cpu. preemption: 0/1 nodes are available: 1 No preemption victims found for incoming pod'.

    This was caused because of original configuration of the Node.js applications. 
    They requested too many resources so the Keycloak Config CLI was unable to start. The solution was to reduce the resources requested by the Node.js applications.

    Before:

    ```yaml
    resources:
        requests:
            cpu: 1000m
            memory: 1Gi
    ```
    
    After:

    ```yaml    
    resources:
        requests:
            cpu: 100m
            memory: 100Mi
    ```
