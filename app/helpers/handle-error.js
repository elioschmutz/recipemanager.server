let logger = require('../logger');

/** Generic error handler used by all endpoints.
 *
 * @param {response} res - Response object
 * @param {string} reason - The reason for the error
 * @param {string} message - The message related to the error
 * @param {int} code - The html error code
**/
module.exports = (res, reason, message, code) => {
  logger.error(reason);
  return res.status(code || 500).json({'error': message});
};

