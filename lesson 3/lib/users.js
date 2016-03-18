

function Users() {

    var users = [];
    var mainFields = ['nick', 'name'];
    var unimportantFields = mainFields.concat(['e-mail', 'description', 'age']);

    function unimportantCheck(data, id) {
        var user = id || {};
        unimportantFields.forEach(function (value, index) {
            if (data[value]) {
                user[value] = data[value];
            }

        });
        return user;
    }

    function mainCheck(data) {
        for (var index in mainFields) {
            var key = mainFields[index];
            if (!data.hasOwnProperty(key) || !data[key]) {
                return false;
            }
        }
        return true;
    }

    this.add = function add(data) {
        console.log(data);
        if (mainCheck(data)) {
            for (var index in users) {
                var user = users[index];
                if (user.nick === data.nick) {
                    unimportantCheck(data, users[index]);
                    return true;
                }
            }
            users.push(unimportantCheck(data));
            return true;
        }
        return false;
    };

    this.getUsers = function getUsers() {
        return users;
    };
}

module.exports = Users;