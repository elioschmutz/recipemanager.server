let winston = require('winston');
let config = require('config');

winston.level = config.general.log_level;

module.exports = winston;
