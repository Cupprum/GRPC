#!/bin/bash

docker run --network=host --env-file=.env python-client-grpc
