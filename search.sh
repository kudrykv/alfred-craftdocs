#!/usr/bin/env bash
set -e

. preflight.sh

node alfred-craftdocs/index.js "$_spaceID" search "$@"
