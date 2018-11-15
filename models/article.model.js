const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    text: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 1000,
    },
    author_id: {
      type: String,
      require: true,
    },
    author_name: {
      type: String,
      require: true,
    },
    posted_at: { type: Date, default: Date.now },
  },
  { collection: 'articles' },
);

mongoose.model('Article', ArticleSchema);

module.exports = mongoose.model('Article');
