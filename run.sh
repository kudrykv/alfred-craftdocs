#!/usr/bin/env bash
set -e

PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH
export PATH=$PATH

# databases live here
_path=$HOME'/Library/Containers/com.lukilabs.lukiapp/Data/Library/Application Support/com.lukilabs.lukiapp'

_nodepath=$(command -v node || true)
if [ -z "$_nodepath" ]; then
  echo '{"items":[{"title":"Did not find Node", "valid":false}]}'
  exit
fi

# main database
_filename=$(ls "$_path" | grep 'LukiMain.*realm$' | grep -v '\|' | head -n 1)

_spaceID=$(echo "$_filename" | cut -d_ -f2)
_copybase="$_spaceID.realm"

# need to copy the original db elsewhere: if opened with Craft, then cannot be accessed by anyone else
if [ ! -e "$_copybase" ]; then
  cp "$_path/$_filename" "$_path/$_copybase"
else
  # calc when the copy was made. If more than N seconds again, refresh the "cache"
  _mod=$(stat -f '%m' "$_path/$_copybase")
  _now=$(date +'%s')
  _distance=$((_now - _mod))

  if [ $_distance -gt 30 ]; then
    cp "$_path/$_filename" "$_path/$_copybase"
  fi
fi

node alfred-craftdocs/index.js "$_spaceID" "$@"
