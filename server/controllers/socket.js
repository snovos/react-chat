
// Keep track of which names are used so that there are no duplicates
var userNames = (function () {
    var names = {};
    var users = {};

    var claim = function (name) {
        if (!name || names[name]) {
            return false;
        } else {
            names[name] = true;
            return true;
        }
    };

    // find the lowest unused "guest" name and claim it
    var getGuestName = function () {
        var name,
            nextUserId = 1;

        do {
            name = 'Guest ' + nextUserId;
            nextUserId += 1;
        } while (!claim(name));

        return name;
    };

    // serialize claimed names as an array
    var get = function () {
        var res = [];
        for (var user in names) {
            res.push({name:user, time:new Date()});
        }

        return res;
    };

    var getUsers = function () {
        var res = [];
        for (var i in users) {
            res.push({name:users[i]});
        }
        return res;
    };

    var getUserById = function (id) {
        return users[id];
    }

    var addUser = function (id, user) {
        users[id] = user;
    };

    var free = function (id) {
        if (users[id]) {
            delete users[id];
        }
    };

    var isNewUser = function (id) {
        return !users[id]
    };

    return {
        claim: claim,
        free: free,
        get: get,
        addUser:addUser,
        getUserById:getUserById,
        getUsers:getUsers,
        isNewUser:isNewUser,
        getGuestName: getGuestName
    };
}());

// export function for listening to the socket
module.exports = function (socket) {
    var name = userNames.getGuestName();

    // send the new user their name and a list of users
    socket.emit('init',
        userNames.getUsers()
    );

    // notify other clients that a new user has joined
    socket.on('join', function (data) {
        if(userNames.isNewUser(data.sub)) {
            userNames.addUser(data.sub, data.name);
            socket.nickname = data.sub;
            socket.broadcast.emit('user:join', {
                name:data.name,
                text: data.text
            });
        }

    });

    // broadcast a user's message to other users
    socket.on('send:message', function (data) {
        socket.broadcast.emit('send:message', {
            user:data.user,
            text: data.text
        });
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function () {
        socket.broadcast.emit('user:left', {
            name: userNames.getUserById(socket.nickname)
        });
        userNames.free(socket.nickname);
    });
};
