let config = exports;

config.db = {
  url: '',
};

config.server = {
  port: 8080,
};

config.authentication = {
    salt_work_factor: 10,
};

config.sessions = {
    secret: process.env.SESSION_SECRET || 'default',
};
