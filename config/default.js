let config = exports;

config.general = {
  log_level: 'debug',
};

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

config.user = {
    defaultRole: 'member',
    roles: {
        member: 'member',
        admin: 'admin',
    },
};
