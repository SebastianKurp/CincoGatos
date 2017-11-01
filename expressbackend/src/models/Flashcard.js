var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Flashcard = new Schema({
  flashcard: {
    lang1: String,
    lang2: String,
    hits: Number,
    misses: Number
  },

},{
    collection: 'items'
});

module.exports = mongoose.model('Flashcard', Flashcard);
