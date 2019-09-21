#!/usr/bin/env python
# coding: utf-8

# ## Object detection through ROS
# This script is for performing object detection on a raw image from a camera using the Google Tensorflow API based on Faster RCNN

import rospy
from sensor_msgs.msg import CompressedImage
from std_msgs.msg import Bool
import cv2
import os
print os.environ['PYTHONPATH'].split(os.pathsep)

## TensorFlow related imports
import numpy as np
import tensorflow as tf
import keras

from keras.layers import Input, Flatten, Dense, Dropout
from keras.models import load_model, Model
from keras.preprocessing import image


namespace = 'rostensorflow'

## Path to data
PATH_TO_DATA = '/app/real_data'

## Path to saved model
PATH_TO_MODEL = '/app/model/airplane_classifier.h5'


class rostensorflow():

    def __init__(self, name):
        """
        Class for the ROS node which runs tensorflow for object detection.
        """
        self._namespace = name;

        ## Load the keras model into memory
        try:
            self.model = keras.models.load_model(PATH_TO_MODEL)
        except IOError:
            # No model trained yet, need to train a new model

            # Load train-/testing-data generators
            train_datagen = image.ImageDataGenerator(
                    rotation_range=20,
                    rescale=1./255,
                    shear_range=0.2,
                    zoom_range=0.2,
                    horizontal_flip=True)

            test_datagen = image.ImageDataGenerator(
                    rescale=1./255,
                    validation_split=0.2)

            train_generator = train_datagen.flow_from_directory(
                    '/app/real_data/train',
                    target_size=(224, 224),
                    batch_size=32,
                    class_mode='categorical')

            validation_generator = test_datagen.flow_from_directory(
                    '/app/real_data/test',
                    target_size=(224, 224),
                    batch_size=32,
                    class_mode='categorical')

            # Specify model
            # Input layer
            input_t = Input((224, 224, 3))

            # Load pretrained vgg16
            vgg_conv = keras.applications.vgg16.VGG16(include_top=False, weights='imagenet', input_tensor=input_t)
            # Freeze the layers except the last 4 layers
            for layer in vgg_conv.layers[:-4]:
                layer.trainable = False
           
            # Define own layers
            x = vgg_conv.output
            x = Flatten()(x)
            x = Dense(1024, activation='relu')(x)
            x = Dropout(0.5)(x)
            x = Dense(512, activation='relu')(x)
            x = Dropout(0.5)(x)
            x = Dense(256, activation='relu')(x)
            x = Dropout(0.5)(x)
            x = Dense(1, activation='softmax')(x)
            self.model = Model(vgg_conv.input, x)

            # Compile the model
            self.model.compile(
                    loss='categorical_crossentropy',
                    optimizer=optimizers.RMSprop(lr=1e-4),
                    metrics=['acc'])

            # Train on data generators
            self.model.fit_generator(
                    train_generator,
                    steps_per_epoch=2000,
                    epochs=50,
                    validation_data=validation_generator,
                    validation_steps=800)

            self.model.save(PATH_TO_MODEL)

        self._sub = rospy.Subscriber("/camera/image/compressed", CompressedImage, self._img_callback)
	#self._error_pub = rospy.Publisher("/error", Bool, queue_size=10)

    def _img_callback(self, img):
        np_arr = np.fromstring(req.raw.data, np.uint8)
        image_np = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
        image_np_expanded = np.expand_dims(img, axis=0)
        image_tensor /= 255.

        # Detection through model
        prediction = self.model.predict(image_tensor)
	rospy.loginfo("Prediction from last image: %s", prediction)

    def main(self):
        rospy.spin()

if __name__ == '__main__':
    rospy.init_node(namespace)
    tensor = rostensorflow(rospy.get_name())
    tensor.main()
