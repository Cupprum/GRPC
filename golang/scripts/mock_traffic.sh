#!/bin/bash

while true
do
    curl http://www.example.com &> /dev/null
    sleep 2
done
