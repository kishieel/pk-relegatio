#!/usr/bin/env bash

source scripts/fail.sh

# Generate self-signed certificates
mkcert -cert-file nginx/cert.pem -key-file nginx/key.pem relegatio.localhost \*.relegatio.localhost || fail "Certificate generation failed"

# Create a secret for the certificates
kubectl create secret tls relegatio-tls --cert=nginx/cert.pem --key=nginx/key.pem || fail "Secret creation failed"
