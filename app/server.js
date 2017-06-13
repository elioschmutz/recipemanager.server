const logger = require('./logger');

/**
 */
class Server {

  /**
   */
  run(app, port) {
      const server = app.listen(port, function() {
      const port = server.address().port;
      logger.info('App now running on port', port);
    });
  }
}
module.exports = Server;
