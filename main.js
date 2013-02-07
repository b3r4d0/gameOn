var ss = require('socketstream'),
    express = require('express'),
    chipmunk = require('chipmunk'),
    server = express();

var app = express();

// Code & Template Formatters
ss.client.formatters.add(require('ss-stylus'));
ss.client.templateEngine.use(require('ss-hogan'));

ss.client.define('main', {
  view: 'app.html',
  css:  ['libs/reset.css', 'app.styl'],
  code: ['libs/jquery.min.js', 'libs/chipmunk/cp.min.js', 'app', 'app/world.js' ],
  tmpl: '*'
});

server.use('/test', express.static(__dirname + '/test') );

// Use Express to route requests
app.get('/', function(req, res){
  res.serveClient('main');
});

server = app.listen(3000);
ss.start(server);

// Append SocketStream middleware to the stack
app.stack = ss.http.middleware.stack.concat(app.stack);
