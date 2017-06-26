const mongoose = require('mongoose');
const logger = require('../logger');

// Use native promises
mongoose.Promise = global.Promise;

class MongoDB {
    constructor() {
        this.db = null;
    }
    connect(url) {
        this.db = mongoose.connect(url);
        this.db.then(() => {
            logger.info('Database connection ready');
        });
        return this.db;
    }
    get() {
        return this.db;
    }
    countSessions() {
        return this.db.connection.db.collection('sessions').count();
    }
    clearAllSessions() {
        return this.db.connection.db.collection('sessions').deleteMany({});
    }
}

module.exports = new MongoDB();
