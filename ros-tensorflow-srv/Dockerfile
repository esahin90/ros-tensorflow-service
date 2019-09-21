FROM ros:kinetic-ros-base
MAINTAINER Emre Sahin <emre.tr@outlook.com>

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        curl \
        libfreetype6-dev \
        libpng12-dev \
        libzmq3-dev \
        pkg-config \
        python \
        python-dev \
        python-numpy \
        python-scipy \
        python-pil \
        python-lxml \
        python-opencv \
        rsync \
        protobuf-compiler \
        ros-kinetic-rosbridge-server \
	ros-kinetic-image-view

RUN  apt-get clean && \
        rm -rf /var/lib/apt/lists/*

RUN curl -O https://bootstrap.pypa.io/get-pip.py && \
        python get-pip.py && \
        rm get-pip.py

RUN pip --no-cache-dir install \
        http://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-1.2.0-cp27-none-linux_x86_64.whl

COPY app /app

# Setup catkin workspace
RUN /bin/bash -c "source /opt/ros/kinetic/setup.bash && \
                  chmod +x /app/catkin_ws/src/rostensorflow/scripts/object_detection.py && \
                  chmod +x /app/run.sh && \
                  cd /app/catkin_ws/src/rostensorflow/scripts && \
                  protoc object_detection/protos/*.proto --python_out=. && \
                  cd /app/catkin_ws && \
                  catkin_make"

# TensorBoard
EXPOSE 6006
# ROS-Package: ROSBridge Server
EXPOSE 9090

WORKDIR "/"

CMD ["/app/run.sh"]
