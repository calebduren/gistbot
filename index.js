var prod;
if (!process.env.PORT) {
  prod = false;
} else {
  prod = true;
  require('newrelic'); //app monitoring
}

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var app = express();

if (!prod) {
  app.set('port', 3000);
}

app.set('views','views');
app.set('view engine', 'jade');
app.use(express.static('public')));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  require('./routes/pages')(app);
  require('./routes/services')(app);
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
