var express = require('express');
var app = express();
var io = require('socket.io')();
var bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const apiRoutes = require('./server/routes');
var socket = require('./server/controllers/socket');

require('./server/models').connect(config.dbUri);

app.set('port', process.env.PORT || 3000 );
app.set('view engine', 'ejs');
app.set('views', './server/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./client/public'));
app.use(passport.initialize());

app.get('*', function(req, res) {
    res.render('index', {});
});

// @TODO add authentication check for api calls
//const authCheckMiddleware = require('./server/middleware/auth-check');
//app.use('/api', authCheckMiddleware);

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