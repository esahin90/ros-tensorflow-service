#!/bin/bash

. /app/catkin_ws/devel/setup.sh
export PYTHONPATH="/opt/ros/kinetic/lib/python2.7/dist-packages:/usr/lib/python2.7/dist-packages:/usr/local/lib/python2.7/dist-packages"

roslaunch rostensorflow start.launch
