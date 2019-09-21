FROM ros:kinetic-ros-base
MAINTAINER Emre Sahin <emre.tr@outlook.com>

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        curl \
        libfreetype6-dev \
        libpng12-dev \
        libzmq3-dev \
	nano \
        pkg-config \
        python \
        python-dev \
	python-pip \
        python-numpy \
        python-scipy \
        python-pil \
        python-lxml \
        python-opencv \
        rsync \
        protobuf-compiler \
        ros-kinetic-rosbridge-server \
	ros-kinetic-image-view \
	ros-kinetic-compressed-image-transport

RUN  apt-get clean && \
        rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip enum34 setuptools

RUN pip --no-cache-dir install \
	https://storage.googleapis.com/tensorflow/linux/cpu/tensorflow-1.3.0-cp27-none-linux_x86_64.whl

RUN pip install --upgrade np_utils
RUN pip install --upgrade tf-nightly
RUN pip install --upgrade keras

COPY app /app

# Setup catkin workspace
RUN /bin/bash -c "source /opt/ros/kinetic/setup.bash && \
                  chmod +x /app/catkin_ws/src/rostensorflow/scripts/keras.py && \
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

ENV PYTHONPATH "/opt/ros/kinetic/lib/python2.7/dist-packages:/usr/lib/python2.7/dist-packages:/usr/local/lib/python2.7/dist-packages"

CMD ["/app/run.sh"]
