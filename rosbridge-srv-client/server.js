const https = require('https'),
 url = require('url'),
 fs = require('fs'),
 path = require('path');
 options = {
   key: fs.readFileSync('key/privateKey.pem'),
   cert: fs.readFileSync('key/certificate.pem')
 };


const server = https.createServer(options, function (req, res) {
  var q = url.parse(req.url, true);
  var filename = '';
  if (q.pathname == '/') {
    filename += '/index.html'
  } else if (q.pathname == '/task') {
    filename += '.html';
  } else {
    filename += q.pathname;
  }
  fs.readFile(path.join(__dirname, filename), function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    if (filename.endsWith('.css')) {
      res.writeHead(200, {"Content-Type": "text/css"});
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
    }
    res.write(data);
    return res.end();
  });
}).listen(8888);


process.on('SIGINT', function() {
  console.log("Caught Ctrl-C, exiting...!");
  server.close();
  process.exit();
});

console.log("Server started on https://localhost:8888");
