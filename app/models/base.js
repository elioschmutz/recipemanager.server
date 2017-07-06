let util = require('util');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BaseSchema = function() {
    Schema.apply(this, arguments);

    this.add({
        _creationDate: {
          type: Date,
          default: Date.now,
      },
      _modificationDate: {
          type: Date,
          default: Date.now,
      },
    });

    this.options['toJSON'] = {getters: true, virtuals: false};
    this.pre('save', function(next) {
        this._modificationDate = new Date();
        next();
    });
};

util.inherits(BaseSchema, Schema);
module.exports = BaseSchema;
