const Comment = require('../models/comment.model');

module.exports = app => {
  // GET /comment/{article_id} Get comments of a single article by article_id
  app.get('/comment/:id', function(req, res) {
    Comment.find(
      { article_id: req.params.id },
      null,
      { sort: { updated_at: -1 } },
      function(err, comment) {
        if (err)
          return res
            .status(500)
            .send('There was a problem finding the comment.');
        if (!comment) return res.status(404).send('No comment found.');
        res.status(200).send(comment);
      }
    );
  });

  // POST /comment/{article_id} Post comment to a single post
  app.post('/comment/:id', function(req, res) {
    Comment.create(
      {
        text: req.body.text,
        author_id: req.body.author_id,
        author_name: req.body.author_name,
        article_id: req.params.id
      },
      function(err, comment) {
        if (err)
          return res
            .status(500)
            .send(
              'There was a problem adding the information to the database.'
            );
        res.status(200).send(comment);
      }
    );
  });

  // DELETE /comment/{id} Delete a comment by id
  app.delete('/comment/:id', function(req, res) {
    Comment.findOneAndDelete({ _id: req.params.id }, function(err, comment) {
      if (err)
        return res
          .status(500)
          .send('There was a problem deleting the comment.');
      res.status(200).send('Comment was deleted.');
    });
  });

  // UPDATE /comment/{id} Update comment by id
  app.put('/comment/:id', function(req, res) {
    Comment.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      function(err, comment) {
        if (err)
          return res.status(500).send('There was a problem updating comment.');
        res.status(200).send(comment);
      }
    );
  });
};
