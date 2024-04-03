#!/usr/bin/env bash

source scripts/fail.sh
source .env

# @todo: all images are pulled and loaded synchronously, which is not so efficient
# @todo: consider parallelling this process with background jobs and wait for all of them to finish
# @todo: it should be put under consideration how this will impact on printing the logs

# Pull the images from the Helm chart
AUTH_IMAGE=$(helm show values k8s | yq -r .microservices.auth.image)
GATEWAY_IMAGE=$(helm show values k8s | yq -r .microservices.gateway.image)
NOTIFICATIONS_IMAGE=$(helm show values k8s | yq -r .microservices.notifications.image)
POSTS_IMAGE=$(helm show values k8s | yq -r .microservices.posts.image)
MYSQL_IMAGE=$(helm show values bitnami/mysql | yq -r '.image.registry + "/" + .image.repository + ":" + .image.tag')
REDIS_IMAGE=$(helm show values bitnami/redis | yq -r '.image.registry + "/" + .image.repository + ":" + .image.tag')
RABBIT_IMAGE=$(helm show values bitnami/rabbitmq | yq -r '.image.registry + "/" + .image.repository + ":" + .image.tag')
MAILPIT_IMAGE=$(helm show values jouve/mailpit | yq -r '.image.registry + "/" + .image.repository + ":" + .image.tag')
COUCHDB_IMAGE=$(helm show values couchdb/couchdb | yq -r '.image.repository + ":" + .image.tag')
COUCHDB_CURL_IMAGE=$(helm show values couchdb/couchdb | yq -r '.autoSetup.image.repository + ":" + .autoSetup.image.tag')
COUCHDB_INIT_IMAGE=$(helm show values couchdb/couchdb | yq -r '.initImage.repository + ":" + .initImage.tag')
COUCHDB_SEARCH_IMAGE=$(helm show values couchdb/couchdb | yq -r '.searchImage.repository + ":" + .searchImage.tag')

# Pull the images to the local Docker daemon
docker pull "$AUTH_IMAGE" || fail "Failed to pull the Auth image"
docker pull "$GATEWAY_IMAGE" || fail "Failed to pull the Gateway image"
docker pull "$NOTIFICATIONS_IMAGE" || fail "Failed to pull the Notifications image"
docker pull "$POSTS_IMAGE" || fail "Failed to pull the Posts image"
docker pull "$MYSQL_IMAGE" || fail "Failed to pull the MySQL image"
docker pull "$REDIS_IMAGE" || fail "Failed to pull the Redis image"
docker pull "$RABBIT_IMAGE" || fail "Failed to pull the RabbitMQ image"
docker pull "$MAILPIT_IMAGE" || fail "Failed to pull the Mailpit image"
docker pull "$COUCHDB_IMAGE" || fail "Failed to pull the CouchDB image"
docker pull "$COUCHDB_CURL_IMAGE" || fail "Failed to pull the CouchDB Curl image"
docker pull "$COUCHDB_INIT_IMAGE" || fail "Failed to pull the CouchDB Init image"
docker pull "$COUCHDB_SEARCH_IMAGE" || fail "Failed to pull the CouchDB Search image"

# Load the images into the kind cluster
kind load docker-image --name relegatio-cluster-eu "$AUTH_IMAGE" || fail "Failed to load the Auth image"
kind load docker-image --name relegatio-cluster-eu "$GATEWAY_IMAGE" || fail "Failed to load the Gateway image"
kind load docker-image --name relegatio-cluster-eu "$NOTIFICATIONS_IMAGE" || fail "Failed to load the Notifications image"
kind load docker-image --name relegatio-cluster-eu "$POSTS_IMAGE" || fail "Failed to load the Posts image"
kind load docker-image --name relegatio-cluster-eu "$MYSQL_IMAGE" || fail "Failed to load the MySQL image"
kind load docker-image --name relegatio-cluster-eu "$REDIS_IMAGE" || fail "Failed to load the Redis image"
kind load docker-image --name relegatio-cluster-eu "$RABBIT_IMAGE" || fail "Failed to load the RabbitMQ image"
kind load docker-image --name relegatio-cluster-eu "$MAILPIT_IMAGE" || fail "Failed to load the Mailpit image"
kind load docker-image --name relegatio-cluster-eu "$COUCHDB_IMAGE" || fail "Failed to load the CouchDB image"
kind load docker-image --name relegatio-cluster-eu "$COUCHDB_CURL_IMAGE" || fail "Failed to load the CouchDB Curl image"
kind load docker-image --name relegatio-cluster-eu "$COUCHDB_INIT_IMAGE" || fail "Failed to load the CouchDB Init image"
kind load docker-image --name relegatio-cluster-eu "$COUCHDB_SEARCH_IMAGE" || fail "Failed to load the CouchDB Search image"
