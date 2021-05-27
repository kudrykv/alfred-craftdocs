#!/usr/bin/env bash
set -e

# shellcheck disable=SC2153
if [ -n "${PATHS}" ]; then
  PATH=${PATHS}:$PATH
fi

export PATH=$PATH

_npmpath=$(command -v npm || true)
if [ -z "$_npmpath" ]; then
  echo -n 1
  exit
fi

echo -n 0

npm i
