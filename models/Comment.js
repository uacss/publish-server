const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    user: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
      maxLength: 250,
    },
    date: { type: Date, default: Date.now },
  },
  { collection: 'comments' },
);

mongoose.model('Comment', CommentSchema);

module.exports = mongoose.model('Comment');
