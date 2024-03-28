#!/usr/bin/env bash

source scripts/fail.sh
source .env

# Create a kind cluster
kind create cluster --name relegatio-cluster-eu --config kind/kind-config.yaml || fail "Cluster creation failed"

# Install the NGINX Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml || fail "Ingress Controller installation failed"

# Wait for the Ingress Controller to be ready
kubectl rollout status -n ingress-nginx deployment ingress-nginx-controller --timeout=120s || fail "Ingress Controller is not ready"

# Wait for the Ingress Controller to be running
kubectl wait -n ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s || fail "Ingress Controller is not running"

# Create a secret for the GitHub Container Registry
kubectl create secret docker-registry ghcr-secret --docker-server=ghcr.io --docker-username=kishieel --docker-password=$GITHUB_TOKEN || fail "Secret creation failed"

# Install the Helm chart
helm install \
  --set localUid="${LOCAL_UID}" \
  --set localGit="${LOCAL_GID}" \
  relegatio-chart k8s || fail "Helm chart installation failed"
