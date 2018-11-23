const Article = require('../models/article.model');

module.exports = app => {
  // GET /article/author/{author_id} Get articles by author_id
  app.get('/article/author/:id', function(req, res) {
    Article.find(
      { author_id: req.params.id },
      null,
      { sort: { updated_at: -1 } },
      function(err, articles) {
        if (err)
          return res
            .status(500)
            .send('There was a problem finding the articles.');
        if (!articles || !articles.length)
          return res.status(500).send('No articles found.');
        res.status(200).send(articles);
      }
    );
  });

  // GET /article/ Get all articles
  app.get('/article', function(req, res) {
    Article.find({}, null, { sort: { updated_at: -1 } }, function(
      err,
      articles
    ) {
      if (err)
        return res
          .status(500)
          .send('There was a problem finding the articles.');
      res.status(200).send(articles);
    });
  });

  // GET /article/{article_id} Get article by article_id
  app.get('/article/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article) {
      if (err)
        return res.status(500).send('There was a problem finding the article.');
      if (!article) return res.status(404).send('No article found.');
      res.status(200).send(article);
    });
  });

  // POST /article Create a single article
  app.post('/article', function(req, res) {
    Article.create(
      {
        title: req.body.title,
        text: req.body.text,
        author_id: req.body.author_id,
        author_name: req.body.author_name
      },
      function(err, article) {
        if (err)
          return res
            .status(500)
            .send(
              'There was a problem adding the information to the database.'
            );
        res.status(200).send(article);
      }
    );
  });

  // DELETE /article/{article_id} Delete an article by article_id
  app.delete('/article/:id', function(req, res) {
    Article.findOneAndDelete({ _id: req.params.id }, function(err, article) {
      if (err)
        return res
          .status(500)
          .send('There was a problem deleting the article.');
      res.status(200).send('Article was deleted.');
    });
  });

  // UPDATE /article/{article_id} Update article by article_id
  app.put('/article/:id', function(req, res) {
    Article.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      function(err, article) {
        if (err)
          return res
            .status(500)
            .send('There was a problem updating the article.');
        res.status(200).send(article);
      }
    );
  });
};
