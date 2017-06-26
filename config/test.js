let config = exports;

config.db = {
  url: 'mongodb://localhost:27017/',
};

config.testusers = {
    member: {
        username: 'member@example.com',
        password: '1234',
        role: 'member',
    },
    admin: {
        username: 'admin@example.com',
        password: '1234',
        role: 'admin',
    },

};
