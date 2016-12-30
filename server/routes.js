const auth = require('./controllers/auth');

module.exports.initialize = function(app) {
    app.post('/signup', auth.signup);
    app.post('/login', auth.login);
};
