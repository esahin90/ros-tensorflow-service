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

function showErrorMsg() {
  let errMsg = '<h2><span class="emoji">⚠</span>FEHLERFALL</h2>Warnung! FEUER!<br>';
  errMsg += '<br />Manager benachrichtigt!<br />Techniker beauftragt!';
  alertify.error(errMsg, 0);
  task2.domElement.classList.add('error');
}
