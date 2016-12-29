var express = require('express');
var reload = require('reload');
var app = express();
var io = require('socket.io')();
var socket = require('./routes/socket');

app.set('port', process.env.PORT || 3000 );
app.set('view engine', 'ejs');
app.set('views', 'app/views');


app.use(express.static('app/public'));
app.use(require('./routes/index'));


var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});

io.attach(server);
io.sockets.on('connection', socket);