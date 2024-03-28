#!/usr/bin/env bash

source scripts/fail.sh
source .env

# Configure npm registry for Yarn
yarn config set "//npm.pkg.github.com/:_authToken" "$GITHUB_TOKEN" || fail "Failed to configure npm registry for Yarn"

# Configure npm registry for NPM
npm config set //npm.pkg.github.com/:_authToken "$GITHUB_TOKEN" || fail "Failed to configure npm registry for NPM"
