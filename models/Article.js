const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    text: {
      type: String,
      required: true,
      minLength: 20,
      maxLength: 750,
    },
    date: { type: Date, default: Date.now },
    comments: { type: Array, ref: 'Comment' },
  },
  { collection: 'articles' },
);

mongoose.model('Article', ArticleSchema);

module.exports = mongoose.model('Article');
