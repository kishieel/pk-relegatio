#!/usr/bin/env bash

source scripts/fail.sh

kind delete cluster --name relegatio-cluster-eu || fail "Cluster deletion failed"
