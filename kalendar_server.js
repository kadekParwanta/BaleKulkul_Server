var http = require('http'),
    fs = require('fs'),
    qs = require('querystring'),
    calendar = require('./scripts/kalendar');

var PORT = process.env.PORT || 3000;

var server = http.createServer(function(req, res){
  res.setEncoding = 'utf8';
  if(req.method == 'GET' && req.url == '/'){
    serve(__dirname + '/index.html', 'text/html')
  } else if (req.method == 'GET' && req.url.substr(-3) == 'css'){
    serve(__dirname + '/' + req.url, 'text/css');
  } else if (req.method == 'GET' && req.url.substr(-2) == 'js'){
    serve(__dirname + '/' + req.url, 'text/javascript');
    /*
  } else if(req.method == 'GET' &&
    req.url.substr(0, 14) == '/date_property')
  {
    req.on('end', function() {
      var queries = req.url.split('?', 2)[1];
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<p>The queries are: ' + queries + '</p>');
    });
    */
  } else if (req.method == 'POST' && req.url == '/date_property') {
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      var day = qs.parse(body).date;
      var daytype = JSON.stringify(calendar.bali_calendar(day));
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': daytype.length.toString()
      });
      res.end(daytype);
    });
  } else {
    console.log(req.method);
    console.log(req.url);
    notFound();
  }
  function serve(path, type){
    res.writeHead(200, { 'Content-Type': type });
    fs.createReadStream(path).pipe(res);
  }
  function notFound() {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT);
