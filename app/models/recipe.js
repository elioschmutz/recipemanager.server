let mongoose = require('mongoose');
let ContentBaseSchema = require('./content_base');

let schema = new ContentBaseSchema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  ingredients: {
    type: Array,
    required: false,
  },
  steps: [
    {
      text: String,
      timer: Number,
    },
  ],
  lastTimeCoocked: {
    type: Date,
    required: false,
  },
});

/**
 */
class Recipe { }

schema.loadClass(Recipe);

module.exports = mongoose.model('Recipe', schema);
