#!/bin/bash

current_dir=`dirname $0`

target_pathname=$current_dir/mod.ts

es_dir=$current_dir/../../es/v0.1
es_pathname=$es_dir/datastore.js

deno bundle $target_pathname $es_pathname

