#!/usr/bin/env bash

set -e

_version=$(grep -A 1 version info.plist | tail -n 1 | perl -pe 's/.*(\d+\.\d+\.\d+).*/\1/')
if [ -z "${_version}" ]; then
  echo 'Could not parse version from info.plist'
  exit 1
fi

_line_number=$(grep -n "${_version}" info.plist | cut -d: -f1)
if [ -z "${_line_number}" ]; then
  echo 'Could not figure out line number with version'
  exit 1
fi

_major=$(echo "${_version}" | cut -d. -f1)
_minor=$(echo "${_version}" | cut -d. -f2)
_patch=$(echo "${_version}" | cut -d. -f3)

case "$1" in
patch)
  _patch=$((_patch + 1))
  ;;

minor)
  _minor=$((_minor + 1))
  _patch=0
  ;;

major)
  _major=$((_major+1))
  _minor=0
  _patch=0
  ;;

*)
  echo "Specify bump step: major, minor, or patch"
  exit 1
  ;;
esac

_bump=${_major}.${_minor}.${_patch}

echo "Current version is ${_version}"
echo "Changing it to ${_bump}"

sed -i'.old' -e "${_line_number}s/${_version}/${_bump}/" info.plist

git add info.plist
git commit -m "update version from ${_version} to ${_bump}"
git tag -a "v${_bump}" -m "v${_bump}"
