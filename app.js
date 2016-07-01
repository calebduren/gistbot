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

app.set('port', (process.env.PORT || 5000));

if (!prod) {
  app.set('port', 3000);
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

require('./routes/pages')(app);
require('./routes/services')(app);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function(request, response) {
  response.render('views/index');
});
