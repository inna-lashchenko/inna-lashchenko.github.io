var Users = require('../lib/users');
var users = new Users();

module.exports = {
    addUser: function (request, result, next) {
        var body = '';

        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            if (users.add(JSON.parse(body))) {
                next({status: 201});
            } else {
                next({status: 400});
            }
        });
    },
    showUsers: function (request, result, next) {
        next({status: 200, users: users.getUsers()});
    }

};

