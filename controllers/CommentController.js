const Comment = require('../models/Comment');

module.exports = app => {
  app.get('/comment', function(req, res) {
    Comment.find({}, function(err, comments) {
      if (err)
        return res
          .status(500)
          .send('There was a problem finding the comments.');
      res.status(200).send(comments);
    });
  });

  app.get('/comment/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
      if (err)
        return res.status(500).send('There was a problem finding the comment.');
      if (!comment) return res.status(404).send('No comment found.');
      res.status(200).send(comment);
    });
  });

  app.post('/comment', function(req, res) {
    Comment.create(
      {
        user: req.body.user,
        text: req.body.text,
      },
      function(err, comment) {
        if (err)
          return res
            .status(500)
            .send(
              'There was a problem adding the information to the database.',
            );
        res.status(200).send(comment);
      },
    );
  });

  app.delete('/comment/:id', function(req, res) {
    Comment.findOneAndDelete(req.params.id, function(err, comment) {
      if (err)
        return res
          .status(500)
          .send('There was a problem deleting the comment.');
      res.status(200).send('Comment was deleted.');
    });
  });

  app.put('/comment/:id', function(req, res) {
    Comment.findOneAndUpdate(req.params.id, req.body, function(err, comment) {
      if (err)
        return res
          .status(500)
          .send('There was a problem updating the comment.');
      res.status(200).send(comment);
    });
  });
};
