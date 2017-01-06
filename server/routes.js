const auth = require('./controllers/auth');

module.exports.initialize = function(app) {
    app.post('/auth/logout', auth.logout)
    app.post('/auth/signup', auth.signup);
    app.post('/auth/login', auth.login);
};
