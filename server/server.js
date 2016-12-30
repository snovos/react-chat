var express = require('express');
var reload = require('reload');
var app = express();
var io = require('socket.io')();
const passport = require('passport');
const config = require('./config');
const apiRoutes = require('./routes');
var socket = require('./../app/routes/socket');

require('./server/models').connect(config.dbUri);

app.set('port', process.env.PORT || 3000 );
app.set('view engine', 'ejs');
app.set('views', 'app/views');


app.use(express.static('..client/public'));
app.use(express.static('../client/dist/'));
app.use(passport.initialize());
apiRoutes.initialize(app);
// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});

io.attach(server);
io.sockets.on('connection', socket);