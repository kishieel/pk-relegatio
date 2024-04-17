#!/usr/bin/env bash

source scripts/fail.sh
source .env

helm upgrade \
  --set localUid="${LOCAL_UID}" \
  --set localGit="${LOCAL_GID}" \
  --wait \
  relegatio-chart k8s || fail "Helm chart upgrade failed"
