let mongoose = require('mongoose');
let ContentBaseSchema = require('./content_base');

let schema = new ContentBaseSchema({
  title: {
    type: String,
    required: true,
  },
});

/**
 */
class Category { }

schema.loadClass(Category);

module.exports = mongoose.model('Category', schema);
