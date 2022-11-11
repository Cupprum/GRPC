#!/bin/bash

proto_dir='../../../protos'
proto_file='helloworld.proto'
out_dir='.'

protoc \
    --proto_path="$proto_dir" \
    --js_out="import_style=commonjs,binary:$out_dir" \
    --grpc-web_out="import_style=typescript,mode=grpcweb:$out_dir" \
    "$proto_file"