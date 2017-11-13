#!/usr/bin/env python
# coding: utf-8

# ## Object detection through ROS
# This script is for performing object detection on a raw image from a camera using the Google Tensorflow API based on Faster RCNN

import rospy
from sensor_msgs.msg import CompressedImage
from rostensorflow.srv import *
import cv2

## TensorFlow related imports
import numpy as np
import tensorflow as tf

## Object detection imports
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as vis_util

namespace = 'rostensorflow'

# ## Path to models
MODEL_NAME = '/app/model'
# Path to frozen detection graph. This is the actual model that is used for the object detection.
PATH_TO_CKPT = MODEL_NAME + '/frozen_inference_graph.pb'
# List of the strings that is used to add correct label for each box.
PATH_TO_LABELS = '/app/catkin_ws/src/rostensorflow/scripts/object_detection/data/mscoco_label_map.pbtxt'

NUM_CLASSES = 90

class rostensorflow():

    def __init__(self, name):
        """
        Class for the ROS node which runs tensorflow for object detection.
        """
        ## Load the tensorflow model into memory
        self._namespace = name;
        self.detection_graph = tf.Graph()
        with self.detection_graph.as_default():
          od_graph_def = tf.GraphDef()
          with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
            od_graph_def.ParseFromString(fid.read())
            tf.import_graph_def(od_graph_def, name='')

        ## Load the label map
        label_map = label_map_util.load_labelmap(PATH_TO_LABELS)
        categories = label_map_util.convert_label_map_to_categories(label_map, max_num_classes=NUM_CLASSES, use_display_name=True)
        self.category_index = label_map_util.create_category_index(categories)

        self._session = tf.Session(graph=self.detection_graph)

        self._img_srv = rospy.Service(self._namespace + '/detect_object/image', ImageDetection, self.handle_image_detection)
        self._json_srv = rospy.Service(self._namespace + '/detect_object/json', JSONDetection, self.handle_json_detection)
        self._label_json_srv = rospy.Service(self._namespace + '/detect_object/labeled_json', JSONDetection, self.handle_labeled_json_detection)
        self._all_srv = rospy.Service(self._namespace + '/detect_object/all', DetectAll, self.handle_detect_all)
        self._all_label_srv = rospy.Service(self._namespace + '/detect_object/all_with_label', DetectAll, self.handle_detect_all_with_label)

    def _detection(self, img):
        # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
        image_np_expanded = np.expand_dims(img, axis=0)

        image_tensor = self.detection_graph.get_tensor_by_name('image_tensor:0')
        # Each box represents a part of the image where a particular object was detected.
        boxes = self.detection_graph.get_tensor_by_name('detection_boxes:0')
        # Each score represent how level of confidence for each of the objects.
        # Score is shown on the result image, together with the class label.
        scores = self.detection_graph.get_tensor_by_name('detection_scores:0')
        classes = self.detection_graph.get_tensor_by_name('detection_classes:0')
        num_detections = self.detection_graph.get_tensor_by_name('num_detections:0')
        # Actual detection.
        return self._session.run(
            [boxes, scores, classes, num_detections],
            feed_dict={image_tensor: image_np_expanded})

    def _get_json(self, img, boxes, scores, classes, num_detections):
        img_height, img_width, channels = img.shape
        # Pixel Calculation of the given Image and Boxes
        multi_mat = [img_width, img_height, img_width, img_height]
        boxes_list = []
        for box in np.squeeze(boxes).tolist():
            boxes_list.append(map(lambda x,y: int(x * y), multi_mat, box))

        # Creat JSON Message
        json_string = "{ " + '"boxes" : {}, "classes" : {}, "scores" : {}, "num_detections" : {}'.format(boxes_list, np.squeeze(classes).astype(np.int32).tolist(), np.squeeze(scores).tolist(), num_detections[0]) + " }"

        return json_string

    def _get_named_json(self, img, boxes, scores, classes, num_detections):
        img_height, img_width, channels = img.shape
        # Pixel Calculation of the given Image and Boxes
        multi_mat = [img_width, img_height, img_width, img_height]
        list_boxes = np.squeeze(boxes).tolist()
        boxes_list = []
        class_ids = np.squeeze(classes).astype(np.int32).tolist()
        class_list = []
        for i in range(len(np.squeeze(boxes).tolist())):
            boxes_list.append(map(lambda x,y: int(x * y), multi_mat, list_boxes[i]))
            class_list.append(self.category_index[class_ids[i]]['name'].encode('ascii'))

        # Creat JSON Message
        json_string = "{ " + '"boxes" : {}, "classes" : {}, "scores" : {}, "num_detections" : {}'.format(boxes_list, class_list, np.squeeze(scores).tolist(), num_detections[0]) + " }"

        return json_string

    def _get_visualized_img(self, img, boxes, scores, classes, num_detections):
        # Visualization of the results of a detection.
        vis_util.visualize_boxes_and_labels_on_image_array(
          img,
          np.squeeze(boxes),
          np.squeeze(classes).astype(np.int32),
          np.squeeze(scores),
          self.category_index,
          use_normalized_coordinates=True,
          line_thickness=8)

        # Create CompressedImage Message
        cmpMsg = CompressedImage()
        cmpMsg.header.stamp = rospy.Time.now()
        cmpMsg.format = "jpeg"
        flag, img_jpg = cv2.imencode(".jpg", img)
        cmpMsg.data = np.array(img_jpg).tostring()

        return cmpMsg;

    def handle_json_detection(self, req):
        np_arr = np.fromstring(req.raw.data, np.uint8)
        image_np = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Detection through model
        (boxes, scores, classes, num_detections) = self._detection(image_np)
        # Get JSON Description of Detection
        jsonString = self._get_json(image_np, boxes, scores, classes, num_detections)

        return JSONDetectionResponse(jsonString)

    def handle_labeled_json_detection(self, req):
        np_arr = np.fromstring(req.raw.data, np.uint8)
        image_np = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Detection through model
        (boxes, scores, classes, num_detections) = self._detection(image_np)
        # Get JSON Description of Detection
        jsonString = self._get_named_json(image_np, boxes, scores, classes, num_detections)

        return JSONDetectionResponse(jsonString)

    def handle_image_detection(self, req):
        np_arr = np.fromstring(req.raw.data, np.uint8)
        image_np = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Detection through model
        (boxes, scores, classes, num_detections) = self._detection(image_np)
        # Visualize Boxes on Image
        imgMsg = self._get_visualized_img(image_np, boxes, scores, classes, num_detections)

        return ImageDetectionResponse(imgMsg)

    def handle_detect_all(self, req):
        np_arr = np.fromstring(req.raw.data, np.uint8)
        image_np = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Detection through model
        (boxes, scores, classes, num_detections) = self._detection(image_np)
        # Visualize Boxes on Image
        imgMsg = self._get_visualized_img(image_np, boxes, scores, classes, num_detections)
        # Get JSON Description of Detection
        jsonString = self._get_json(image_np, boxes, scores, classes, num_detections)

        return DetectAllResponse(imgMsg, jsonString)

    def handle_detect_all_with_label(self, req):
        np_arr = np.fromstring(req.raw.data, np.uint8)
        image_np = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Detection through model
        (boxes, scores, classes, num_detections) = self._detection(image_np)
        # Visualize Boxes on Image
        imgMsg = self._get_visualized_img(image_np, boxes, scores, classes, num_detections)
        # Get JSON Description of Detection
        jsonString = self._get_named_json(image_np, boxes, scores, classes, num_detections)

        return DetectAllResponse(imgMsg, jsonString)

    def main(self):
        rospy.spin()

if __name__ == '__main__':
    rospy.init_node(namespace)
    tensor = rostensorflow(rospy.get_name())
    tensor.main()
