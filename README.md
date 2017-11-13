# ros-tensorflow-srv
ROS-Service for Tensorflow and Object Detection API including Web-App for Visualization

# How to setup?
1. Install Dependencies: Docker, Node.js, npm
2. Install Node.js Project Dependencies: `npm install rosbridge-srv-client`
3. Building Image with Docker: `docker build -t ros-tensorflow-srv ros-tensorflow-srv`

# How to run?
1. Starting Container
    * In Background: `docker run -d -p 9090:9090 --rm ros-tensorflow-srv`
    * Interactive Mode: `docker run -it -p 9090:9090 --rm ros-tensorflow-srv`
    * Manual Mode with bash inside Docker Container
        1. `docker run -it -p 9090:9090 --rm ros-tensorflow-srv /bin/bash`
        2. `/app/run.sh`
2. Starting Client-Wepp-App: `cd rosbridge-srv-client && npm start`

# Source
Inspired by: romilly/rpi-docker-tensorflow
