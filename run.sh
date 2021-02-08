#!/usr/bin/env bash
set -e

PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH
export PATH=$PATH

_nodepath=$(command -v node || true)
if [ -z "$_nodepath" ]; then
  echo '{"items":[{"title":"Did not find Node", "valid":false}]}'
  exit
fi

function file_last_modified() {
  stat -f '%m' "$1"
}

function store_last_modified() {
  file_last_modified "$1" >"$2"
}

# databases live here
_path=$HOME'/Library/Containers/com.lukilabs.lukiapp/Data/Library/Application Support/com.lukilabs.lukiapp'

# main database
_filename=$(ls "$_path" | grep 'LukiMain.*realm$' | grep -v '\|' | head -n 1)

_spaceID=$(echo "$_filename" | cut -d_ -f2)
_copybase="workflow_$_spaceID.realm"

_orig_db_path="$_path/$_filename"
_copy_db_path="$_path/$_copybase"
_orig_db_stat_snapshot="$_path/workflow_orig_$_spaceID.stat"

# need to copy the original db elsewhere: if opened with Craft, then cannot be accessed by anyone else
# if the file does not exist yet
if [ ! -e "$_copybase" ]; then
  cp "$_orig_db_path" "$_copy_db_path"
  store_last_modified "$_orig_db_path" "$_orig_db_stat_snapshot"
else
  _curr_stat=$(file_last_modified "$_orig_db_path")
  _cat_stat=$(cat "$_orig_db_stat_snapshot")

  # make a new copy only when the
  if [ "$_curr_stat" != "$_cat_stat" ]; then
    cp "$_path/$_filename" "$_path/$_copybase"
    store_last_modified "$_orig_db_path" "$_orig_db_stat_snapshot"
  fi
fi

node alfred-craftdocs/index.js "$_spaceID" search "$@"
