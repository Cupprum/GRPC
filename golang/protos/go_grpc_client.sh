#!/bin/bash

proto_dir='../../protos'
proto_file='helloworld.proto'
out_dir='.'

protoc \
    --proto_path="$proto_dir" \
    --go_out="$out_dir" \
    --go_opt=paths=source_relative \
    --go-grpc_out="$out_dir" \
    --go-grpc_opt=paths=source_relative \
    "$proto_file"