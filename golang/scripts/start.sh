#!/bin/bash

/go/app/scripts/mock_traffic.sh &
/go/app/grpc-server
