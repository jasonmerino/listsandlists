#!/bin/bash
# Start Lists & Lists local app

mongod &
nodemon server.js &
cd app && compass watch
