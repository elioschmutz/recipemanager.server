let config = exports;

config.db = {
  url: 'mongodb://localhost:27017/',
};

config.testusers = {
    member: {
        username: 'member@example.com',
        password: '1234',
        role: 'member',
        _id: '111111111111',
    },
    admin: {
        username: 'admin@example.com',
        password: '1234',
        role: 'admin',
        _id: '222222222222',
    },

};
