'use strict';

var RECORD_ON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAASFBMVEUAAAAAAADMzMz/AABmZmaZmZnMAABmAACZAAAzAAAzMzP/MzPMZmaZMzPMMzP/MwD/////Zmb/ZgBmMzPMmZmZZmb/mQD/mZlxvxKlAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQffCBIMMyVTqZicAAACK0lEQVRIx43W63aDIAwA4KJJhVjrVtfu/d90kASIFlzzp5fDd5KAgJdLJwa8fB6YYojBXz4EQw1EgNPxAGDHqzpDBqDV0EN5DDoToIhagkSAOwb2DIEBRLEWINJf2DQspCQ7AwiUy0M69pEFyCR/xZCl4cTE/CgQtYoU2xZC2J6YiXNHA3ai4uApRwjaj+RBs+JWpKHLcrstiyAz3WjFUFJMk4/jf39+fqPyCdXJLmmwzi4L7+8a8avPhlwtzSQRcY0x3+9z+mSz8bSY0jRJWoEirtdxlM+IluczEXA7In+FbVm8jJ9jqIpmC2nBSjc6XXFZwvS83XwC4/wdI5pRDLczUE6TSJoPisRrDhNCkqFSmTY/pN6ZpIo05pguGZk1qawSKL3PxnznNIGHkDSjK1/q4tZNnlFI0CdNCeiTooRjXVfTTV5PJnggWTxejzNCDfJ6PdYWGd6zXHOWR7ewXi/jOrYJ8PbCvFH8cSGFlBmjQoZC/Dup68LbjAmWR39fWaOu1MRFCNg0rWesrCQTU1njuaxPZW1lX1neYRXwvgy1rkLQGN2WZVOWJHFPDZBPMUTXMVZAvZ+gnolqfBlvT6VEymGJelzryedL7M4+MFdTvIwAnDn8JnPCupbgO7KaeijHLz1xNKzseBVweTPketEQQgDagLAhssFWIl6P5j3OpK5QzgB8lXVufiFoFkl/n71fZIPlDeYsxa64+l7yH1BFUAv6ANgZ7wz/A295IO9de7kCAAAAAElFTkSuQmCC";
var RECORD_OFF =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAFVBMVEVvcm0AAAAzMzNmZmbMzMyZmZn///8pcdebAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQffCBINBR5qfIr6AAABv0lEQVQ4y22UQZaCMAyGffo8QED3Q9E9EDmAYzrrgZIbzJv7H2GStFLLmA22H/+fWNLsdi/hd2+DeSHP/A6Qhg9duX/AhVJskAGPoyLsNmACjVrQkMFe3u0hxUKPj5W0BqoWh0YeSxbtb2o1xvyNGPqnCMkLYPr6/SEOABcKqeKbF8mV2UE1KgHysbyDStaQTCKKR8GpYHDoIJVuJ3hcyJZVK1ZanFbuv5XQIypaRBycoupkdkx3kzhBg3NOMl2j3UJ9LS+6NRCufSLyq9KtqBFVPWmi4+KBoUbZkQoUiMHniZTcYYYqmylpjUgBdyVohu2s5HxOpDdiSWbNA3UlZR/lBBqw/CYyIkenRL9ZqjfVFgln0vJckiaTkIkvNYXba57WZRLku03xPHPo2sj9DamVLFuiFZ2pE2IfbkNOQnY32hBdXrR7RoLSzhrhYWQqRNYj/NB281MhsrZiVGJtuYpiw7E16RiajGIrYrxdGHooo0ZMdxQ3BJ8XErHfSrrnxcamlOB65Qu/K+bbLWTOXrxKDKU/JU3I/DoQDsjMgwmYyyFyGNkGj4ykgOXgET8bSf+AqAZ1DIhvBhwivu7/ATYxlvOTH50RAAAAAElFTkSuQmCC";

var ros = new ROSLIB.Ros();

ros.on('connection', function() {
  console.log('Connected to websocket server.');
});

ros.on('error', function(error) {
  console.log('Error connecting to websocket server: ', error);
  window.alert('Error connecting to websocket server');
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
});

var detectObjectsClient = new ROSLIB.Service({
  ros : ros
});

var detectionServices = [
  {
    name: '/rostensorflow/detect_object/image',
    serviceType: 'rostensorflow/ImageDetection'
  },
  {
    name: '/rostensorflow/detect_object/json',
    serviceType: 'rostensorflow/JSONDetection'
  },
  {
    name: '/rostensorflow/detect_object/labeled_json',
    serviceType: 'rostensorflow/JSONDetection'
  },
  {
    name: '/rostensorflow/detect_object/all',
    serviceType: 'rostensorflow/DetectAll'
  },
  {
    name: '/rostensorflow/detect_object/all_with_label',
    serviceType: 'rostensorflow/DetectAll'
  }
];

var imageMessage = new ROSLIB.Message({
  format: "jpeg"
});

var req = new ROSLIB.ServiceRequest({
  raw : imageMessage
});

document.getElementById('startstopicon').setAttribute('src', RECORD_OFF);

var hasRunOnce = false,
  video = document.querySelector('video'),
  canvas = document.querySelector('canvas'),
  output_canvas = document.querySelector('canvas#output'),
  output_json = document.querySelector('p#output_json'),
  videoSelect = document.querySelector('select#videoSource'),
  serviceSelect = document.querySelector('select#serviceSource'),
  selectors = [videoSelect],
  srv_selector = [serviceSelect],
  image = new Image(),
  width = 640,
  height,
  cameraTimer;

function gotDevices(deviceInfos) {
  var values = selectors.map(function(select) {
    return select.value;
  });
  selectors.forEach(function(select) {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    var option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach(function(select, selectorIndex) {
    if (Array.prototype.slice.call(select.childNodes).some(function(n) {
        return n.value === values[selectorIndex];
      })) {
      select.value = values[selectorIndex];
    }
  });

  var srv_values = srv_selector.map(function(select) {
    return select.value;
  });
  srv_selector.forEach(function(select) {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (var j = 0; j !== detectionServices.length; ++j) {
    var srv = detectionServices[j];
    var srv_option = document.createElement('option');
    srv_option.value = j;
    srv_option.text = detectionServices[j].name;
    serviceSelect.appendChild(srv_option);
  }
  srv_selector.forEach(function(select, selectorIndex) {
    if (Array.prototype.slice.call(select.childNodes).some(function(n) {
        return n.value === srv_values[selectorIndex];
      })) {
      select.value = srv_values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

function gotStream(stream) {
  window.stream = stream;
  if ("srcObject" in video) {
    video.srcObject = stream;
  } else {
    video.src = window.URL.createObjectURL(stream);
  }
  video.onloadedmetadata = function(e) {
    video.play();
  };
  return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
  console.log("An error occured! " + error);
  window.alert("An error occured! " + error);
}

function cameraOn() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
  var videoSource = videoSelect.value;
  detectObjectsClient.name = detectionServices[serviceSelect.value].name;
  detectObjectsClient.serviceType = detectionServices[serviceSelect.value].serviceType;
  if (detectObjectsClient.serviceType === 'rostensorflow/ImageDetection'){
    output_json.innerHTML = "";
  }
  var constraints = {
    audio: false,
    video: {
      deviceId: videoSource ? {
        exact: videoSource
      } : undefined
    }
  };
  navigator.mediaDevices.getUserMedia(constraints).
  then(gotStream).then(gotDevices).catch(handleError);
}

function cameraOff() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
  hasRunOnce = false;
}

video.addEventListener('canplay', function(ev) {
  if (!hasRunOnce) {
    height = video.videoHeight / (video.videoWidth / width);
    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    output_canvas.setAttribute('width', width);
    output_canvas.setAttribute('height', height);
    image.onload = function() {
      output_canvas.getContext('2d').drawImage(image, 0, 0, output_canvas.width, output_canvas.height);
    };
    hasRunOnce = true;
  }
}, false);

function takepicture() {
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  imageMessage.data = canvas.toDataURL('image/jpeg').replace("data:image/jpeg;base64,", "");

  detectObjectsClient.callService(req, function(resp) {
    if (resp.result) {
      image.src = "data:image/" + resp.result.format +";base64," + resp.result.data;
    }
    if (resp.json_string) {
      output_json.innerHTML = resp.json_string;
    }
  });
}

startstopicon.addEventListener('click', function(ev) {
  if (cameraTimer == null) {
    ros.connect("wss://" + window.location.hostname + ":9090", {
      protocolVersion: 8,
      origin: "https://" + window.location.hostname + ":8888",
      rejectUnauthorized: false
    });
    videoSelect.onchange = cameraOn();
    serviceSelect.onchange = cameraOn();
    cameraOn();
    cameraTimer = setInterval(function() {
      takepicture();
    }, 400);
    document.getElementById('startstopicon').setAttribute('src', RECORD_ON);
  } else {
    ros.close();
    videoSelect.onchange = null;
    serviceSelect.onchange = null;
    cameraOff();
    clearInterval(cameraTimer);
    document.getElementById('startstopicon').setAttribute('src', RECORD_OFF);
    cameraTimer = null;
  }
}, false);
