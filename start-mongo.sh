#!/bin/bash

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null
then
    echo "MongoDB could not be found. Please install MongoDB to proceed."
    exit
fi

# Start MongoDB server
echo "Starting MongoDB server..."
mongod --dbpath ./data/db --bind_ip 127.0.0.1 --port 27017
