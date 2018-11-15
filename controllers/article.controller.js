const Article = require('../models/article.model');

module.exports = app => {
  app.get('/article', function(req, res) {
    Article.find({}, function(err, articles) {
      if (err)
        return res
          .status(500)
          .send('There was a problem finding the articles.');
      res.status(200).send(articles);
    });
  });

  app.get('/article/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article) {
      if (err)
        return res.status(500).send('There was a problem finding the article.');
      if (!article) return res.status(404).send('No article found.');
      res.status(200).send(article);
    });
  });

  app.post('/article', function(req, res) {
    Article.create(
      {
        title: req.body.title,
        text: req.body.text,
        author_id: req.body.author_id,
        author_name: req.body.author_name,
      },
      function(err, article) {
        if (err)
          return res
            .status(500)
            .send(
              'There was a problem adding the information to the database.',
            );
        res.status(200).send(article);
      },
    );
  });

  app.delete('/article/:id', function(req, res) {
    Article.findOneAndDelete(req.params.id, function(err, article) {
      if (err)
        return res
          .status(500)
          .send('There was a problem deleting the article.');
      res.status(200).send('Article was deleted.');
    });
  });

  app.put('/article/:id', function(req, res) {
    Article.findOneAndUpdate(req.params.id, req.body, function(err, article) {
      if (err)
        return res
          .status(500)
          .send('There was a problem updating the article.');
      res.status(200).send(article);
    });
  });
};
