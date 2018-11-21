const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    text: {
      type: String,
      require: true,
      maxLength: 250
    },
    author_id: {
      type: String,
      require: true
    },
    author_name: {
      type: String,
      require: true
    },
    article_id: {
      type: String,
      require: true
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  { collection: 'comments' }
);

mongoose.model('Comment', CommentSchema);

module.exports = mongoose.model('Comment');
