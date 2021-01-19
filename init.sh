#!/usr/bin/env bash
set -e

PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH
export PATH=$PATH

_npmpath=$(command -v npm || true)
if [ -z "$_npmpath" ]; then
  echo -n 1
  exit
fi

echo -n 0

npm i
