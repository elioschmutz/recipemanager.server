let User = require('../app/models/user');


module.exports.user = (username, password, role) => {
    return new User({
        username: username,
        password: password,
        role: role}).save().then((user) => {
            return user;
        });
};
