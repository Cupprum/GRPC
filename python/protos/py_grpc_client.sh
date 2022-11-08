#!/bin/bash

proto_dir='../../protos'
proto_file='helloworld.proto'
out_dir='.'

python3 -m grpc_tools.protoc \
    --proto_path="$proto_dir" \
    --python_out="$out_dir" \
    --pyi_out="$out_dir" \
    --grpc_python_out="$out_dir" \
    "$proto_file"
