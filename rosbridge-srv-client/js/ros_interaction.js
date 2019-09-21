var ros = new ROSLIB.Ros();

ros.on('connection', function() {
  console.log('Connected to websocket server.');
});

// connect on startup
ros.connect("wss://" + window.location.hostname + ":9090", {
  protocolVersion: 8,
  origin: "https://" + window.location.hostname + ":8888",
  rejectUnauthorized: false
});
