
let util = require('util');
let mongoose = require('mongoose');
let BaseSchema = require('./base');

// Base schema for contenttypes
let ContentBaseSchema = function() {
    BaseSchema.apply(this, arguments);

    this.add({
      _creator: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
      },
    });
};

util.inherits(ContentBaseSchema, BaseSchema);
module.exports = ContentBaseSchema;
