let config = exports;

config.general = {
  log_level: 'debug',
};

config.db = {
  url: '',
};

config.server = {
  port: 8080,
  access_control: {
    allow_origin: '',
  },
};

config.authentication = {
    salt_work_factor: 10,
};

config.sessions = {
    secret: process.env.SESSION_SECRET || 'default',
    secure: false,
    httpOnly: true,
};

config.user = {
    defaultRole: 'member',
    roles: {
        member: 'member',
        admin: 'admin',
    },
};
