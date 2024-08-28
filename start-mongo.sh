#!/bin/bash

#!/bin/bash

CONTAINER_NAME="mongo_dev"

# Check if the container is already running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "A container with the name $CONTAINER_NAME is already running."
else
    # Check if the container exists but is not running
    if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
        echo "Starting existing container $CONTAINER_NAME..."
        docker start $CONTAINER_NAME
    else
        # Run a new MongoDB container
        echo "Starting a new MongoDB container..."
        docker run --name $CONTAINER_NAME -d -p 27017:27017 -v $(pwd)/data/db:/data/db mongo
    fi
fi
