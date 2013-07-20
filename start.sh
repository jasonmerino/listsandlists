#!/bin/bash
# Start Lists & Lists local app

mongod &
node server.js &
cd app && compass watch
