#!/usr/bin/env bash

source scripts/fail.sh
source .env

# @todo: all images are pulled and loaded synchronously, which is not so efficient
# @todo: consider parallelling this process with background jobs and wait for all of them to finish
# @todo: it should be put under consideration how this will impact on printing the logs

# One command to fetch all images
#helm template . | yq '..|.image? | select(.)' | sort -u

# Pull the images from the Helm chart
AUTH_IMAGE=$(helm show values k8s | yq -r .microservices.auth.image)
FOLLOWERS_IMAGE=$(helm show values k8s | yq -r .microservices.followers.image)
GATEWAY_IMAGE=$(helm show values k8s | yq -r .microservices.gateway.image)
NOTIFICATIONS_IMAGE=$(helm show values k8s | yq -r .microservices.notifications.image)
POSTS_IMAGE=$(helm show values k8s | yq -r .microservices.posts.image)
FRONTEND_IMAGE=$(helm show values k8s | yq -r .microservices.frontend.image)
MYSQL_IMAGE=$(helm show values bitnami/mysql | yq -r '.image.registry + "/" + .image.repository + ":" + .image.tag')
REDIS_IMAGE=$(helm show values bitnami/redis | yq -r '.image.registry + "/" + .image.repository + ":" + .image.tag')
RABBIT_IMAGE=$(helm show values bitnami/rabbitmq | yq -r '.image.registry + "/" + .image.repository + ":" + .image.tag')
MAILPIT_IMAGE=$(helm show values jouve/mailpit | yq -r '.image.registry + "/" + .image.repository + ":" + .image.tag')
COUCHDB_IMAGE=$(helm show values couchdb/couchdb | yq -r '.image.repository + ":" + .image.tag')
COUCHDB_CURL_IMAGE=$(helm show values couchdb/couchdb | yq -r '.autoSetup.image.repository + ":" + .autoSetup.image.tag')
COUCHDB_INIT_IMAGE=$(helm show values couchdb/couchdb | yq -r '.initImage.repository + ":" + .initImage.tag')
COUCHDB_SEARCH_IMAGE=$(helm show values couchdb/couchdb | yq -r '.searchImage.repository + ":" + .searchImage.tag')
KEYCLOAK_IMAGE=$(helm show values bitnami/keycloak | yq -r '.image.registry + "/" + .image.repository + ":" + .image.tag')

# Pull the images to the local Docker daemon
docker pull "$AUTH_IMAGE" || fail "Failed to pull the $AUTH_IMAGE"
docker pull "$FOLLOWERS_IMAGE" || fail "Failed to pull the $FOLLOWERS_IMAGE"
docker pull "$GATEWAY_IMAGE" || fail "Failed to pull the $GATEWAY_IMAGE"
docker pull "$NOTIFICATIONS_IMAGE" || fail "Failed to pull the $NOTIFICATIONS_IMAGE"
docker pull "$POSTS_IMAGE" || fail "Failed to pull the $POSTS_IMAGE"
docker pull "$FRONTEND_IMAGE" || fail "Failed to pull the $FRONTEND_IMAGE"
docker pull "$MYSQL_IMAGE" || fail "Failed to pull the $MYSQL_IMAGE"
docker pull "$REDIS_IMAGE" || fail "Failed to pull the $REDIS_IMAGE"
docker pull "$RABBIT_IMAGE" || fail "Failed to pull the $RABBIT_IMAGE"
docker pull "$MAILPIT_IMAGE" || fail "Failed to pull the $MAILPIT_IMAGE"
docker pull "$COUCHDB_IMAGE" || fail "Failed to pull the $COUCHDB_IMAGE"
docker pull "$COUCHDB_CURL_IMAGE" || fail "Failed to pull the $COUCHDB_CURL_IMAGE"
docker pull "$COUCHDB_INIT_IMAGE" || fail "Failed to pull the $COUCHDB_INIT_IMAGE"
docker pull "$COUCHDB_SEARCH_IMAGE" || fail "Failed to pull the $COUCHDB_SEARCH_IMAGE"
docker pull "$KEYCLOAK_IMAGE" || fail "Failed to pull the $KEYCLOAK_IMAGE"

# Load the images into the kind cluster
kind load docker-image --name relegatio-cluster-eu "$AUTH_IMAGE" || fail "Failed to load the $AUTH_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$FOLLOWERS_IMAGE" || fail "Failed to load the $FOLLOWERS_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$GATEWAY_IMAGE" || fail "Failed to load the $GATEWAY_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$NOTIFICATIONS_IMAGE" || fail "Failed to load the $NOTIFICATIONS_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$POSTS_IMAGE" || fail "Failed to load the $POSTS_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$FRONTEND_IMAGE" || fail "Failed to load the $FRONTEND_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$MYSQL_IMAGE" || fail "Failed to load the $MYSQL_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$REDIS_IMAGE" || fail "Failed to load the $REDIS_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$RABBIT_IMAGE" || fail "Failed to load the $RABBIT_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$MAILPIT_IMAGE" || fail "Failed to load the $MAILPIT_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$COUCHDB_IMAGE" || fail "Failed to load the $COUCHDB_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$COUCHDB_CURL_IMAGE" || fail "Failed to load the $COUCHDB_CURL_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$COUCHDB_INIT_IMAGE" || fail "Failed to load the $COUCHDB_INIT_IMAGE"
kind load docker-image --name relegatio-cluster-eu "$COUCHDB_SEARCH_IMAGE" || fail "Failed to load the $COUCHDB_SEARCH_IMAGE"
kind load docker-iamge --name relegatio-cluster-eu "$KEYCLOAK_IMAGE" || fail "Failed to load the $KEYCLOAK_IMAGE"
