#!/usr/bin/env bash

set -e

VERSION=$(grep -A 1 version info.plist | tail -n 1 | perl -pe 's/.*(\d+\.\d+\.\d+).*/v\1/')

if [ -z "${VERSION}" ]; then
  echo 'Please specify version'
  exit 1
fi

_zipname=Craft_Docs_"${VERSION}.alfredworkflow"

zip -r "${_zipname}" \
  alfred-craftdocs \
  icon.png \
  info.plist \
  init.sh \
  package.json \
  package-lock.json \
  preflight.sh \
  search.sh
